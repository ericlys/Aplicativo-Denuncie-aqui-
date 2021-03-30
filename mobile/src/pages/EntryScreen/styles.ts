import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

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

export const CreateAccountButton = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #ffffff;
  border-top-width: 1px;
  border-color: #e5e5e5;
  padding: 16px 0 ${16 + getBottomSpace()}px;

  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const CreateAccountButtonText = styled.Text`
  color: #bb1818;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

export const EntryButtonAccount = styled(RectButton)`
  background-color: #bb1818;
  padding: 16px 12px 16px;
  border-radius: 16px;
  margin-bottom: 12px;
  width: 229px;
  height: 55px;

  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const EntryButtonAnonymously = styled(RectButton)`
  background-color: #757573;
  padding: 16px 12px 16px;
  border-radius: 16px;
  width: 229px;
  height: 55px;

  display: flex;
  justify-content: center;
  flex-direction: row;
`;

export const EntryButtonAccountText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;

export const EntryButtonAnonymouslyText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
