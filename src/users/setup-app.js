"use strict";
exports.__esModule = true;
exports.setupApp = void 0;
var common_1 = require("@nestjs/common");
var cookieSession = require('cookie-session');
var setupApp = function (app) {
    app.use(cookieSession({
        keys: ['asdasdfd']
    }));
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true
    }));
};
exports.setupApp = setupApp;
