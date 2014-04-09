/**
 * Context for the MapApp application.
 *
 * @class context
 * @namespace aeris.interactive.maps.mapapp.config
 * @static
 */
define({
  $exports: { $ref: 'mapApp' },

  mapAppLayout: { wire: 'aeris/interactive/maps/mapapp/config/layout' },

  mapState: { wire: 'aeris/interactive/maps/mapapp/config/mapstate' },

  subModules: { wire: 'aeris/interactive/maps/mapapp/config/submodules' },

  mapApp: {
    create: {
      module: 'aeris/interactive/application/modules/application',
      args: [
        {
          layout: { $ref: 'mapAppLayout' },
          modules: { $ref: 'subModules' }
        }
      ]
    }
  }
});
