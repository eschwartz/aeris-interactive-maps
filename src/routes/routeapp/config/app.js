define({
  $exports: { $ref: 'routeApp' },

  routeApp: {
    create: {
      module: 'aeris/interactive/routes/routeapp/routeapp',
      args: [{
        layout: { $ref: 'mapAppLayout' },
        modules: { $ref: 'subModules' }
      }]
    }
  },

  mapState: { wire: 'aeris/interactive/maps/mapapp/config/mapstate' },

  mapAppLayout: { wire: 'aeris/interactive/maps/mapapp/config/layout' },

  subModules: { wire: 'aeris/interactive/routes/routeapp/config/submodules' }
});
