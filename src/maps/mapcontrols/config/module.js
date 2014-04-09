define(
  /**
   * WireJS spec for the {aeris.interactive.maps.mapcontrols.modules.MapControlsModule}
   * module.
   *
   * @class context
   * @namespace aeris.interactive.maps.mapcontrols.config
   */
  {
    $exports: { $ref: 'mapControlsModule' },

    mapControlsModule: {
      create: {
        module: 'aeris/interactive/maps/mapcontrols/modules/mapcontrolsmodule',
        args: [{
          controlsController: { $ref: 'mapControlsController' },

          controlsRegion: {
            $ref: 'region!mapControls',
            layout: { $ref: 'mapAppLayout' }
          }
        }]
      }
    },

    mapControlsController: {
      create: {
        module: 'aeris/interactive/maps/mapcontrols/controllers/mapcontrolscontroller',
        args: [{
          eventHub: { $ref: 'eventHub' },
          builderOptions: { $ref: 'builderOptions' },
          className: 'aeris-sideMenu',
          selectedClass: 'aeris-state-open',
          deselectedClass: 'aeris-state-closed',

          template: { $ref: 'mapControlsTemplate' },

          ui: {
            mapOptionsToggle: '.aeris-mapControls>h1:first-child',
            mapOptionsContent: '.aeris-mapControls'
          },

          regions: { $ref: 'mapControlsRegions' },
          controlsRegionLookup: { $ref: 'controlsRegionLookup' }
        }]
      }
    },

    mapControlsTemplate: { module: 'hbars!aeris/interactive/maps/mapcontrols/views/controls.html' },

    mapControlsRegions: { wire: 'aeris/interactive/maps/mapcontrols/config/regions' },

    // These should match up to the
    // the keys of the "controls" builder options.
    controlsRegionLookup: {
      geolocation: 'geolocateControlsRegion',
      geocode: 'geocodeControlsRegion',
      layers: 'layerControlsRegion',
      markers: 'markerControlsRegion',
      fullscreen: 'fullscreenControlsRegion'
    },


    $plugins: [
      { module: 'aeris/interactive/application/plugins/regionresolver' }
    ]
  }
);
