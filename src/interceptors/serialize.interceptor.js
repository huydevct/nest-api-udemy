"use strict";
exports.__esModule = true;
exports.SerializeInterceptor = exports.Serialize = void 0;
var common_1 = require("@nestjs/common");
var class_transformer_1 = require("class-transformer");
var rxjs_1 = require("rxjs");
function Serialize(dto) {
    return (0, common_1.UseInterceptors)(new SerializeInterceptor(dto));
}
exports.Serialize = Serialize;
var SerializeInterceptor = /** @class */ (function () {
    function SerializeInterceptor(dto) {
        this.dto = dto;
    }
    SerializeInterceptor.prototype.intercept = function (context, handler) {
        // Run something before a request handled
        // by the request handler
        // console.log('Im running before the handler', context);
        var _this = this;
        return handler.handle().pipe((0, rxjs_1.map)(function (data) {
            // Run something before the response is sent out
            // console.log('Im running before response is sent out', data);
            return (0, class_transformer_1.plainToClass)(_this.dto, data, {
                excludeExtraneousValues: true
            });
        }));
    };
    return SerializeInterceptor;
}());
exports.SerializeInterceptor = SerializeInterceptor;
