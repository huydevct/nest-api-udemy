"use strict";
exports.__esModule = true;
exports.AdminGuard = void 0;
var AdminGuard = /** @class */ (function () {
    function AdminGuard() {
    }
    AdminGuard.prototype.canActivate = function (context) {
        var request = context.switchToHttp().getRequest();
        if (!request.currentUser) {
            return false;
        }
        return request.currentUser.admin;
    };
    return AdminGuard;
}());
exports.AdminGuard = AdminGuard;
