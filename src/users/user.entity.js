"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var report_entity_1 = require("./../reports/report.entity");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.logInsert = function () {
        console.log('Inserted user witd id ', this.id);
    };
    User.prototype.logRemove = function () {
        console.log('Remove user with id ', this.id);
    };
    User.prototype.logUpdate = function () {
        console.log('Update user with id ', this.id);
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)({ "default": true })
    ], User.prototype, "admin");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return report_entity_1.Report; }, function (report) { return report.user; })
    ], User.prototype, "reports");
    __decorate([
        (0, typeorm_1.AfterInsert)()
    ], User.prototype, "logInsert");
    __decorate([
        (0, typeorm_1.AfterRemove)()
    ], User.prototype, "logRemove");
    __decorate([
        (0, typeorm_1.AfterUpdate)()
    ], User.prototype, "logUpdate");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
