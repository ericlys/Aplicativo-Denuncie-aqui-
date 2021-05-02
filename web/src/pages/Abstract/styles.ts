import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 54px auto;
  display: flex;
`;

export const SectionOne = styled.div`
  flex: 1;
  margin-right: 120px;
`;

export const MappContainer = styled.div`
  width: 700px;
  height: 400px;
`;

export const Section = styled.section`
  margin-top: 48px;
`;

export const SectionTwo = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;

  h2 {
    color: #4a4a4a;
    margin-top: 69px;
    margin-bottom: 24px;
    font-size: 26px;
  }
`;

export const Calendar = styled.aside`
  .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside) {
    background-color: #fff0f0 !important;
    color: #e25c4a;
  }
  .DayPicker-Day {
    border-radius: 0 !important;
  }
  .DayPicker-Day--start {
    border-top-left-radius: 50% !important;
    border-bottom-left-radius: 50% !important;
    background: #d42424 !important;
  }
  .DayPicker-Day--end {
    border-top-right-radius: 50% !important;
    border-bottom-right-radius: 50% !important;
    background: #d42424 !important;
  }
`;
