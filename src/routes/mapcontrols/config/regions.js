define({
  $exports: {
    geolocateControlsRegion: { $ref: 'parentRegions.geolocateControlsRegion' },
    geocodeControlsRegion: { $ref: 'parentRegions.geocodeControlsRegion' },
    layerControlsRegion: { $ref: 'parentRegions.layerControlsRegion' },
    markerControlsRegion: { $ref: 'parentRegions.markerControlsRegion' },
    fullscreenControlsRegion: '.aeris-fullscreenControlsRegion',

    routeBuilderControlsRegion: '.aeris-routeBuilderControls'
  },

  parentRegions: { wire: 'aeris/interactive/maps/mapcontrols/config/regions' }
});
