define([
  'aeris/util',
  'aeris/interactive/application/controllers/itemcontroller'
], function(_, ItemController) {
  /**
   * @class Bar
   * @namespace aeris.interactive.application.widgets.slider
   * @extends aeris.interactive.application.controllers.ItemController
   *
   * @constructor
   *
   * @param {Object=} opt_options
   * @param {?number=} opt_options.step Pixels between step intervals. If null, no steps will be rendered.
   * @param {aeris.interactive.application.widgets.slider.options.BarStyle=} opt_options.style
   */
  var Bar = function(opt_options) {
    var options = _.defaults(opt_options || {}, {
      tagName: 'canvas',
      className: 'aeris-slider-bar',
      step: null,
      template: _.constant('')    // empty template
    });

    options.style = _.defaults(options.style || {}, {
      strokeColor: '#000',
      strokeWidth: 1
    });
    options.style.step = _.defaults(options.style.step || {}, {
      fillColor: '#fff',
      radius: 2
    });

    /**
     * @property style_
     * @type {Object}
     * @private
     */
    this.style_ = options.style;


    /**
     * @property step_
     * @private
     * @type {?number}
     */
    this.step_ = options.step;


    ItemController.call(this, options);

    this.listenTo(this, 'render', this.renderBar_);
  };
  _.inherits(Bar, ItemController);


  /**
   * @method setStep
   * @param {number} step Step interval (in pixels)
   */
  Bar.prototype.setStep = function(step) {
    this.step_ = step;

    this.renderBar_();
  };


  /**
   * @method renderBar_
   * @private
   */
  Bar.prototype.renderBar_ = function() {
    var ctx, midHeight;
    var padding = this.style_.step.radius;


    this.applyBoxStyles_();

    ctx = this.el.getContext('2d');
    midHeight = this.el.height / 2;

    ctx.clearRect(0, 0, this.el.width, this.el.height);
    ctx.beginPath();
    ctx.moveTo(padding, midHeight);
    ctx.lineTo(this.el.width - padding, midHeight);
    ctx.lineWidth = Bar.SCALE_ * this.style_.strokeWidth;
    ctx.strokeStyle = this.style_.strokeColor;
    ctx.stroke();

    if (this.step_) {
      this.renderSteps_();
    }
  };


  /**
   * @method applyBoxStyles_
   * @private
   */
  Bar.prototype.applyBoxStyles_ = function() {
    var $container = this.$el.parent();

    this.$el.attr('width', $container.width());
    this.$el.attr('height', $container.height());

    this.$el.css({
      position: 'relative',
      width: $container.width(),
      height: $container.height()
    });

    this.applyPadding_();
  };


  /**
   * Add 'padding' to the canvas, so that
   * step points aren't cut off at ends.
   *
   * @method applyPadding_
   * @private
   */
  Bar.prototype.applyPadding_ = function() {
    var padding = this.style_.step.radius;

    this.$el.attr('width', this.el.width + padding);

    this.$el.css({
      width: this.$el.width() + padding,
      left: -1 * padding / 2
    });
  };


  /**
   * @method renderSteps_
   * @private
   */
  Bar.prototype.renderSteps_ = function() {
    var padding = this.style_.step.radius;
    var midHeight = this.el.height / 2;
    var radius = this.style_.step.radius * Bar.SCALE_;
    var steps = _.range(padding, this.el.width - padding, this.step_).
      concat(this.el.width - padding);

    steps.forEach(function(x) {
      this.drawStep_([x, midHeight], radius);
    }, this);
  };


  /**
   * @method drawStep_
   * @private
   * @param {Array<number>} center
   * @param {number} radius
   */
  Bar.prototype.drawStep_ = function(center, radius) {
    var ctx = this.el.getContext('2d');

    ctx.beginPath();
    ctx.arc(
      center[0],
      center[1],
      radius,
      0,              // start angle
      Math.PI * 2,    // end angle
      false           // counter-clockwise?
    );
    ctx.fillStyle = this.style_.step.fillColor;
    ctx.fill();
  };


  /**
   * @property SCALE_
   * @constant
   * @static
   * @type {number}
   * @private
   */
  Bar.SCALE_ = (window.devicePixelRatio == 2) ? 2 : 1;


  return Bar;
});
