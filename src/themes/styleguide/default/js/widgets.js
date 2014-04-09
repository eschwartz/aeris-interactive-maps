require.config({
  baseUrl: '../../../../'
});
require([
  'config-amd'
], function() {
  require([
    'aeris/interactive/application/widgets/slider/slider'
  ], function(Slider) {
    $('.sg-slider').each(function() {
      var steppedSlider = new Slider({
        step: 20
      });

      steppedSlider.render();
      steppedSlider.$el.appendTo($(this));
    });
  });
});
