define({
  $exports: {

    DEFAULT: {
      ClassFactory: {
        module: 'aeris/interactive/maps/core/controllers/mapobjectcontrolscontroller',
        args: [{
          controls: [
            { $ref: 'OpacitySliderController' }
          ],

          tagName: 'li',
          className: 'aeris-active'
        }]
      }
    },

    Radar: {
      ClassFactory: {
        module: 'aeris/interactive/maps/core/controllers/mapobjectcontrolscontroller',
        args: [{
          controls: [
            { $ref: 'LegendController' },
            { $ref: 'OpacitySliderController' }
          ],

          tagName: 'li',
          className: 'aeris-active'
        }]
      }
    }
  },

  OpacitySliderController: {
    module: 'aeris/interactive/maps/layers/controllers/opacityslidercontroller'
  },

  LegendController: {
    module: 'aeris/interactive/maps/layers/controllers/legendcontroller'
  },


  $plugins: [
    { module: 'aeris/interactive/application/plugins/classfactory' }
  ]
});
