import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 54px auto;
  display: flex;
`;

export const NewCategory = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  h2 {
    color: #4a4a4a;
    margin-top: 23px;
    font-size: 26px;
  }
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
