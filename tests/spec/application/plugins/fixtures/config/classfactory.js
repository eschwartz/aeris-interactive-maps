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
    'aeris/interactive/application/plugins/classfactory'
  ]
});
