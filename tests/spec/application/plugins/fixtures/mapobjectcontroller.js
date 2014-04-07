define({

  mapState: {
    create: 'aeris/model'
  },

  mapState_B: {
    create: 'aeris/model'
  },

  controller: {
    $mapObjectController: {
      mapObject: 'aeris/mocks/mapobject'
    }
  },

  controller_mapState_B: {
    $mapObjectController: {
      mapObject: 'aeris/mocks/mapobject',
      options: {
        mapState: { $ref: 'mapState_B' }
      }
    }
  },

  controller_with_foo_bar: {
    $mapObjectController: {
      mapObject: 'aeris/mocks/mapobject',
      options: {
        foo: 'bar'
      }
    }
  },

  controller_short_syntax: {
    $mapObjectController: 'aeris/mocks/mapobject'
  },

  Controller: {
    $MapObjectController: 'aeris/mocks/mapobject'
  },

  $plugins: [
    {
      module: 'aim/application/plugins/mapObjectController',
      mapState: { $ref: 'mapState' },
      controller: 'tests/mocks/application/controllers/controllerinterface'
    }
  ]
});
