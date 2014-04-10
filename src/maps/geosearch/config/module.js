define({
  $exports: { $ref: 'geosearchModule' },

  geosearchModule: {
    create: {
      module: 'aeris/interactive/maps/geosearch/modules/geosearchmodule',
      args: [
        {
          eventHub: { $ref: 'eventHub' },
          geolocateController: { $ref: 'geolocateController' },
          geocodeController: { $ref: 'geocodeController' }
        }
      ]
    }
  },

  geolocateTemplate: { module: 'hbars!aeris/interactive/maps/geosearch/views/geolocate.html' },
  geosearchTemplate: { module: 'hbars!aeris/interactive/maps/geosearch/views/geocode.html' },

  geolocateController: {
    create: {
      module: 'aeris/interactive/maps/geosearch/controllers/geolocatecontroller',
      args: [
        {
          tagName: 'span',
          mapState: { $ref: 'mapState' },
          eventHub: { $ref: 'eventHub' },
          geolocateServiceResolver: {
            create: {
              module: 'aeris/geolocate/geolocateserviceresolver',
              args: [{
                FallbackService: { module: 'aeris/geolocate/freegeoipgeolocateservice' }
              }]
            }
          },
          zoomTo: 8,

          template: { $ref: 'geolocateTemplate' },
          ui: {
            geolocateBtn: 'button'
          }
        }
      ]
    }
  },

  geocodeController: {
    create: {
      module: 'aeris/interactive/maps/geosearch/controllers/geocodecontroller',
      args: [
        {
          mapState: { $ref: 'mapState' },
          eventHub: { $ref: 'eventHub' },
          geocodeService: { create: 'aeris/geocode/googlegeocodeservice' },
          zoomTo: 8,

          className: 'aeris-search',
          template: { $ref: 'geosearchTemplate' },
          ui: {
            searchInput: 'input[type=text]',
            searchForm: 'form'
          },
          events: {
            'change input': 'geocode'
          }
        }
      ]
    }
  }
});
