/**
 * Context for the Map module.
 *
 * @property aeris.interactive.maps.map.config.context
 * @type {Object}
 */
define({
  $exports: { $ref: 'mapModule' },

  mapModule: {
    create: {
      module: 'aeris/interactive/maps/map/modules/mapmodule',
      args: [{
        mapController: { $ref: 'mapController' },

        appState: { $ref: 'appState' },
        appStateAttr: 'mapOptions',
        moduleState: { $ref: 'mapState' },

        mapCanvasRegion: {
          $ref: 'region!mapCanvas',
          layout: { $ref: 'mapAppLayout' }
        }
      }]
    }
  },

  mapController: {
    create: {
      module: 'aeris/interactive/maps/map/controllers/mapcontroller',
      args: [{
        appState: { $ref: 'appState' },
        className: 'aeris-mapCanvas',
        model: { $ref: 'mapState' }
      }]
    }
  },

  $plugins: [
    { module: 'aeris/interactive/application/plugins/regionresolver' }
  ]
});
