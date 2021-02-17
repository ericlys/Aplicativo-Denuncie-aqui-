export default interface ICreateAddressDTO{
  address: string,
  street: string,
  city: string,
  zipcode: string,
  number: string,
  complement: string | null,
  latitude: number,
  longitude: number,
  denunciation: string,
}