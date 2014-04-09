define([
  'aeris/util',
  'aeris/promise',
  'aeris/interactive/appbuilder',
  'aeris/interactive/errors/builderconfigerror',
  'wire!aeris/interactive/maps/config/context'
], function(_, Promise, BaseAppBuilder, BuilderConfigError, context) {
  /**
   *
   * @class MapAppBuilder
   * @namespace aeris.interactive.maps
   * @extends aeris.interactive.AppBuilder
   *
   * @constructor
   * @param {aeris.interactive.maps.options.MapAppBuilderOptions} config MapBuilder configuration.
   * @param {aeris.interactive.options.AppBuilderOptions} opt_builderOptions
   *        An injectable configuration instance.
   */
  var MapAppBuilder = function(config, opt_builderOptions) {
    // Set builderOptions config
    var builderOptions = opt_builderOptions || context.builderOptions;

    BaseAppBuilder.call(this, config, builderOptions);
  };
  _.inherits(MapAppBuilder, BaseAppBuilder);


  /**
   * @method build
   */
  MapAppBuilder.prototype.build = function() {
    var buildPromise = new Promise();


    // Call onload/onerror config options
    buildPromise.
      done(this.options_.get('onload'), window).
      fail(this.options_.get('onerror'), window);

    try {
      this.options_.isValid();

      context.mapApp.start(this.options_);

      buildPromise.resolve({
        state: context.appState
      });
    }
    catch (e) {
      if (e instanceof BuilderConfigError) {
        buildPromise.reject(e);
      }
      else { throw e; }
    }

    return buildPromise;
  };


  return MapAppBuilder;
});
