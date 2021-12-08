import { Injectable } from "@nestjs/common";
import { IsEmail, IsString } from "class-validator";

@Injectable()
export class CreateUserDTO {
    @IsEmail()
    email: string;

    @IsString()
    password: string;
}