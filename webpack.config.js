import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: './public/scss/main.scss', // Entry point for your SCSS file
  mode: 'development',
  output: {
    filename: 'bundle.css', // Output filename
    path: path.resolve(__dirname, 'public/css'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.scss$/, // Process .scss files
        use: ['style-loader', 'css-loader', 'sass-loader'], // Use these loaders
      },
    ],
  },
};
