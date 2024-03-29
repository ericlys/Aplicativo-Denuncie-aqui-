import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrores: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background-color: #f1f1f1;
  border-radius: 10px;
  margin-bottom: 8px;
  border: 2px solid #f1f1f1;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isErrores &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #ff7e50;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
