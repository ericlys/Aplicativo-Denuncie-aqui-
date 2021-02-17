export default interface ICreateUserDTO{
  name: string;
  email: string;
  cpf_num: string;
  password: string;
  administrator: boolean;
}