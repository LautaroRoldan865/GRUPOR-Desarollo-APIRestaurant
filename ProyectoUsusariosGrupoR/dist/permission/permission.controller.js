"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PermissionController = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permissions_decorator_1 = require("../middlewares/decorators/permissions.decorator");
const common_2 = require("@nestjs/common");
const common_3 = require("@nestjs/common");
const common_4 = require("@nestjs/common");
const permision_entity_1 = require("../entities/permision.entity");
const permission_service_1 = require("./permission.service");
const common_5 = require("@nestjs/common");
let PermissionController = class PermissionController {
    constructor(service) {
        this.service = service;
    }
    async create(request, Permissions) {
        return this.service.createPermission(Permissions);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    update(id, permiso) {
        return this.service.update(id, permiso);
    }
    updatepartial(id, permiso) {
        return this.service.updatePartion(id, permiso);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
exports.PermissionController = PermissionController;
__decorate([
    (0, common_2.UseGuards)(auth_middleware_1.AuthGuard),
    (0, permissions_decorator_1.Permissions)(['create_permission']),
    (0, common_3.Post)(),
    __param(0, (0, common_4.Req)()),
    __param(1, (0, common_5.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Request, permision_entity_1.PermissionEntity]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "create", null);
__decorate([
    (0, common_3.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "findAll", null);
__decorate([
    (0, common_3.Get)(':id'),
    __param(0, (0, common_3.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "findOne", null);
__decorate([
    (0, common_3.Put)(':id'),
    __param(0, (0, common_3.Param)('id')),
    __param(1, (0, common_5.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, permision_entity_1.PermissionEntity]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "update", null);
__decorate([
    (0, common_3.Patch)(':id'),
    __param(0, (0, common_3.Param)('id')),
    __param(1, (0, common_5.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "updatepartial", null);
__decorate([
    (0, common_3.Delete)(':id'),
    __param(0, (0, common_3.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], PermissionController.prototype, "delete", null);
exports.PermissionController = PermissionController = __decorate([
    (0, common_1.Controller)('permission'),
    __metadata("design:paramtypes", [permission_service_1.PermissionService])
], PermissionController);
//# sourceMappingURL=permission.controller.js.map