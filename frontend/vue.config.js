const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
    transpileDependencies: true,
    allowedHosts: [
        'localhost',
        'sou-program-app-preview-tin-front.onrender.com',
        'https://sou-program-app-preview-tin.onrender.com',
    ],
    headers: {
        'Access-Control-Allow-Origin': '*',
    },
});

// { allowedHosts?, bonjour?, client?, compress?, devMiddleware?, headers?, historyApiFallback?, host?, hot?, http2?, https?, ipc?, liveReload?, magicHtml?, onAfterSetupMiddleware?, onBeforeSetupMiddleware?, onListening?, open?, port?, proxy?, server?, setupExitSignals?, setupMiddlewares?, static?, watchFiles?, webSocketServer? }
