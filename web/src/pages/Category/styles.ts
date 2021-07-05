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

export const InputCategory = styled.input`
  width: 230px;
  padding: 10px 10px;
  border-radius: 10px;
  border-color: #999591;
  margin-top: 25px;
`;
export const IconCategory = styled.div`
  margin: 20px 32px 0 23px;
  position: relative;
  align-self: center;
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: #999591;
  font-size: 13px;

  img {
    position: absolute;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    bottom: 0;
    border: 0;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s;
    background: #fff;
  }

  label {
    position: absolute;
    width: 86px;
    height: 86px;
    border-radius: 50%;
    bottom: 0;
    border: 0;
    cursor: pointer;
    text-align: center;
    transition: background-color 0.2s;

    display: flex;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }
  }
`;

export const Button = styled.button`
  width: 200px;
  margin-top: 40px;
  padding: 10px 10px;
  border: none;
  border-radius: 10px 10px;
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

  h2 {
    color: #4a4a4a;
    margin-top: 69px;
    margin-bottom: 24px;
    font-size: 26px;
  }
`;

export const Categories = styled.div`
  display: flex;
  align-items: center;
  background: #f7f7f7;
  padding: 15px;
  border-radius: 10px;
  margin-bottom: 16px;
  flex-direction: row;

  img {
    width: 40px;
    height: 40px;
    border-radius: 36px;
  }

  strong {
    margin-left: 24px;
    font-size: 17px;
    color: #161516;
  }
`;

export const ButtonDelete = styled.button`
  width: 40px;
  padding: 10px 10px;
  border: none;
  border-radius: 10px 10px;
  font-size: 14px;
  background: #ff0000;
  color: #fff;
  font-weight: bold;
  margin-left: auto;

  */ &:hover {
    opacity: 0.8;
    background: #c22000;
  }
`;
