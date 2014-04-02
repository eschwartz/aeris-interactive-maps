define({
  ModelFactory: {
    ClassFactory: {
      module: 'aeris/model',
      args: [
        {
          color: 'blue',
          width: 100
        }
      ]
    }
  },

  $plugins: [
    'aim/application/plugins/classfactory'
  ]
});
