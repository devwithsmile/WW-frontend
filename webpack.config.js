import path from 'path';
import CompressionPlugin from 'compression-webpack-plugin';
import BrotliPlugin from 'brotli-webpack-plugin';

export default {
  mode: 'production', // Set to 'production' for optimizations
  entry: './src/index.js', // Your entry file
  output: {
    path: path.resolve('dist'), // Output directory
    filename: '[name].bundle.js', // Output filename pattern
  },
  module: {
    rules: [
      // Your loaders (e.g., Babel, CSS loaders)
    ],
  },
  plugins: [
    new CompressionPlugin({
      filename: '[path].gz[query]', // Output filename pattern
      algorithm: 'gzip', // Compression algorithm
      test: /\.(js|jsx|css|html|svg)$/, // File types to compress
      threshold: 10240, // Only compress files larger than 10KB
      minRatio: 0.8, // Minimum compression ratio
      deleteOriginalAssets: false, // Keep original files
    }),
    new BrotliPlugin({
      filename: '[path].br[query]', // Output filename pattern for Brotli
      test: /\.(js|jsx|css|html|svg)$/, // File types to compress
      threshold: 10240, // Only compress files larger than 10KB
      minRatio: 0.8, // Minimum compression ratio
    }),
  ],
};