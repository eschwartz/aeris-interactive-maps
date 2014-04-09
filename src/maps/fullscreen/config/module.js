define({
  $exports: { $ref: 'fullscreenModule' },

  fullscreenModule: {
    create: {
      module: 'aeris/interactive/maps/fullscreen/modules/fullscreenmodule',
      args: [{
        fullscreenController: { $ref: 'fullscreenController' },
        fullscreenBtnController: { $ref: 'fullscreenBtnController' },
        eventHub: { $ref: 'eventHub' }
      }]
    }
  },

  fullscreenController: {
    create: {
      module: 'aeris/interactive/maps/fullscreen/controllers/fullscreencontroller',
      args: [{
        fullscreenService: { $ref: 'fullscreenService' }
      }]
    },
    listenTo: {
      eventHub: {
        'fullscreen:request': 'enterFullscreen',
        'exitFullscreen:request': 'exitFullscreen'
      }
    }
  },

  fullscreenBtnController: {
    create: {
      module: 'aeris/interactive/maps/fullscreen/controllers/fullscreenbtncontroller',
      args: [{
        tagName: 'a',
        eventHub: { $ref: 'eventHub' },
        fullscreenStyle: { wire: 'aeris/interactive/maps/fullscreen/config/fullscreenstyle' },
        template: { $ref: 'fullscreenBtnTemplate' },
        fullscreenClass: { $ref: 'fullscreenBtnClasses.fullscreen' },
        exitFullscreenClass: { $ref: 'fullscreenBtnClasses.exitFullscreen' },
        fullscreenService: { $ref: 'fullscreenService' }
      }]
    }
  },

  // FullscreenBtnController configuration options
  fullscreenBtnTemplate: { module: 'hbars!aeris/interactive/maps/fullscreen/view/fullscreenbutton.html' },
  fullscreenBtnClasses: {
    fullscreen: 'aeris-fullscreen',
    exitFullscreen: 'aeris-exitFullscreen'
  },

  fullscreenService: {
    create: 'aeris/interactive/maps/fullscreen/helpers/fullscreenservice'
  },

  $plugins: [
    { module: 'aeris/interactive/application/plugins/events' }
  ]
});
