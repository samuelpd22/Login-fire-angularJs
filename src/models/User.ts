export interface User {
    id: any;
    name: string;
    email: string;
    password: string;

    //perfil
    fotoPerfil?:string;
    idade?:number;
    estadoCivil?:string;
    endereco?:string;
    logradouro?:string;
    numero?:string;
    estado?:string;
}