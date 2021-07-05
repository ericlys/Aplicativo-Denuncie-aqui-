import styled from 'styled-components';
import Button from '@material-ui/core/Button';

export const HeaderContainer = styled.header`
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
    background: #666360;
    border: 0;

    :hover {
      background: red;
    }
  }
`;

export const ButtonMenu = styled(Button)`
  span {
    font-weight: 500;
    color: #fff;
    font-family: 'Roboto Slab', serif;
    font-size: 13px;
  }
`;

export const StyledMenu = styled.div`
  /* svg {
    color: #999591;
    width: 20px;
    height: 20px;
  } */
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
