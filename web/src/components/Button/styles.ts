import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #ff1a1a;
  height: 56px;
  border-radius: 10px;
  border: 0;
  padding: 0 16px;
  color: #fff;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;

  &:hover {
    background: ${shade(0.2, '#ff1a1a')};
  }
`;
