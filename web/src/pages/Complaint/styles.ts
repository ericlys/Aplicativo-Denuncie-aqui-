import styled from 'styled-components';

export const Container = styled.div``;

export const Content = styled.main`
  max-width: 1120px;
  margin: 54px auto;
  display: flex;
`;

export const Denunciation = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  > p {
    text-align: justify;
    margin-top: 8px;
    color: #4a4a4a;
    display: flex;
    align-items: center;
    font-weight: 500;

    span {
      text-align: justify;
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

export const Section = styled.section`
  margin-top: 48px;
`;

export const Anddress = styled.div`
  flex: 1;
  align-items: center;

  h2 {
    font-size: 22px;
    margin-bottom: 13px;
  }

  span {
    margin-left: 8px;
    color: #2b2b2b;
  }

  p {
    text-align: justify;
    font-size: 14px;
    margin-top: 8px;
    color: #4a4a4a;
    display: flex;
    align-items: center;
    font-weight: 400;
  }
`;

export const Status = styled.div`
  margin: 50px 0;
  flex: 1;
  align-items: center;

  select {
    margin-top: 20px;
    padding: 10px 10px;
    border: none;
    border-radius: 10px 0px 0px 10px;
    font-size: 14px;
    cursor: pointer;
    font-weight: bold;

    option {
      font-weight: bold;
    }
  }
`;

export const Button = styled.button`
  margin-top: 20px;
  padding: 10px 10px;
  border: none;
  border-radius: 0px 10px 10px 0px;
  font-size: 14px;
  background: #ff0000;
  color: #fff;
  font-weight: bold;

  &:hover {
    opacity: 0.8;
    background: #c22000;
  }
`;

export const SectionTwo = styled.div`
  width: 100%;
  height: 100%;
  flex: 1;
  align-items: center;
`;

export const MappContainer = styled.div`
  width: 700px;
  height: 400px;
`;

export const Image = styled.div`
  display: flex;
  margin-left: 80px;

  img {
    margin: 20px -80px;
    width: 300px;
    height: 200px;
    cursor: pointer;
    border-radius: 7px;
  }
`;
