define({
  $exports: { $ref: 'routeApp' },

  routeApp: {
    create: {
      module: 'aim/routes/routeapp/routeapp',
      args: [{
        layout: { $ref: 'mapAppLayout' },
        modules: { $ref: 'subModules' }
      }]
    }
  },

  mapState: { wire: 'aim/maps/mapapp/config/mapstate' },

  mapAppLayout: { wire: 'aim/maps/mapapp/config/layout' },

  subModules: { wire: 'aim/routes/routeapp/config/submodules' }
});
