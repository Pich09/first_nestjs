import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    /* Login to An Account */
    async login(email: string, password: string){
        const user = await this.prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return {
                code: 401,
                status: 'Not Found',
                message: 'User not found',
                result: null
            }
        }
        const pwMatch = await argon.verify(user.hashedPassword, password);
        if (!pwMatch) {
            return {
                code: 401,
                status: 'Unauthorized',
                message: 'Incorrect password',
                result: null
            }
        }

        return {
            code: 200,
            status: 'success',
            message: 'Login successful',
            result: null
        }
    };

    /* Signup New User */
    async signUp(authDto: AuthDto){
        const hash = await argon.hash(authDto.password);
        try {
            const user = await this.prisma.user.create({
                data: {
                    email: authDto.email,
                    hashedPassword: hash,
                    username: authDto.username ?? ""
                }
            })
    
            delete user.hashedPassword;
    
            return {
                code: 200,
                status: 'success',
                message: 'Signup successful',
                result: user
            }
        } catch (error) {
            return {
                code: 403,
                status: 'Forbidden',
                message: "User already exists",
                result: null
            }
        }
    };
}
