define([
  'aeris/util',
  'aeris/interactive/application/controllers/itemcontroller'
], function(_, ItemController) {
  /**
   * Controls the point on a slider
   * which represents the slider value.
   *
   * @class Point
   * @namespace aeris.interactive.application.widgets.slider
   * @extends aeris.interactive.application.ItemController
   *
   * @constructor
   *
   * @param {Object=} opt_options
   * @param {number=} opt_options.size Size in pixels of slider
   * @param {number=} opt_options.min Min value
   * @param {number=} opt_options.max Max value
   * @param {number=} opt_options.width Width in pixels of range area
   * @param {number=} opt_options.step Minimum distance between each value point.
   * @param {aeris.interactive.application.widgets.slider.options.Point=} opt_options.style
   */
  var Point = function(opt_options) {
    var options = _.defaults(opt_options || {}, {
      tagName: 'canvas',
      className: 'aeris-slider-point',
      size: 16,
      template: _.constant(''),    // non-template,
      min: 0,
      max: 100,
      width: 100,
      step: 1
    });

    options.value = _.isUndefined(options.value) ? options.min : options.value;

    options.style = _.defaults(options.style || {}, {
      strokeColor: '#ffffff',
      strokeWidth: 3,
      fillColor: '#333333'
    });

    options.style.hover = _.defaults(options.style.hover || {}, {
      strokeColor: '#ffffff',
      fillColor: '#cccccc'
    }, options.style);

    options.events = _.defaults(options.ui || {}, {
      mousedown: function(evt) {
        this.startDragging_(evt);

        $(document).one('mouseup', this.evt_(this.stopDragging_));
      },
      mouseenter: this.renderHoverStyles_,
      mouseleave: function() {
        if (this.isDragging_) {
          this.once('drag:end', this.removeHoverStyles_.bind(this));
        }
        else {
          this.removeHoverStyles_();
        }
      }
    });


    /**
     * @property style_
     * @private
     * @type {Object}
     */
    this.style_ = options.style;

    /**
     * @property size_
     * @private
     * @type {number}
     */
    this.size_ = options.size;


    /**
     * A unique namespace to be used
     * for identifying events associated with
     * this Point instance.
     *
     * @type {string}
     * @private
     */
    this.evtNs_ = _.uniqueId('pointEvt-');


    /**
     * @property min_
     * @private
     * @type {number}
     */
    this.min_ = options.min;


    /**
     * @property max_
     * @private
     * @type {number}
     */
    this.max_ = options.max;


    /**
     * @property value_
     * @private
     * @type {number}
     */
    this.value_ = options.value;


    /**
     * Width of point range in pixels
     *
     * @property width_
     * @private
     * @type {number}
     */
    this.width_ = options.width;


    /**
     * @property stepCount_
     * @private
     * @type {?number}
     */
    this.step_ = options.step;


    ItemController.call(this, options);

    this.listenTo(this, 'render', this.renderPoint_.bind(this, this.style_));

    this.listenTo(this, {
      'drag:start': function() {
        $('body').addClass('aeris-grabbing');
        this.$el.addClass('aeris-grabbing');
      },
      'drag:end': function() {
        $('body').removeClass('aeris-grabbing');
        this.$el.removeClass('aeris-grabbing');
      }
    });


    /**
     * @event drag:start
     */
    /**
     * @event drag:end
     */
  };
  _.inherits(Point, ItemController);


  /**
   * @method startDragging_
   */
  Point.prototype.startDragging_ = function(evt) {
    var mouseStartingX = evt.pageX;
    var startingValue = this.getValue();
    this.trigger('drag:start');

    $(document).on('mousemove.' + this.evtNs_, this.evt_(function(evt) {
      var span = this.max_ - this.min_;
      var changeInX = evt.pageX - mouseStartingX;
      var changeInValueAsPercentage = changeInX / this.width_;
      var changeInValue = changeInValueAsPercentage * span;

      this.setValue(startingValue + changeInValue);
    }));

    this.isDragging_ = true;
  };


  /**
   * @method stopDragging_
   * @private
   */
  Point.prototype.stopDragging_ = function() {
    $(document).off('mousemove.' + this.evtNs_);
    this.trigger('drag:end');

    this.isDragging_ = false;
  };


  /**
   * @method setValue
   * @param {number} value
   */
  Point.prototype.setValue = function(value) {
    var isSameValue;

    value = this.normalizeValue_(value);

    isSameValue = (this.value_ === value);
    if (isSameValue) {
      return;
    }

    this.value_ = value;
    this.renderValue_(value);
    this.trigger('change', value);
  };


  /**
   * Apply bounds and interval rules to the value.
   *
   * @method normalizeValue_
   * @private
   * @param {number} value
   * @return {number}
   */
  Point.prototype.normalizeValue_ = function(value) {
    // Bound position by min/max config
    value = Math.max(value, this.min_);
    value = Math.min(value, this.max_);

    // Round to step
    value = Math.round(value / this.step_) * this.step_;

    return value;
  };


  /**
   * @method setWidth
   * @param {number} width
   */
  Point.prototype.setWidth = function(width) {
    this.width_ = width;
    this.renderValue_(this.value_);
  };


  /**
   * @method renderPoint_
   * @private
   * @param {Object} style
   */
  Point.prototype.renderPoint_ = function(style) {
    var width, height, radius, center;
    var ctx, scale;

    this.applyBoxStyles_();

    scale = (window.devicePixelRatio === 2) ? 2 : 1;
    ctx = this.el.getContext('2d');
    width = this.el.width;
    height = this.el.height;
    center = [width / 2, height / 2];
    radius = (width / 2 - 2);

    ctx.clearRect(0, 0, width, height);
    ctx.beginPath();
    ctx.arc(
      center[0],
      center[1],
      radius,
      0,             // starting angle
      Math.PI * 2   // ending angle
    );
    ctx.lineWidth = style.strokeWidth * scale;
    ctx.strokeStyle = style.strokeColor;
    ctx.stroke();
    ctx.fillStyle = style.fillColor;
    ctx.fill();

    this.renderValue_(this.value_);
  };


  /**
   * @method renderValue_
   * @private
   */
  Point.prototype.renderValue_ = function(value) {
    this.$el.css('left', this.getValueAsPixels_(value));
  };


  /**
   * @method getValueAsPixels_
   * @private
   * @param {number} value
   * @return {number} Pixel distance from left, corresponding to the point value.
   */
  Point.prototype.getValueAsPixels_ = function(value) {
    var span = this.max_ - this.min_;
    var valueAsPercentage = value / span;
    var valueAsPixels = valueAsPercentage * this.width_;

    // Adjust for width of element
    // so that circle is centered over
    // value point
    valueAsPixels = valueAsPixels - (this.size_ / 2);

    // Round to 1 decimal place
    valueAsPixels = Math.round(valueAsPixels * 10) / 10;

    return valueAsPixels;
  };


  /**
   * @method applyBoxStyles_
   * @private
   */
  Point.prototype.applyBoxStyles_ = function() {
    var scale = (window.devicePixelRatio === 2) ? 2 : 1;
    var containerHeight = this.$el.parent().height();

    // Set width and height to scale for retina displays
    this.$el.attr('width', this.size_ * scale);
    this.$el.attr('height', this.size_ * scale);

    this.$el.css({
      position: 'absolute',
      width: this.size_,
      height: this.size_
    });
  };


  /**
   * @method renderHoverStyles_
   * @private
   */
  Point.prototype.renderHoverStyles_ = function() {
    this.renderPoint_(this.style_.hover);
  };


  /**
   * @method removeHoverStyles_
   * @private
   */
  Point.prototype.removeHoverStyles_ = function() {
    this.renderPoint_(this.style_);
  };


  /**
   * @method getValue
   * @private
   * @return {number} Element's left offset
   */
  Point.prototype.getValue = function() {
    return this.value_;
  };


  /**
   * Create an event handler.
   * Takes care of boilerplate code
   * to prevent event side-effects.
   *
   * @method evt_
   * @private
   *
   * @param {Function} eventHandler
   * @return Function
   */
  Point.prototype.evt_ = function(eventHandler) {
    return function(evt) {
      evt.preventDefault();
      eventHandler.call(this, evt);
      return false;
    }.bind(this);
  };


  return Point;
});
