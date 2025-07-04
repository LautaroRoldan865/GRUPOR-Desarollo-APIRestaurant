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
exports.PermissionService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const permision_entity_1 = require("../entities/permision.entity");
const typeorm_2 = require("typeorm");
const common_2 = require("@nestjs/common");
let PermissionService = class PermissionService {
    constructor(PersmissionRepo) {
        this.PersmissionRepo = PersmissionRepo;
    }
    async createPermission(permission) {
        const newPermission = this.PersmissionRepo.create(permission);
        return await this.PersmissionRepo.save(newPermission);
    }
    async findAll() {
        return await this.PersmissionRepo.find();
    }
    async findOne(id) {
        return await this.PersmissionRepo.findOneBy({ id });
    }
    async update(id, permission) {
        await this.PersmissionRepo.update(id, permission);
        return this.PersmissionRepo.findOneByOrFail({ id });
    }
    async filterService(id) {
        let permission = await this.PersmissionRepo.find();
        function permissionFilter(rol) {
            return permission.filter((permission) => permission.rol.every((Role) => Role.id === rol));
        }
        return permissionFilter(id);
    }
    async updatePartion(id, permission) {
        await this.PersmissionRepo.update(id, permission);
        return this.PersmissionRepo.findOneByOrFail({ id });
    }
    async delete(id) {
        const permission = await this.PersmissionRepo.findOneBy({ id });
        if (!permission) {
            throw new common_2.NotFoundException(`permission not exist with the id: ${id}`);
        }
        await this.PersmissionRepo.delete(permission.id);
    }
};
exports.PermissionService = PermissionService;
exports.PermissionService = PermissionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(permision_entity_1.PermissionEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PermissionService);
//# sourceMappingURL=permission.service.js.map