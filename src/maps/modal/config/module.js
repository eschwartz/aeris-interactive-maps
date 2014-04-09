define({
  $exports: { $ref: 'modalModule' },

  modalModule: {
    create: {
      module: 'aeris/interactive/maps/core/modules/renderermodule',
      args: [{
        renderer: { $ref: 'modalViewRenderer' }
      }]
    }
  },

  modalViewRenderer: {
    create: {
      module: 'aeris/interactive/maps/core/helpers/renderer',
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
    { module: 'aeris/interactive/application/plugins/regionresolver' },
    { module: 'aeris/interactive/application/plugins/events' }
  ]
});
