define({
  $exports: { $ref: 'routeBuilderController' },

  routeBuilderController: {
    create: {
      module: 'aim/routes/routebuilder/controllers/routebuildercontroller',
      args: [
        {
          routeBuilder: { $ref: 'routeBuilder' },
          RoutePoint: { $ref: 'RoutePoint' },
          eventHub: { $ref: 'eventHub' }
        }
      ]
    }
  },

  RoutePoint: {
    module: 'aeris/maps/routes/waypoint'
  }
});
