"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UsersModule = void 0;
var current_user_middleware_1 = require("./middlewares/current-user.middleware");
var user_entity_1 = require("./user.entity");
var typeorm_1 = require("@nestjs/typeorm");
var common_1 = require("@nestjs/common");
var users_controller_1 = require("./users.controller");
var users_service_1 = require("./users.service");
var auth_service_1 = require("./auth.service");
var UsersModule = /** @class */ (function () {
    function UsersModule() {
    }
    UsersModule.prototype.configure = function (consumer) {
        consumer.apply(current_user_middleware_1.CurrentUserMiddleware).forRoutes('*');
    };
    UsersModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.User])],
            controllers: [users_controller_1.UsersController],
            providers: [
                users_service_1.UsersService,
                auth_service_1.AuthService,
                // {
                //   provide: APP_INTERCEPTOR,
                //   useClass: CurrentUserInterceptor,
                // },
            ]
        })
    ], UsersModule);
    return UsersModule;
}());
exports.UsersModule = UsersModule;
