"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.ReportsController = void 0;
var admin_guard_1 = require("./../guards/admin.guard");
var report_dto_1 = require("./dtos/report.dto");
var auth_guard_1 = require("./../guards/auth.guard");
var common_1 = require("@nestjs/common");
var current_user_decorator_1 = require("../users/decorators/current-user.decorator");
var serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
var ReportsController = /** @class */ (function () {
    function ReportsController(reportService) {
        this.reportService = reportService;
    }
    ReportsController.prototype.getEstimate = function (query) {
        return this.reportService.createEstimate(query);
    };
    ReportsController.prototype.createReport = function (body, user) {
        return this.reportService.create(body, user);
    };
    ReportsController.prototype.approveReport = function (id, body) {
        return this.reportService.changeApproval(id, body.approved);
    };
    __decorate([
        (0, common_1.Get)(),
        __param(0, (0, common_1.Query)())
    ], ReportsController.prototype, "getEstimate");
    __decorate([
        (0, common_1.Post)(),
        (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
        (0, serialize_interceptor_1.Serialize)(report_dto_1.ReportDTO),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, current_user_decorator_1.CurrentUser)())
    ], ReportsController.prototype, "createReport");
    __decorate([
        (0, common_1.Patch)('/:id'),
        (0, common_1.UseGuards)(admin_guard_1.AdminGuard),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], ReportsController.prototype, "approveReport");
    ReportsController = __decorate([
        (0, common_1.Controller)('reports')
    ], ReportsController);
    return ReportsController;
}());
exports.ReportsController = ReportsController;
