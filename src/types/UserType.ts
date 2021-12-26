export interface IResponseUser extends IUserStepOne {
  id: number;
  description: string;
  email: string;
}

export interface IUserStepOne {
  name?: string;
  cpf?: string;
  phone?: string;
  birthDay?: string;
}

export interface IUserStepTwo {
  description: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface IUserFormProperties extends IUserStepOne, IUserStepTwo {}

export interface IUser {
  name: string;
  cpf: string;
  phone: string;
  birthDay: string;
  description: string;
  email: string;
}
