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

export const ModalContainer = styled.View`
  background-color: #000000aa;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainerMeta = styled.View`
  background-color: #ffffff;
  margin: 20px;
  padding: 15px;
  align-items: center;
  border-radius: 20px;
  align-items: center;
  width: 330px;
`;

export const ModalButtonCancel = styled.TouchableOpacity`
  border-radius: 20px;
  padding: 16px;
  position: absolute;
  right: 50%;
  margin-right: -150px;
`;

export const ModalText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  margin-top: 40px;
  color: #262626;
`;

export const ModalInputText = styled.TextInput`
  font-family: 'RobotoSlab-Medium';
  color: #262626;
  background-color: #e3e3e3;
  padding: 9px;
  height: 45px;
  width: 220px;
  border: 1px;
  border-radius: 20px;
  text-align: center;
  margin-top: 12px;
`;

export const ModalButtonConfirm = styled.TouchableOpacity`
  width: 229px;
  height: 46px;
  background: transparent;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 40px 0 24px;
  padding: 2%;
  background-color: #bb1818;
`;

export const ModalButtonTextConfirm = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #ffffff;
`;

export const ModalErrText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 10px;
  color: #bb1818;
`;
