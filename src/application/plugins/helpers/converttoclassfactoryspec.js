define([
  'aeris/classfactory'
], function() {
  return function convertToClassFactorySpec(spec) {
    return {
      create: {
        module: 'aeris/classfactory',
        args: [
          { module: spec.module },
          spec.args,
          { extendArgObjects: true }
        ]
      }
    };
  }
});
