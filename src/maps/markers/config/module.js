/**
 * Context for the Markers module
 *
 * @class context
 * @namespace aeris.interactive.maps.markers.config
 * @static
 */
define({
  $exports: { $ref: 'markersModule' },

  markerStateCollection: {
    create: {
      module: 'aeris/interactive/maps/core/collections/mapobjecttogglecollection',
      args: [undefined, {
        // Use MarkerToggle model with our state collection.
        model: { module: 'aeris/interactive/maps/markers/models/markertoggle' }
      }]
    }
  },

  markersModule: {
    create: {
      module: 'aeris/interactive/maps/markers/modules/markersmodule',
      args: [
        {
          appState: { $ref: 'appState' },
          appStateAttr: 'markers',
          moduleState: { $ref: 'markerStateCollection' },
          eventHub: { $ref: 'eventHub' },

          mapObjectController: { $ref: 'markerViewController' },
          controlsController: { $ref: 'markerControlsController' },

          validFilters: { module: 'aeris/interactive/maps/markers/config/validmarkerfilters' },

          // Constructor for MarkerInfoController
          // (marker details view)
          MarkerInfoController: { $ref: 'MarkerInfoController' }
        }
      ]
    },
    listenTo: {
      eventHub: {
        'marker:click': 'eventDataTransformer.markerClick | renderMarkerInfo'
      }
    }
  },

  markerViewController: {
    create: {
      module: 'aeris/interactive/maps/core/controllers/mapobjectcollectioncontroller',
      args: [
        {
          collection: { $ref: 'markerStateCollection' },
          itemView: { module: 'aeris/interactive/maps/markers/controllers/markercontroller' },
          itemViewOptions: {
            appState: { $ref: 'appState' },
            eventHub: { $ref: 'eventHub' }
          }
        }
      ]
    }
  },

  // Represents map controls
  // for all types of Marker objects
  markerControlsController: {
    create: {
      module: 'aeris/interactive/maps/core/controllers/togglecontrolscontroller',
      args: [
        {
          eventHub: { $ref: 'eventHub' },
          name: 'markers',
          collection: { $ref: 'markerStateCollection' },
          itemView: { $ref: 'MarkerMenuController' }
        }
      ]
    }
  },

  // Map controls for a single marker object type
  // (where the menu sub-items are filter toggles)
  MarkerMenuController: {
    ClassFactory: {
      module: 'aeris/interactive/maps/markers/controllers/markermenucontroller',
      args: [
        {
          template: { module: 'hbars!aeris/interactive/maps/markers/views/markermenuitem.html' },
          handlebarsHelpers: {
            i18n: { module: 'aeris/interactive/application/templatehelpers/i18n' }
          },
          className: 'aeris-navItem',

          ui: {
            navBtn: '.aeris-navItemLabel'
          },

          regions: {
            filters: '.aeris-markerFilterSelect'
          },

          FilterTogglesController: { $ref: 'FilterTogglesController' }
        }
      ]
    }
  },

  // A set of filter toggle controls
  FilterTogglesController: {
    ClassFactory: {
      module: 'aeris/interactive/maps/markers/controllers/filtertogglescontroller',
      args: [
        {
          className: 'aeris-subMenu',

          itemViewOptions: {
            template: { module: 'hbars!aeris/interactive/maps/core/views/toggle.html' },
            handlebarsHelpers: {
              i18n: { module: 'aeris/interactive/application/templatehelpers/i18n' }
            },
            className: 'aeris-subMenuItem',
            selectedClass: 'aeris-selected',
            deselectedClass: 'aeris-deselected'
          }
        }
      ]
    }
  },


  MarkerInfoController: {
    ClassFactory: {
      module: 'aeris/interactive/maps/markers/controllers/markerinfocontroller',
      args: [
        {
          template: { module: 'hbars!aeris/interactive/maps/markers/views/markerdetails.html' }
        }
      ]
    }
  },

  eventDataTransformer: { module: 'aeris/interactive/maps/transformers/eventdatatransformer' },

  $plugins: [
    { module: 'aeris/interactive/application/plugins/events' },
    { module: 'aeris/interactive/application/plugins/classfactory' }
  ]
});
