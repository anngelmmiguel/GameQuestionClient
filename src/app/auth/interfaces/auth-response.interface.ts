import { userdto } from "./userdto.interface";

export interface authenticationDTO
{
    token: string,
    expiration: string
    userDto : userdto;
}