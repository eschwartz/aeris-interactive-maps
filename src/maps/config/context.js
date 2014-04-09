define({
  builderOptions: {
    create: {
      module: 'aeris/interactive/maps/options/mapappbuilderoptions',
      args: [
        null,
        {
          defaults: { wire: 'aeris/interactive/maps/config/builderoptions' },
          mapObjectTypes: { wire: 'aeris/interactive/maps/config/mapobjecttypes' }
        }
      ]
    }
  },

  eventHub: { create: 'aeris/interactive/maps/event/eventhub' },

  appState: { create: 'aeris/interactive/maps/core/models/state' },

  mapApp: { wire: 'aeris/interactive/maps/mapapp/config/app' }
});
