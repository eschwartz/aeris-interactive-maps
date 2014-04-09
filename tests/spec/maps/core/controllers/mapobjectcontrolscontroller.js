define([
  'aeris/util',
  'aeris/interactive/maps/core/controllers/mapobjectcontrolscontroller',
  'aeris/mocks/aeris/toggle',
  'tests/mocks/application/controllers/controllerinterface',
  'hbars!./fixtures/mapobjectcontrols.html'
], function(_, MapObjectControlsController, Toggle, MockController, mapObjectControlsTemplate) {

  describe('MapObjectControlsController', function() {
    var mapObjectControlsController;
    var model;

    beforeEach(function() {
      model = new Toggle();
      mapObjectControlsController = new MapObjectControlsController({
        model: model,
        template: mapObjectControlsTemplate,
        ui: {
          toggleBtn: '.toggleBtn',
          controlsRegion: '.controlsRegion'
        }
      });
    });


    describe('constructor', function() {
      var controls;

      beforeEach(function() {
        controls = [
          new MockController(),
          new MockController(),
          new MockController()
        ];

        spyOn(MapObjectControlsController.prototype, 'addControls');

        mapObjectControlsController = new MapObjectControlsController({
          model: model,
          template: mapObjectControlsTemplate,
          ui: {
            toggleBtn: '.toggleBtn',
            controlsRegion: '.controlsRegion'
          },
          controls: controls
        });
      });


      describe('controls option', function() {

        describe('before render', function() {

          it('should not add the controls', function() {
            expect(mapObjectControlsController.addControls).not.toHaveBeenCalled();
          });

        });

        describe('after render', function() {

          beforeEach(function() {
            mapObjectControlsController.render();
          });


          it('should add the controls', function() {
            controls.forEach(function(Controller) {
              expect(mapObjectControlsController.addControls).toHaveBeenCalledWith(Controller);
            });
          });

        });

      });

    });


    describe('addControls', function() {
      var ControlsController, mockController;

      beforeEach(function() {
        mockController = null;
        ControlsController = jasmine.createSpy('ControlsController').
          andCallFake(function(options) {
            return mockController = new MockController(options);
          });

        mapObjectControlsController.render();
      });


      it('should instantiate the controls Controller, providing its model', function() {
        mapObjectControlsController.addControls(ControlsController);

        expect(ControlsController).toHaveBeenCalled();
        expect(mockController.ctorArgs[0].model).toEqual(mapObjectControlsController.model);
      });

      it('should render the controls instance', function() {
        mapObjectControlsController.addControls(ControlsController);

        expect(mockController.render).toHaveBeenCalled();
      });

      it('should append the controls element to the controlsRegion', function() {
        mapObjectControlsController.addControls(ControlsController);

        expect(mapObjectControlsController.ui.controlsRegion.find(mockController.$el).length).
          toEqual(1);
      });

    });

  });

});
