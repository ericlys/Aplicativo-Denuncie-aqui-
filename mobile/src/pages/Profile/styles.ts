import styled from 'styled-components/native';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 20 : 40}px;
  position: relative;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: black;
  font-family: 'RobotoSlab-Medium';
  margin: 24px 0;
`;

export const BackButton = styled.TouchableOpacity`
  margin-top: 32px;
`;

export const QuitButton = styled.TouchableOpacity`
  display: flex;
  padding: 0 23px;
  flex-direction: row-reverse;
  justify-content: space-between;
`;

export const UserAvatarButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  background-color: #aaabad;
  width: 186px;
  height: 186px;
  border-radius: 98px;

  align-self: center;
`;

export const ModalContainer = styled.View`
  background-color: #000000aa;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ModalContainerMeta = styled.View`
  background-color: #ffffff;
  margin: 50px;
  padding: 35px;
  align-items: center;
  border-radius: 10px;
`;

export const ModalText = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #262626;
`;

export const ModalButtonCancel = styled.TouchableOpacity`
  background: rgba(209, 58, 52, 0.863);
  border-radius: 10px;
  padding: 16px;
  align-items: center;
  width: 179px;
  height: 56px;
`;

export const ModalButtonConfirm = styled.TouchableOpacity`
  width: 179px;
  height: 56px;
  background: transparent;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 10px 0 24px;
  padding: 2%;
  border: 1px;
`;

export const ModalButtonTextCancel = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #ffffff;
`;

export const ModalButtonTextConfirm = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #3d3f40;
`;
