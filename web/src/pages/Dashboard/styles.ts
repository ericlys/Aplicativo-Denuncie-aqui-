import { shade } from 'polished';
import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 54px auto;
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

export const Inf = styled.div`
  margin-top: 2px;

  span {
    margin-left: 5px;
    color: #4a4a4a;
    font-size: 12px;
    padding: 3px 5px;
    border-radius: 15px;
  }

  .pendente {
    background: #f7f7f7;
  }
  .constatando {
    background: #ffddb0;
  }
  .falsa {
    background: #ffb0b0;
  }
  .verificado {
    background: #b0ffc4;
  }
`;

export const Section = styled.section`
  margin-top: 28px;
`;

export const Denunciations = styled.div`
  .pendente {
    background: #f7f7f7;
  }
  .constatando {
    background: #ffddb0;
  }
  .falsa {
    background: #ffb0b0;
  }
  .verificado {
    background: #b0ffc4;
  }

  a {
    margin-top: 2px;
    text-decoration: none;
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
