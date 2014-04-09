define({
  $exports: { $ref: 'mapControlsModule' },

  mapControlsModule: {
    wire: {
      spec: 'aeris/interactive/maps/mapcontrols/config/module',
      provide: {
        mapControlsRegions: { wire: 'aeris/interactive/routes/mapcontrols/config/regions' },

        controlsRegionLookup: {
          geolocation: 'geolocateControlsRegion',
          geocode: 'geocodeControlsRegion',
          layers: 'layerControlsRegion',
          markers: 'markerControlsRegion',
          routeBuilder: 'routeBuilderControlsRegion'
        },

        mapControlsTemplate: { module: 'hbars!aeris/interactive/routes/mapcontrols/views/controls.html' }
      }
    }
  }
});
