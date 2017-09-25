// Import path for resolving file paths
var path = require('path');
module.exports = {
  // Specify the entry point for our app.
  entry: [
    path.join(__dirname, 'index.js')
  ],
  // Specify the output file containing our bundled code
  output: {
    path: __dirname+"/output",
    filename: 'bundle.js'
  },
  target : "node",
  module: {
    /**
      * Tell webpack how to load 'json' files. 
      * When webpack encounters a 'require()' statement
      * where a 'json' file is being imported, it will use
      * the json-loader.  
      */
    loaders: [
      {
     //   test: /\.json$/, 
     //   loaders: ['json']
      }
    ]
  }
}