/* eslint-disable @typescript-eslint/no-require-imports */
const path = require('path');
const rspack = require('@rspack/core');
const isDev = process.env.NODE_ENV === 'development';
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');

/**
 * @type {import('@rspack/cli').Configuration}
 */

module.exports = {
  context: __dirname,
  entry: {
    main: './src/index.tsx',
  },
  mode: isDev ? 'development' : 'production',
  output: {
    webassemblyModuleFilename: '[hash].wasm',
    path: path.resolve(process.cwd(), 'build'),
    filename: isDev ? '[name].js' : '[name][contenthash].js',
    clean: true,
    cssFilename: isDev ? '[name].css' : '[name][contenthash].css',
  },

  devtool: isDev ? 'source-map' : false,

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: {
          loader: 'builtin:swc-loader',
          options: {
            jsc: {
              parser: {
                syntax: 'ecmascript',
                jsx: true,
              },
              transform: {
                react: {
                  development: isDev,
                  refresh: isDev,
                },
              },
              // target: 'es5',
            },
            env: {
              targets: 'chrome >= 48',
              mode: 'entry',
            },
          },
        },
      },
      {
        test: /\.tsx$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
              tsx: true,
            },
          },
        },
      },
      {
        test: /\.ts$/,
        exclude: /[\\/]node_modules[\\/]/,
        loader: 'builtin:swc-loader',
        options: {
          sourceMap: true,
          jsc: {
            parser: {
              syntax: 'typescript',
            },
          },
        },
      },
      {
        test: /.css$/,
        use: [
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: {
                  tailwindcss: {},
                },
              },
            },
          },
        ],
        type: 'css',
      },
      {
        test: /\.s[ac]ss$/,
        use: ['sass-loader'],
        type: 'css',
      },
      // {
      //   test: /\.png$/,
      //   type: 'asset/resource',
      //   parser: {
      //     dataUrlCondition: {
      //       // Modules less than or equal to 4kb and ending in `.png` will be Base64 encoded
      //       maxSize: 4 * 1024,
      //     },
      //   },
      // },
    ],
  },
  resolve: {
    extensions: ['...', '.tsx', '.ts', '.jsx', '.wasm'],
    // 'core-js': require('path').dirname(require.resolve('core-js')),
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  experiments: {
    asyncWebAssembly: true,
  },
  plugins: [isDev && new ReactRefreshPlugin(), new rspack.HtmlRspackPlugin({ template: './public/index.html' })].filter(Boolean),
  devServer: {
    client: {
      overlay: false,
    },

    port: 8568,
  },
};
