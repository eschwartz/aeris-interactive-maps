define({
  defaultBuilderOptions: {
    mapOptions: {
      zoom: 4,
      center: [44.98, -93.2636],
      scrollZoom: true
    },
    markers: [
      {
        type: 'EarthquakeMarkers',
        selected: true,
        filters: [
          'mini',
          'minor',
          'light',
          'moderate'
        ]
      },
      {
        type: 'StormReportMarkers',
        selected: true,
        filters: ['snow']
      }
    ],
    layers: [
      {
        type: 'Radar',
        selected: true
      },
      {
        type: 'SatelliteGlobal',
        selected: true
      },
      'Advisories',
      'Chlorophyll',
      'Dewpoints',
      'HeatIndex',
      'Humidity',
      'SeaSurfaceTemps',
      'SnowDepth',
      'Temperatures',
      'WindChill',
      'Winds'
    ]
  },

  $exports: { $ref: 'defaultBuilderOptions' }
});
