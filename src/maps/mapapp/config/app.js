/**
 * Context for the MapApp application.
 *
 * @class context
 * @namespace aeris.builder.maps.mapapp.config
 * @static
 */
define({
  $exports: { $ref: 'mapApp' },

  mapAppLayout: { wire: 'aim/maps/mapapp/config/layout' },

  mapState: { wire: 'aim/maps/mapapp/config/mapstate' },

  subModules: { wire: 'aim/maps/mapapp/config/submodules' },

  mapApp: {
    create: {
      module: 'aim/application/modules/application',
      args: [
        {
          layout: { $ref: 'mapAppLayout' },
          modules: { $ref: 'subModules' }
        }
      ]
    }
  }
});
