define([
  'aeris/classfactory',    // Require module for rjs build.
  'aim/application/plugins/helpers/converttoclassfactoryspec'
], function(ClassFactory, convertToClassFactorySpec) {
  return function(pluginOptions) {
    return {
      factories: {
        ClassFactory: function(resolver, componentDef, wire) {
          var classFactorySpec = convertToClassFactorySpec(componentDef.options);

          wire(classFactorySpec).
            then(resolver.resolve, resolver.reject);
        }
      }
    };
  };
});
