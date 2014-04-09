define([
  'aeris/util',
  'aeris/interactive/application/modules/application'
], function(_, Application) {
  /**
   *
   * @class RouteApp
   * @namespace aeris.interactive.routes.routeapp
   * @extends aeris.interactive.application.modules.Application
   *
   * @constructor
   * @override
   */
  var RouteApp = function() {
    Application.apply(this, arguments);
  };
  _.inherits(RouteApp, Application);


  /**
   * @method filterChildModules_
   */
  RouteApp.prototype.filterChildModules_ = function(modules, builderOptions) {
    // Don't start controls, if they're turned off
    if (!builderOptions.get('controls').routes) {
      delete modules.routeBuilderModule;
    }

    return modules;
  };


  return RouteApp;
});
