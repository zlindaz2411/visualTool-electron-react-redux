const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    target: 'electron-renderer',
    
    // Tell webpack the root file of our
    // server application 
    entry: ['./src/client.js', './src/assets/scss/styles.scss'],

    // Tell webpack where to put the output file
    // that is generated
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        publicPath: ''
    },

    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                options: {
                    presets: ['@babel/preset-react', '@babel/preset-env',
                    {
                        targets: {
                          esmodules: true,
                          node:10
                        }
                      }
                
                    ],
                    plugins: ['@babel/plugin-transform-runtime', "@babel/plugin-proposal-export-default-from", "@babel/plugin-proposal-export-namespace-from"],
                } 
            },
            
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                        name: 'assets/images/[name].[ext]',
                    }
                  }
                ]
              },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].min.css',
                            outputPath: 'assets/css/'
                        }
                    },
                    {
                        loader: 'extract-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            minimize: true
                        }
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'src/renderer/index.html', to: 'index.html' },
            { from: 'src/assets/static_assets', to: 'static_assets' },
        ])
    ]

};

