define({
  $exports: { $ref: 'routePointInfoModule' },

  routePointInfoModule: {
    create: {
      module: 'aeris/interactive/routes/routebuilder/routepointinfo/modules/routepointinfomodule',
      args: [
        {
          eventHub: { $ref: 'eventHub' },
          InfoPanelController: { $ref: 'RoutePointInfoPanelController' },
          routeBuilder: { $ref: 'routeBuilder' }
        }
      ]
    }
  },

  RoutePointInfoPanelController: {
    ClassFactory: {
      module: 'aeris/interactive/routes/routebuilder/routepointinfo/controllers/infopanelcontroller',
      args: [
        {
          InfoPanelViewModel: { $ref: 'InfoPanelViewModel' },
          routeBuilder: { $ref: 'routeBuilder' },
          template: { $ref: 'routePointInfoTemplate' },
          ui: {
            deleteBtn: '.aeris-deleteBtn',
            closeBtn: 'h1',
            transitionTarget: 'header, section'
          }
        }
      ]
    }
  },

  routePointInfoTemplate: {
    module: 'hbars!aeris/interactive/routes/routebuilder/routepointinfo/views/routepointinfopanel.html'
  },

  InfoPanelViewModel: {
    module: 'aeris/interactive/routes/routebuilder/routepointinfo/viewmodels/infopanelviewmodel'
  },

  $plugins: [
    { module: 'aeris/interactive/application/plugins/classfactory' }
  ]
});
