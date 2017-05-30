const path = require('path');

module.exports = {
    entry: './src-frontend/app.js',
    output: {
        path: path.resolve(__dirname, 'resources/js/'),
        filename: 'app.bundle.js'
    }
};
