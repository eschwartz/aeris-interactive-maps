define({
  $exports: { $ref: 'mapAppLayout' },

  mapAppTemplate: {
    module: 'text!aim/maps/mapapp/views/app.html'
  },

  mapAppRegions: {
    mapCanvas: '.aeris-mapCanvasRegion',
    mapControls: '.aeris-mapControlsRegion',
    infoPanel: '.aeris-infoPanelRegion',
    modal: '.aeris-modalViewRegion'
  },

  mapAppLayout: {
    create: {
      module: 'aim/application/controllers/layoutcontroller',
      args: [
        {
          template: { $ref: 'mapAppTemplate' },
          className: 'aeris-maps-app'
        }
      ]
    },
    init: {
      // Think of this as setter-injection
      addRegions: [
        { $ref: 'mapAppRegions' }
      ],

      // Render our layout right away
      render: []
    }
  }
});
