"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateReportDTO = void 0;
var class_validator_1 = require("class-validator");
var CreateReportDTO = /** @class */ (function () {
    function CreateReportDTO() {
    }
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateReportDTO.prototype, "make");
    __decorate([
        (0, class_validator_1.IsString)()
    ], CreateReportDTO.prototype, "model");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(1930),
        (0, class_validator_1.Max)(2050)
    ], CreateReportDTO.prototype, "year");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(1000000)
    ], CreateReportDTO.prototype, "mileage");
    __decorate([
        (0, class_validator_1.IsLongitude)()
    ], CreateReportDTO.prototype, "lng");
    __decorate([
        (0, class_validator_1.IsLatitude)()
    ], CreateReportDTO.prototype, "lat");
    __decorate([
        (0, class_validator_1.IsNumber)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(1000000)
    ], CreateReportDTO.prototype, "price");
    return CreateReportDTO;
}());
exports.CreateReportDTO = CreateReportDTO;
