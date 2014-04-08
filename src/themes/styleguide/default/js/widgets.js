require.config({
  baseUrl: '../../../../'
})
require([
  'config-amd'
], function() {
  require([
    'aim/application/widgets/slider/slider'
  ], function(Slider) {
    var $container = $('.aeris-maps-app');
    var slider = new Slider({
      label: 'Continuous'
    });
    var steppedSlider = new Slider({
      step: 20,
      label: 'Stepped'
    });
    slider.render();
    slider.$el.appendTo($container);

    steppedSlider.render();
    steppedSlider.$el.appendTo($container);
  });
});
