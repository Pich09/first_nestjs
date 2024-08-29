import { Body, Controller, ParseIntPipe, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    login(@Body('email') email: string, @Body('password') password: string){
        return this.authService.login(email, password);
    };

    @Post('signup')
    signUp(@Body() dto: AuthDto){
        return this.authService.signUp(dto);
    };
}


/* @Post('signup')
    signUp(@Req() req: Request){
        return this.authService.signUp(req.body);
    }; */
