
export interface Usuario_bd {
  username: string;
  password: string;
  rol?:string;
  token?: string;
  id?: number;
}

// de bd
export interface Response_login {
  success: boolean;
  message: string;
  token:string;
}

//informacion del token
export interface Token{
  userId:string,
  username:string,
  roles: string,
}