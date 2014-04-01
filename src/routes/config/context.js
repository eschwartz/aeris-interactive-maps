define({
  eventHub: { create: 'aim/maps/event/eventhub' },

  appState: { create: 'aim/maps/core/models/state' },

  builderOptions: {
    create: {
      module: 'aim/routes/options/routebuilderoptions',
      args: [
        null,
        {
          defaults: { wire: 'aim/routes/config/builderoptions' },
          mapObjectTypes: { wire: 'aim/maps/config/mapobjecttypes' }
        }
      ]
    }
  },

  routeApp: { wire: 'aim/routes/routeapp/config/app' }
});
