import { ROLE_UCP } from './../contants/role.enum';
import { UserEntity } from 'src/users/entities/user.entity';
import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateUserCpDto {
    @IsNotEmpty()
    idCompany : string ;

    @IsNotEmpty()
    user : UserEntity ;
    
    @IsOptional()
    role? : ROLE_UCP ;
}
