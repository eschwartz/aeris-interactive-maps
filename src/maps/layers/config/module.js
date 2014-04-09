/**
 * Context for the Layers module
 *
 * @property aeris.interactive.maps.layers.config.context
 * @type {Object}
 */
define({
  $exports: { $ref: 'layersModule' },

  layersModule: {
    create: {
      module: 'aeris/interactive/maps/layers/modules/layersmodule',
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
      module: 'aeris/interactive/application/forms/collections/togglecollection',
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
      module: 'aeris/interactive/application/controllers/collectioncontroller',
      args: [
        {
          collection: { $ref: 'layerStateCollection' },
          itemControllerLookup: { wire: 'aeris/interactive/maps/layers/config/layercontrollers' },
          itemViewOptions: {
            mapState: { $ref: 'appState' }
          }
        }
      ]
    }
  },

  layerControlsController: {
    create: {
      module: 'aeris/interactive/application/controllers/togglecollectioncontroller',
      args: [
        {
          collection: { $ref: 'layerStateCollection' },
          className: 'aeris-map-controls',
          itemViewOptions: {
            template: { module: 'hbars!aeris/interactive/maps/core/views/toggle.html' },
            selectedClass: 'aeris-selected',
            deselectedClass: 'aeris-deselected'
          },
          handlebarsHelpers: {
            i18n: { module: 'aeris/interactive/application/templatehelpers/i18n' }
          }
        }
      ]
    }
  },

  $plugins: [
    { module: 'aeris/interactive/application/plugins/classfactory' }
  ]
});
