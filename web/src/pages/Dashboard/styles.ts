import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background-color: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #999591;
    width: 20px;
    height: 20px;
  }
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  margin-left: 80px;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;
  }

  span {
    color: #f4ede8;
  }

  a {
    text-decoration: none;
    color: #ff0000;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
`;

export const Complaints = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  > p {
    margin-top: 8px;
    color: #c22000;
    display: flex;
    align-items: center;
    font-weight: 500;

    border-bottom: 1px solid #3e3b47;
    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';
      width: 1px;
      height: 12px;
      background: #c22000;
      margin: 0 8px;
    }
  }
`;

export const Status = styled.div`
  margin-top: 10px;

  span {
    font-size: 12px;
    margin-left: 12px;
    padding: 3px 10px;
    border-radius: 10px;
    color: #636363;
    font-weight: 500;
  }

  .constatando {
    background: #ffd294;
  }

  .falsa {
    background: #ff9494;
  }

  .pendente {
    background: #e0e0e0;
  }

  .verificado {
    background: #98ff94;
  }
`;

export const Section = styled.section`
  margin-top: 48px;
`;

export const Denunciations = styled.div`
  & + div {
    margin-top: 2px;
  }
  div {
    background: #f7f7f7;
    display: flex;
    align-items: center;
    padding: 6px 20px;
    border-radius: 10px;
    cursor: pointer;

    &:hover {
      opacity: 0.8;
    }
  }

  h4 {
    color: #4a4a4a;
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 420px;
    display: block;
  }

  main {
    flex: 1;
    margin-left: auto;
  }
  strong {
    color: #4d5156;
    font-size: 13px;
    font-weight: 40;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 450px;
    display: block;
  }

  .constatando {
    background: #ffd294;
  }

  .falsa {
    background: #ff9494;
  }

  .pendente {
    background: #e0e0e0;
  }

  .verificado {
    background: #98ff94;
  }

  span {
    margin-left: auto;
    display: flex;
    align-items: center;
    color: #4d5156;

    svg {
      color: #ff5454;
      margin-right: 8px;
    }
  }
`;

export const Paginate = styled.aside`
  margin-top: 25px;
`;

export const Filter = styled.div``;

export const Calendar = styled.aside`
  width: 380px;
  color: #fff;

  .DayPicker {
    background: #28262e;
    border-radius: 10px;
  }
  .DayPicker-wrapper {
    padding-bottom: 0;
  }
  .DayPicker,
  .DayPicker-Month {
    width: 100%;
  }
  .DayPicker-Month {
    border-collapse: separate;
    border-spacing: 8px;
    margin: 16px;
  }
  .DayPicker-Day {
    width: 40px;
    height: 40px;
  }
  .DayPicker-Day--available:not(.DayPicker-Day--outside) {
    background: #3e3b47;
    border-radius: 10px;
  }
  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background: ${shade(0.2, '#3e3b47')};
  }
  .DayPicker-Day--today {
    font-weight: normal;
  }
  .DayPicker-Day--disabled {
    color: #666360 !important;
    background: transparent !important;
  }
  .DayPicker-Day--selected {
    background: #d42424 !important;
    border-radius: 10px;
    color: #232129 !important;
  }
`;

export const Categories = styled.section`
  > h2 {
    margin-top: 32px;
    margin-bottom: 12px;
    font-weight: 400;
    color: #666360;
    font-size: 18px;
    border-top: 1px solid #dedede;
  }
`;

export const Category = styled.label`
  font-weight: 400;
  margin-top: 32px;
  color: #666360;
  font-size: 14px;

  & + div {
    margin-top: 2px;
  }

  div {
    display: flex;
    align-items: center;

    input {
      cursor: pointer;
    }
    span {
      margin-left: 10px;
    }
  }
`;
