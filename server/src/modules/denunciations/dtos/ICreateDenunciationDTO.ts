export default interface ICreateDenunciationDTO {
  anonymous: boolean;
  title: string;
  description: string;
  photo: string | null;
  status: string;
  hour: Date;
  user_id: string;
}
