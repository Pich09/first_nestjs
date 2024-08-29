import { IsEmail, IsNotEmpty, IsString } from "class-validator";

/* We can make the fields validation like this using class-validator and class-something I forgot */
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsString()
    username?: string;
}