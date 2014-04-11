define([
  'aeris/util',
  'aeris/interactive/application/controllers/itemcontroller',
  'aeris/interactive/application/widgets/slider/point',
  'aeris/interactive/application/widgets/slider/bar',
  'aeris/interactive/application/widgets/slider/tooltip',
  'aeris/interactive/application/widgets/slider/config/defaultstyles',
  'hbars!aeris/interactive/application/widgets/slider/view/layout.html'
], function(_, ItemController, Point, Bar, Tooltip, defaultStyles, layoutTemplate) {
  /**
   * @class Slider
   * @namespace aeris.interactive.application.widgets.slider
   * @extends aeris.interactive.application.controller.ItemController
   *
   * @constructor
   *
   * @param {Object=} opt_options
   *
   * @param {string=} opt_options.label Slider label text
   *
   * @param {Object=} opt_options.range Slider range
   * @param {number=} opt_options.range.min
   * @param {number=} opt_options.range.max
   *
   * @param {number=} opt_options.step Set to null to disable stepping
   *
   * @param {Object=} opt_options.style
   * @param {aeris.interactive.application.widgets.slider.options.BarStyle=} opt_options.style.bar
   * @param {aeris.interactive.application.widgets.slider.options.PointStyle=} opt_options.style.point
   *
   * @param {function():string} opt_options.getTooltipContent Method which returns the content of the tooltip.
   */
  var Slider = function(opt_options) {
    var options = opt_options || {};
    _.defaults(options, {
      label: 'Range',
      range: _.defaults(options.range || {}, {
        min: 0,
        max: 100
      }),
      step: null,
      style: {
        bar: _.path('style.bar', options) || {},
        point: _.path('style.point', options) || {}
      },

      className: 'aeris-slider',
      template: layoutTemplate,
      ui: _.defaults(options.ui || {}, {
        component: '.aeris-slider-component'
      }),
      getTooltipContent: this.getValue
    });

    if (options.step) {
      options.className += ' aeris-slider-step';
    }


    /**
     * @property label_
     * @private
     * @type {string}
     */
    this.label_ = options.label;


    /**
     * @property range_
     * @private
     * @type {Object.<string,number>} Min and max properties
     * @default { min: 0, max: 100 }
     */
    this.range_ = options.range;


    /**
     * Slider interval step.
     *
     * @property step_
     * @private
     * @type {number}
     * @default 1
     */
    this.step_ = options.step;


    /**
     * @property style_
     * @private
     * @type {Object}
     */
    this.style_ = options.style;


    /**
     * @property point_
     * @private
     * @type {aeris.interactive.application.widgets.slider.Point}
     */
    this.point_ = options.point || this.createPoint_();


    /**
     * @property bar_
     * @private
     * @type {aeris.interactive.application.widgets.slider.Bar}
     */
    this.bar_ = options.bar || this.createBar_();


    /**
     * @property tooltip_
     * @private
     * @type {aeris.interactive.application.widgets.slider.Tooltip}
     */
    this.tooltip_ = options.tooltip || this.createTooltip_();


    /**
     * @property getTooltipContent_
     * @private
     * @type {function():string}
     */
    this.getTooltipContent_ = options.getTooltipContent;


    ItemController.call(this, options);

    this.listenTo(this, 'render', function() {
      // Rendering hack:
      // Component width is not correct immediately on render.
      _.defer(function() {
        this.renderComponents_();
        this.bindTooltipToValue_();
      }.bind(this));
    });

    this.listenTo(this.point_, {
      // Proxy Point's 'change' event
      change: function() {
        this.trigger('change', this.point_.getValue());
      },
      'drag:start': this.updateTooltip_
    });

    /**
     * When the slider value changes
     *
     * @event change
     * @param {number} value
     */
  };
  _.inherits(Slider, ItemController);


  /**
   * @method createPoint_
   * @private
   * @return {aeris.interactive.application.widgets.slider.Point}
   */
  Slider.prototype.createPoint_ = function() {
    return new Point({
      min: this.range_.min,
      max: this.range_.max,
      step: this.step_ || 1,
      style: this.style_.point
    });
  };


  /**
   * @method createBar_
   * @private
   * @return {aeris.interactive.application.widgets.slider.Bar}
   */
  Slider.prototype.createBar_ = function() {
    return new Bar({
      style: this.style_.bar
      // step will be set after element is rendered
      // so we know what are pixel count is.
    });
  };


  /**
   * @method createTooltip_
   * @private
   */
  Slider.prototype.createTooltip_ = function() {
    return new Tooltip({
      offsetY: 2
    });
  };


  /**
   * @method renderComponents_
   * @private
   */
  Slider.prototype.renderComponents_ = function() {
    this.renderBar_();
    this.renderPoint_();
    this.renderTooltip_();
  };


  /**
   * @method renderPoint_
   * @private
   */
  Slider.prototype.renderPoint_ = function() {
    this.point_.render();
    this.point_.$el.appendTo(this.ui.component);
    this.point_.setWidth(this.ui.component.width());
  };


  /**
   * @method renderBar_
   * @private
   */
  Slider.prototype.renderBar_ = function() {
    var componentWidth = this.ui.component.width();
    var pixelsPerValue = componentWidth / this.range_.max;
    var pixelsPerStep = this.step_ * pixelsPerValue;

    this.bar_.render();
    this.bar_.$el.appendTo(this.ui.component);
    this.bar_.setStep(pixelsPerStep);
  };


  /**
   * @method renderTooltip_
   * @private
   */
  Slider.prototype.renderTooltip_ = function() {
    this.tooltip_.$el.appendTo(this.ui.component);
    this.tooltip_.render();
    this.updateTooltip_();

    // Tooltip is only shown during dragging
    this.tooltip_.hide();
  };


  /**
   * @method bindTooltipToValue_
   * @private
   */
  Slider.prototype.bindTooltipToValue_ = function() {
    this.listenTo(this.point_, {
      change: function() {
        this.updateTooltip_();
      },
      'drag:start': function() {
        this.tooltip_.show();
      },
      'drag:end': function() {
        this.tooltip_.hide();
      }
    });
  };


  /**
   * @method updateTooltip_
   * @private
   */
  Slider.prototype.updateTooltip_ = function() {
    this.tooltip_.setContent(this.getTooltipContent_());
    this.tooltip_.setPosition(this.getValueInPixels_());
  };


  /**
   * Prepares data for rendering view template.
   * See Marionette.View#serializeData.
   *
   * @method serializeData
   * @private
   * @override
   */
  Slider.prototype.serializeData = function() {
    return {
      label: this.label_
    };
  };


  /**
   * @method getValue
   * @return {number}
   */
  Slider.prototype.getValue = function() {
    return this.point_.getValue();
  };


  /**
   * @method setValue
   * @param {number} value
   */
  Slider.prototype.setValue = function(value) {
    this.point_.setValue(value);
  };


  /**
   * @method getValueInPixels_
   * @private
   */
  Slider.prototype.getValueInPixels_ = function() {
    var componentWidth = this.ui.component.width();
    var pixelsPerValue = componentWidth / this.range_.max;

    return this.getValue() * pixelsPerValue;
  };


  return Slider;
});
