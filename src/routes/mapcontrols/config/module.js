define({
  $exports: { $ref: 'mapControlsModule' },

  mapControlsModule: {
    wire: {
      spec: 'aim/maps/mapcontrols/config/module',
      provide: {
        mapControlsRegions: { wire: 'aim/routes/mapcontrols/config/regions' },

        controlsRegionLookup: {
          geolocation: 'geolocateControlsRegion',
          geocode: 'geocodeControlsRegion',
          layers: 'layerControlsRegion',
          markers: 'markerControlsRegion',
          routeBuilder: 'routeBuilderControlsRegion'
        },

        mapControlsTemplate: { module: 'hbars!aim/routes/mapcontrols/views/controls.html' }
      }
    }
  }
});
