define({
  eventHub: { create: 'aeris/interactive/maps/event/eventhub' },

  appState: { create: 'aeris/interactive/maps/core/models/state' },

  builderOptions: {
    create: {
      module: 'aeris/interactive/routes/options/routebuilderoptions',
      args: [
        null,
        {
          defaults: { wire: 'aeris/interactive/routes/config/builderoptions' },
          mapObjectTypes: { wire: 'aeris/interactive/maps/config/mapobjecttypes' }
        }
      ]
    }
  },

  routeApp: { wire: 'aeris/interactive/routes/routeapp/config/app' }
});
