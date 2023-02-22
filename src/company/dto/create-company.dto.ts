import { Expose } from "class-transformer";
import { IsEmail, IsNotEmpty, Length } from "class-validator";

export class CreateCompanyDto {
    @IsNotEmpty()
    @IsEmail()
    @Expose()
    email : string ;

    @IsNotEmpty()
    @Length(2 ,)
    @Expose()
    name : string ;

    @IsNotEmpty()
    @Length(2 ,)
    @Expose()
    address : string ;

    @IsNotEmpty()
    @Length(2 ,)
    @Expose()
    business_segment : string ;


    @Expose()
    @Length(2 ,)
    slogan : string ;

    @Expose()
    historyCreate?  : string ;

}