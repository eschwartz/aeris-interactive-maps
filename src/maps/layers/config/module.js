/**
 * Context for the Layers module
 *
 * @property aeris.builder.maps.layers.config.context
 * @type {Object}
 */
define({
  $exports: { $ref: 'layersModule' },

  LayerState: {
    ClassFactory: {
      module: 'aim/maps/core/models/mapobjecttoggle',
      args: [
        undefined,
        {
          namespace: 'aeris.maps.layers'
        }
      ]
    }
  },

  layerStateCollection: {
    create: {
      module: 'aim/maps/core/collections/mapobjecttogglecollection',
      args: [
        undefined,
        {
          // use the LayerState model
          model: {$ref: 'LayerState' }
        }
      ]
    }
  },

  layersModule: {
    create: {
      module: 'aim/maps/core/modules/mapobjectmodule',
      args: [
        {
          appState: { $ref: 'appState' },
          appStateAttr: 'layers',
          moduleState: { $ref: 'layerStateCollection' },

          mapObjectController: { $ref: 'layerViewController' },
          controlsController: { $ref: 'layerControlsController' }
        }
      ]
    }
  },

  // Controller for Layer MapExtObjs
  layerViewController: {
    create: {
      module: 'aim/maps/core/controllers/mapobjectcollectioncontroller',
      args: [
        {
          collection: { $ref: 'layerStateCollection' },
          itemViewOptions: {
            appState: { $ref: 'appState' }
          }
        }
      ]
    }
  },

  layerControlsController: {
    create: {
      module: 'aim/maps/core/controllers/togglecontrolscontroller',
      args: [
        {
          eventHub: { $ref: 'eventHub' },
          name: 'layers',
          collection: { $ref: 'layerStateCollection' },
          className: 'aeris-map-controls',
          itemViewOptions: {
            template: { module: 'hbars!aim/maps/core/views/toggle.html' }
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
