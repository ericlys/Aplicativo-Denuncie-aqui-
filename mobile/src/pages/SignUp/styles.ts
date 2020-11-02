import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 20 : 40}px;
`;

export const Title = styled.Text`
  font-size: 24px;
  color: black;
  font-family: 'RobotoSlab-Medium';
  margin: 60px 0 24px;
`;

export const BackToSignIn = styled.TouchableOpacity`
  position: relative;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  border-top-width: 1px;
  border-color: #e5e5e5;
  padding: 16px 0;

  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const BackToSignInText = styled.Text`
  color: #000000;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
