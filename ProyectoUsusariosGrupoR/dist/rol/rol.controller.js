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
exports.RolController = void 0;
const common_1 = require("@nestjs/common");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const permissions_decorator_1 = require("../middlewares/decorators/permissions.decorator");
const rol_service_1 = require("./rol.service");
const rol_entity_1 = require("../entities/rol.entity");
let RolController = class RolController {
    constructor(service) {
        this.service = service;
    }
    async create(request) {
        return this.service.create(request.rol);
    }
    async addPermision(id, Permission) {
        return this.service.addPermision(id, Permission.id);
    }
    findAll() {
        return this.service.findAll();
    }
    findOne(id) {
        return this.service.findOne(id);
    }
    findPermissions(id) {
        return this.service.findPermissions(id);
    }
    update(id, rol) {
        return this.service.update(id, rol);
    }
    updatepartial(id, rol) {
        return this.service.updatePartion(id, rol);
    }
    delete(id) {
        return this.service.delete(id);
    }
};
exports.RolController = RolController;
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, permissions_decorator_1.Permissions)(['create_role']),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], RolController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_middleware_1.AuthGuard),
    (0, permissions_decorator_1.Permissions)(['assign_permission']),
    (0, common_1.Post)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RolController.prototype, "addPermision", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RolController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolController.prototype, "findPermissions", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, rol_entity_1.RolEntity]),
    __metadata("design:returntype", Promise)
], RolController.prototype, "update", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Promise)
], RolController.prototype, "updatepartial", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], RolController.prototype, "delete", null);
exports.RolController = RolController = __decorate([
    (0, common_1.Controller)('rol'),
    __metadata("design:paramtypes", [rol_service_1.RolService])
], RolController);
//# sourceMappingURL=rol.controller.js.map