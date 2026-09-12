
export interface userdto {
    identificationNumber : number;
    name : string;
    email : string;
}


export class userCredentialsRegisterDto {
    identificationNumber: number = 0;
    password: string = "";
    name: string = "";
    email: string = "";
    idAcademicProgram: number = 0;
}