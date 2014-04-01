define({
  $exports: { $ref: 'modalModule' },

  modalModule: {
    create: {
      module: 'aim/maps/core/modules/renderermodule',
      args: [{
        renderer: { $ref: 'modalViewRenderer' }
      }]
    }
  },

  modalViewRenderer: {
    create: {
      module: 'aim/maps/core/helpers/renderer',
      args: [{
        region: {
          $ref: 'region!modal',
          layout: { $ref: 'mapAppLayout' }
        }
      }]
    },
    listenTo: {
      eventHub: {
        'modal:view': 'show'
      }
    }
  },

  $plugins: [
    { module: 'aeris/application/plugins/regionresolver' },
    { module: 'aeris/application/plugins/events' }
  ]
});
