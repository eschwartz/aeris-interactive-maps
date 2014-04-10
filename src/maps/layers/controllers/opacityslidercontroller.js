define([
  'aeris/util',
  'aeris/interactive/application/widgets/slider/slider'
], function(_, Slider) {
  /**
   * Binds a slider widget to a model's opacity attribute.
   *
   * @class OpacitySliderController
   * @namespace aeris.interactive.maps.layers.controllers
   * @extends aeris.interactive.application.widgets.slider.Slider
   *
   * @constructor
   */
  var OpacitySliderController = function(options) {
    _.defaults(options, {
      label: 'Opacity',
      range: {}
    });
    _.defaults(options.range, {
      min: 0,
      max: 100
    });


    Slider.call(this, options);

    this.listenTo(this, 'change', this.updateModelOpacity_);
    this.listenTo(this, 'render', this.updateSliderValue_);
    this.listenTo(this.model, 'change:opacity', this.updateSliderValue_);
  };
  _.inherits(OpacitySliderController, Slider);


  /**
   * @method updateModelOpacity_
   * @private
   */
  OpacitySliderController.prototype.updateModelOpacity_ = function() {
    this.model.set('opacity', this.getValue() / 100, { validate: true });
  };


  /**
   * @method updateSliderValue_
   * @private
   */
  OpacitySliderController.prototype.updateSliderValue_ = function() {
    var opacity = this.model.get('opacity');
    this.setValue(opacity * 100);
  };


  return OpacitySliderController;
});
