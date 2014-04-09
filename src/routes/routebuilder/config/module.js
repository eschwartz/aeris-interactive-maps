/**
 * WireJS Spec for Routes App RouteBuilder module
 * @class context
 * @namespace aeris.interactive.routes.routebuilder.config
 * @static
 */
define({
  $exports: { $ref: 'routeBuilderModule' },

  routeBuilderModule: {
    create: {
      module: 'aeris/interactive/routes/routebuilder/modules/routebuildermodule',
      args: [
        {
          routeControlsController: { $ref: 'controllers.routeControlsController' },
          routeBuilderController: { $ref: 'controllers.routeBuilderController' },
          eventHub: { $ref: 'eventHub' },
          appState: { $ref: 'appState' },
          modules: { wire: 'aeris/interactive/routes/routebuilder/config/submodules' }
        }
      ]
    }
  },

  controllers: { wire: 'aeris/interactive/routes/routebuilder/config/controllers' },

  routeBuilder: { wire: 'aeris/interactive/routes/routebuilder/config/routebuilder' }

});
