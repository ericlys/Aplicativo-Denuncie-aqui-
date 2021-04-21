export default interface IFindAllInDayDTO {
  day: number;
  month: number;
  year: number;
  category_id?: string;
  page: number;
  totalPerPage: number;
}
