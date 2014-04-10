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
          controlsController: { $ref: 'layerControlsCollectionController' },
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

  layerControlsCollectionController: {
    create: {
      module: 'aeris/interactive/application/controllers/collectioncontroller',
      args: [
        {
          collection: { $ref: 'layerStateCollection' },
          itemView: { $ref: 'LayerWithSliderControlsController' },

          handlebarsHelpers: {
            i18n: { module: 'aeris/interactive/application/templatehelpers/i18n' }
          },
          className: 'aeris-menu-items',
          tagName: 'ul'
        }
      ]
    }
  },

  LayerWithSliderControlsController: {
    ClassFactory: {
      module: 'aeris/interactive/maps/core/controllers/mapobjectcontrolscontroller',
      args: [{
        controls: [
          { module: 'aeris/interactive/maps/layers/controllers/opacityslidercontroller' }
        ],

        tagName: 'li',
        className: 'aeris-active'
      }]
    }
  },

  $plugins: [
    { module: 'aeris/interactive/application/plugins/classfactory' }
  ]
});
