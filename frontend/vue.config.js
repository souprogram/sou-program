const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        allowedHosts: [
            'localhost',
            'sou-program-app-preview-tin-front.onrender.com',
            'https://sou-program-app-preview-tin.onrender.com',
        ],
        headers: {
            'Access-Control-Allow-Origin': '*',
        },
    },
});