"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = __importStar(require("bcrypt"));
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    prisma;
    jwtToken;
    constructor(prisma, jwtToken) {
        this.prisma = prisma;
        this.jwtToken = jwtToken;
    }
    async register(registerDto) {
        const { email, password, name, surname, roleId } = registerDto;
        if (!email || !password || !name || !surname || !roleId) {
            throw new common_1.BadRequestException('All fields (email, password, name, surname, roleId) are necessary for registration');
        }
        const userExist = await this.prisma.user.findFirst({
            where: { email }
        });
        if (userExist) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const roleExist = await this.prisma.role.findUnique({
            where: { id: roleId }
        });
        if (!roleExist) {
            throw new common_1.BadRequestException(`Role with ID ${roleId} does not exist`);
        }
        const hashed_password = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                email,
                password: hashed_password,
                name,
                surname,
                role: {
                    connect: { id: roleId }
                }
            },
            select: {
                id: true,
                email: true,
                name: true,
                surname: true,
                role: {
                    select: {
                        id: true,
                        name: true,
                    }
                }
            }
        });
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        if (!email || !password) {
            throw new common_1.BadRequestException('Email and password are necessary');
        }
        const userExist = await this.prisma.user.findUnique({
            where: { email }
        });
        if (!userExist) {
            throw new common_1.UnauthorizedException('User does not exist');
        }
        const isPasswordValid = await bcrypt.compare(password, userExist.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Wrong password');
        }
        const payload = { sub: userExist.id, email: userExist.email, roleId: userExist.roleId };
        return {
            access_token: await this.jwtToken.signAsync(payload)
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map