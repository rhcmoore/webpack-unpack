const path = require("path");
const autoprefixer = require("autoprefixer");

module.exports = {
    devtool: "cheap-module-eval-source-map", // get source maps - for debugging in browser
    entry: "./src/index.js", // tells webpack to look at index and analyze dependencies
    output: {  // create new folder with file
        path: path.resolve(__dirname, "dist"), // where file should be stored
        filename: "bundle.js", // name of bundled JS file
        chunkFilename: "[id].js", // dynamically generated for lazy loading
        publicPath: "" // where files are put (root vs. nested folder)
    },
    resolve: { // provide extensions to files when not provided
        extensions: [".js", ".jsx"]
    },
    module: { // loaders to handle file/module types
        rules: [
            // JS files
            {
                test: /\.js$/, // if we're in a .js file...
                loader: "babel-loader", // ...apply this loader (configured in .babelrc)
                exclude: /node_modules/ // don't transform these, they're already optimized
            },
            // CSS files
            {
                test: /\.css$/, 
                exclude: /node_modules/,
                use: [ // use 'use' to apply multiple loaders
                    { 
                        loader: "style-loader" // runs last
                    }, 
                    {
                        loader: "css-loader", // runs before style-loader
                        options: {
                            importLoaders: 1, // for postcss-loader running first
                            modules: true, // enables CSS modules
                            localIdentName: '[name]__[local]__[hash:base64:5]' // define unique generated name for CSS classes
                        }
                    },
                    {
                        loader: "postcss-loader", // runs before css-loader (bottom to top)
                        options: {
                            ident: "postcss",
                            plugins: () => [
                                autoprefixer({
                                    browsers: [
                                        "> 1%",
                                        "last 2 versions"
                                    ]
                                })
                            ]
                        }
                    }
                ]
            },
            // Images
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader?limit=8000&name=images/[name].[ext]" 
                // takes images - if below threshold they are converted to data64 urls to inline into documents (not downloading files)
                // files above limit are copied to poutput folder, generate link to file and puts that into import for components
                // params are another loader (file-loader) - copies file and gives us a link to it 
                    // limit threshold at 8000 bytes
                    // image copied with original name/ext into images folder of dist 
            }
        ]
    },
};