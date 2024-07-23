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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGaurd = void 0;
const jwt_1 = require("@nestjs/jwt");
const common_1 = require("@nestjs/common");
let AuthGaurd = class AuthGaurd {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        if (!token) {
            throw new common_1.ForbiddenException('Token not provided');
        }
        try {
            const tokenPayload = await this.jwtService.verifyAsync(token);
            request.user = {
                _id: tokenPayload.userId,
                email: tokenPayload.email,
            };
            return true;
        }
        catch (error) {
            throw new common_1.ForbiddenException('Invalid token');
        }
    }
};
exports.AuthGaurd = AuthGaurd;
exports.AuthGaurd = AuthGaurd = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthGaurd);
//# sourceMappingURL=auth.gaurd.js.map