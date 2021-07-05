import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: black;
  font-family: 'RobotoSlab-Medium';
  margin: 60px 0 24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;

export const ForgotPasswordText = styled.Text`
  color: #000;
  font-size: 16px;
  font-family: 'RobotoSlab-Regular';
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 32px;
  display: flex;
  padding: 0 23px;
  flex-direction: row;
  justify-content: space-between;
`;
