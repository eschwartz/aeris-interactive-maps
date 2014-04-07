define([
  'aeris/util',
  'wire!tests/spec/application/plugins/fixtures/mapobjectcontroller',
  'tests/mocks/application/controllers/controllerinterface',
  'aeris/mocks/mapobject'
], function(_, context, MockController, MockMapObject) {

  describe('$mapObjectController plugin', function() {

    describe('The created mapObjectController', function() {

      it('should be an instance of the \'controller\' option', function() {
        expect(context.controller).toBeInstanceOf(MockController);
      });

      describe('constructor args', function() {

        it('should use an instance of the specified mapObject', function() {
          expect(context.controller.ctorArgs[0].mapObject).toBeInstanceOf(MockMapObject);
        });

        it('should use an instance of the specified mapObject (short syntax)', function() {
          expect(context.controller_short_syntax.ctorArgs[0].mapObject).toBeInstanceOf(MockMapObject);
        });

        it('should use arbitrary options', function() {
          expect(context.controller_with_foo_bar.ctorArgs[0].foo).toEqual('bar');
        });

        it('should use a provided mapState', function() {
          expect(context.controller_mapState_B.ctorArgs[0].mapState).
            toEqual(context.mapState_B);
        });

        it('should default to the mapState specified in the plugin options', function() {
          expect(context.controller.ctorArgs[0].mapState).
            toEqual(context.mapState);
        });

      });

    });

  });


  describe('$MapObjectController plugin', function() {

    it('should create a mapObjectController constructor', function() {
      expect(_.isFunction(context.Controller)).toEqual(true);
      expect(new context.Controller()).toBeInstanceOf(MockController);
    });

    describe('instances of the constructor', function() {
      var controller, controllerOptions;

      beforeEach(function() {
        controller = new context.Controller();
        controllerOptions = controller.ctorArgs[0];
      });


      describe('constructor args', function() {

        it('should provide the configured map object', function() {
          expect(controllerOptions.mapObject).toBeInstanceOf(MockMapObject);
        });

      });

    });

  });

});
