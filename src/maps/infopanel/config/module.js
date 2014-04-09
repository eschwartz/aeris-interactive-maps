define({
  $exports: { $ref: 'infoPanelModule' },

  infoPanelModule: {
    create: {
      module: 'aeris/interactive/maps/core/modules/renderermodule',
      args: [
        {
          renderer: { $ref: 'infoPanelRenderer' }
        }
      ]
    }
  },

  // Listens to event hub,
  // and renders transformed event data
  infoPanelRenderer: {
    create: {
      module: 'aeris/interactive/maps/infopanel/helpers/infopanelrenderer',
      args: [
        {
          region: {
            $ref: 'region!infoPanel',
            layout: { $ref: 'mapAppLayout' }
          },
          eventHub: { $ref: 'eventHub' }
        }
      ]
    },
    listenTo: {
      eventHub: {
        'info:view': 'show'
      }
    }
  },

  $plugins: [
    { module: 'aeris/interactive/application/plugins/regionresolver' },
    { module: 'aeris/interactive/application/plugins/events' }
  ]
});
/**
 * @for aeris.interactive.maps.event.EventHub
 */
/**
 * And info panel view is ready to be rendered.
 *
 * @event info:view
 * @param {aeris.interactive.application.controllers.ControllerInterface} infoViewController
 */
