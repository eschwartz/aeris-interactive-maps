define([
  'aeris/util',
  'aeris/interactive/application/controllers/collectioncontroller',
  'aeris/interactive/application/controllers/itemcontroller',
  'tests/mocks/template',
  'aeris/collection',
  'aeris/model'
], function(_, CollectionController, ItemController, mockTemplate, Collection, Model) {

  var MockControllerTypeFactory = function(typeId) {
    var MockControllerType = function(opt_options) {
      var options = _.defaults(opt_options || {}, {
        template: mockTemplate
      });
      ItemController.call(this, options);
    };
    _.inherits(MockControllerType, ItemController);

    MockControllerType.prototype.jasmineToString = function() {
      return typeId;
    };

    MockControllerType.jasmineToString = function() {
      return 'Type_' + typeId + '_';
    };

    return MockControllerType;
  };



  describe('CollectionController', function() {
    var collectionController;
    var itemControllerLookup, DefaultController;
    var collection, modelA, modelB, modelC;

    beforeEach(function() {
      itemControllerLookup = {
        A: MockControllerTypeFactory('A'),
        B: MockControllerTypeFactory('B'),
        C: MockControllerTypeFactory('C')
      };

      modelA = new Model({ id: 'A' });
      modelB = new Model({ id: 'B' });
      modelC = new Model({ id: 'C' });

      DefaultController = MockControllerTypeFactory('DEFAULT');

      collection = new Collection();

      collectionController = new CollectionController({
        itemControllerLookup: itemControllerLookup,
        collection: collection,
        itemView: DefaultController
      });
    });


    describe('render', function() {

      it('should render controllers according to the itemControllerLookup', function() {
        collection.add(modelA);
        collection.add(modelB);

        collectionController.render();

        expect(collectionController.children.findByModel(modelA)).
          toBeInstanceOf(itemControllerLookup.A);
        expect(collectionController.children.findByModel(modelB)).
          toBeInstanceOf(itemControllerLookup.B);
      });

      describe('when no corresponding controller is defined in the lookup', function() {

        it('should render the default itemView option', function() {
          var model = new Model({
            id: 'no_corresponding_controller'
          });
          collection.add(model);

          expect(collectionController.children.findByModel(model)).
            toBeInstanceOf(DefaultController);
        });

      });

    });

  });

});
