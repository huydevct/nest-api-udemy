"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportDTO = void 0;
var class_transformer_1 = require("class-transformer");
var ReportDTO = /** @class */ (function () {
    function ReportDTO() {
    }
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "id");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "year");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "price");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "lng");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "lat");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "make");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "model");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "mileage");
    __decorate([
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "approved");
    __decorate([
        (0, class_transformer_1.Transform)(function (_a) {
            var obj = _a.obj;
            return obj.user.id;
        }),
        (0, class_transformer_1.Expose)()
    ], ReportDTO.prototype, "userId");
    return ReportDTO;
}());
exports.ReportDTO = ReportDTO;
