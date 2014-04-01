/**
 * WireJS Spec for Routes App RouteBuilder module
 * @class context
 * @namespace aeris.builder.routes.routebuilder.config
 * @static
 */
define({
  $exports: { $ref: 'routeBuilderModule' },

  routeBuilderModule: {
    create: {
      module: 'aim/routes/routebuilder/modules/routebuildermodule',
      args: [
        {
          routeControlsController: { $ref: 'controllers.routeControlsController' },
          routeBuilderController: { $ref: 'controllers.routeBuilderController' },
          eventHub: { $ref: 'eventHub' },
          appState: { $ref: 'appState' },
          modules: { wire: 'aim/routes/routebuilder/config/submodules' }
        }
      ]
    }
  },

  controllers: { wire: 'aim/routes/routebuilder/config/controllers' },

  routeBuilder: { wire: 'aim/routes/routebuilder/config/routebuilder' }

});
