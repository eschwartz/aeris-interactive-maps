define([
  'aeris/util',
  'aeris/promise',
  'aeris/interactive/appbuilder',
  'wire!aeris/interactive/routes/config/context'
], function(_, Promise, BaseAppBuilder, context) {
  /**
   *
   * @class RouteAppBuilder
   * @namespace aeris.interactive.route
   * @extends aeris.interactive.AppBuilder
   *
   * @constructor
   * @param {aeris.interactive.routes.options.RouteBuilderOptions} config MapBuilder configuration.
   * @param {aeris.interactive.routes.options.RouteBuilderOptions} opt_builderOptions
   *        An injectable configuration instance.
   */
  var RouteAppBuilder = function(config, opt_builderOptions) {
    // Pull in builderOptions instance form wired config
    var builderOptions = opt_builderOptions || context.builderOptions;

    BaseAppBuilder.call(this, config, builderOptions);
  };
  _.inherits(RouteAppBuilder, BaseAppBuilder);


  RouteAppBuilder.prototype.build = function() {
    var buildPromise = new Promise();

    try {
      this.options_.isValid();

      context.routeApp.start(this.options_);

      buildPromise.resolve();
    }
    catch (e) {
      buildPromise.reject(e);
    }

    return buildPromise;
  };


  return RouteAppBuilder;
});
