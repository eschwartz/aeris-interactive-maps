/**
 * Context for the Layers module
 *
 * @property aeris.builder.maps.layers.config.context
 * @type {Object}
 */
define({
  $exports: { $ref: 'layersModule' },

  layersModule: {
    create: {
      module: 'aim/maps/layers/modules/layersmodule',
      args: [
        {
          controlsController: { $ref: 'layerControlsController' },
          eventHub: { $ref: 'eventHub' },
          moduleState: { $ref: 'layerStateCollection' }
        }
      ]
    }
  },

  layerStateCollection: {
    create: {
      module: 'aim/application/forms/collections/togglecollection',
      args: [
        null,
        {
          modelOptions: {
            idAttribute: 'type'
          }
        }
      ]
    }
  },

  layerCollectionController: {
    create: {
      module: 'aim/application/controllers/collectioncontroller',
      args: [
        {
          collection: { $ref: 'layerStateCollection' },
          itemControllerLookup: { wire: 'aim/maps/layers/config/layercontrollers' },
          itemViewOptions: {
            mapState: { $ref: 'appState' }
          }
        }
      ]
    }
  },

  layerControlsController: {
    create: {
      module: 'aim/application/forms/controllers/togglecollectioncontroller',
      args: [
        {
          collection: { $ref: 'layerStateCollection' },
          className: 'aeris-map-controls',
          itemViewOptions: {
            template: { module: 'hbars!aim/maps/core/views/toggle.html' },
            selectedClass: 'aeris-selected',
            deselectedClass: 'aeris-deselected'
          },
          handlebarsHelpers: {
            i18n: { module: 'aim/application/templatehelpers/i18n' }
          }
        }
      ]
    }
  },

  $plugins: [
    { module: 'aim/application/plugins/classfactory' }
  ]
});
