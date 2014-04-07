define([
  'aeris/util',
  'aim/application/plugins/helpers/converttoclassfactoryspec'
], function(_, convertToClassFactorySpec) {


  /**
   * Syntactic sugar around factory specs for mapObjectControllers.
   *
   * eg. creates a Radar controller
   *
   *    $mapObjectController: {
   *      mapObject: 'aeris/maps/layers/radar',
   *      options: {
   *        mapState: { $ref: 'mapState' }
   *        other: 'options'
   *      }
   *    }
   *
   *  Short syntax:
   *
   *    $mapObjectController: 'aeris/maps/layers/radar'
   *
   *
   *  Plugin options:
   *
   *    $plugins: [{
   *      module: 'mapObjectController',
   *
   *      // will be used as default app state
   *      // for all controllers
   *      mapState: { $ref: 'mapState' },
   *
   *      controller: 'path/to/default/mapObjectController',
   *    }]
   *
   */
  return function(pluginOptions) {
    var mapState = pluginOptions.mapState;
    var controllerPath = pluginOptions.controller || 'aim/maps/core/controllers/mapobjectcontroller';

    return {
      factories: {
        $mapObjectController: function(resolver, componentDef, wire) {
          var controllerOptions = getControllerOptions(componentDef);
          var mapObjectPath = getMapObjectPath(componentDef);
          var controllerSpec = {
            create: createSpecOptions(mapObjectPath, controllerOptions)
          };

          wire(controllerSpec).
            then(resolver.resolve, resolver.reject);
        },
        $MapObjectController: function(resolver, componentDef, wire) {
          var controllerOptions = getControllerOptions(componentDef);
          var mapObjectPath = getMapObjectPath(componentDef);
          var controllerSpecOptions = createSpecOptions(mapObjectPath, controllerOptions);
          var controllerSpec = convertToClassFactorySpec(controllerSpecOptions);

          wire(controllerSpec).
            then(resolver.resolve, resolver.reject);
        }
      }
    };


    function getMapObjectPath(componentDef) {
      return _.isString(componentDef.options) ?
        componentDef.options :
        componentDef.options.mapObject;
    }

    function getControllerOptions(componentDef) {
      var controllerOptions = componentDef.options.options || {};

      // Use the mapState from the plugin options
      controllerOptions.mapState = controllerOptions.mapState || mapState;

      return controllerOptions;
    }


    function createSpecOptions(mapObjectPath, controllerOptions) {
      return {
        module: controllerPath,
        args: [
          _.defaults(controllerOptions || {}, {
            mapObject: { create: mapObjectPath }
          })
        ]
      };
    }
  }
});
