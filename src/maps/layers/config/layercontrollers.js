define({
  /**
   * Defines mapObjectController instances
   * associated with each layer type.
   */

  $exports: {
    Advisories: {
      $MapObjectController: 'aeris/maps/layers/advisories'
    },
    Chlorophyll: {
      $MapObjectController: 'aeris/maps/layers/chlorophyll'
    },
    Dewpoints: {
      $MapObjectController: 'aeris/maps/layers/dewpoints'
    },
    HeatIndex: {
      $MapObjectController: 'aeris/maps/layers/heatIndex'
    },
    Humidity: {
      $MapObjectController: 'aeris/maps/layers/humidity'
    },
    Radar: {
      $MapObjectController: 'aeris/maps/layers/radar'
    },
    Satellite: {
      $MapObjectController: 'aeris/maps/layers/satellite'
    },
    SatelliteGlobal: {
      $MapObjectController: 'aeris/maps/layers/satelliteglobal'
    },
    SatelliteVisible: {
      $MapObjectController: 'aeris/maps/layers/satellitevisible'
    },
    SeaSurfaceTemps: {
      $MapObjectController: 'aeris/maps/layers/seasurfacetemps'
    },
    SnowDepth: {
      $MapObjectController: 'aeris/maps/layers/snowdepth'
    },
    Temperatures: {
      $MapObjectController: 'aeris/maps/layers/temps'
    },
    WindChill: {
      $MapObjectController: 'aeris/maps/layers/windchill'
    },
    Winds: {
      $MapObjectController: 'aeris/maps/layers/winds'
    }
  },

  $plugins: [
    {
      module: 'aeris/interactive/application/plugins/mapobjectcontroller',
      mapState: { $ref: 'appState' },
      controller: 'aeris/interactive/maps/layers/controllers/layercontroller'
    }
  ]
});
