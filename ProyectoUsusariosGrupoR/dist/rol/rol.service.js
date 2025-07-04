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
exports.RolService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const rol_entity_1 = require("../entities/rol.entity");
const permission_service_1 = require("../permission/permission.service");
const typeorm_2 = require("typeorm");
let RolService = class RolService {
    constructor(RolRepo, PermissionService) {
        this.RolRepo = RolRepo;
        this.PermissionService = PermissionService;
    }
    async create(Rol) {
        const newRol = this.RolRepo.create(Rol);
        return await this.RolRepo.save(newRol);
    }
    findAll() {
        return this.RolRepo.find();
    }
    findOne(id) {
        return this.RolRepo.findOneBy({ id });
    }
    async update(id, rol) {
        await this.RolRepo.update(id, rol);
        return this.RolRepo.findOneBy({ id });
    }
    async findPermissions(id) {
        var Service = await this.PermissionService.filterService(id);
        return Service;
    }
    async addPermision(id, idPermission) {
        const permission = await this.PermissionService.findOne(idPermission);
        const rol = await this.RolRepo.findOne({ where: { id }, relations: ['permission'], });
        const result = rol.permission.some((permission) => permission.id === (idPermission));
        if (!permission) {
            throw new common_1.NotFoundException(`permission not exist with the id: ${idPermission}`);
        }
        else if (!rol) {
            throw new common_1.NotFoundException(`rol not exist with the id: ${id}`);
        }
        else if (result) {
            throw new common_1.NotFoundException(`este rol ya esta asignado`);
        }
        rol.permission.push(permission);
        return await this.RolRepo.save(rol);
    }
    async updatePartion(id, rol) {
        await this.RolRepo.update(id, rol);
        return this.RolRepo.findOneByOrFail({ id });
    }
    async delete(id) {
        const rol = await this.RolRepo.findOneBy({ id });
        if (!rol) {
            throw new common_1.NotFoundException(`permission not exist with the id: ${id}`);
        }
        await this.RolRepo.delete(rol.id);
    }
};
exports.RolService = RolService;
exports.RolService = RolService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(rol_entity_1.RolEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        permission_service_1.PermissionService])
], RolService);
//# sourceMappingURL=rol.service.js.map