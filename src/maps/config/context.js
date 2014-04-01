define({
  builderOptions: {
    create: {
      module: 'aim/maps/options/mapappbuilderoptions',
      args: [
        null,
        {
          defaults: { wire: 'aim/maps/config/builderoptions' },
          mapObjectTypes: { wire: 'aim/maps/config/mapobjecttypes' }
        }
      ]
    }
  },

  eventHub: { create: 'aim/maps/event/eventhub' },

  appState: { create: 'aim/maps/core/models/state' },

  mapApp: { wire: 'aim/maps/mapapp/config/app' }
});
