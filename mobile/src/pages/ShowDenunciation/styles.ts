import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight(true) + 24}px;
  background: #ffff;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  color: #535353;
  font-family: 'RobotoSlab-Medium';
  font-size: 25px;
  margin-left: 16px;
  margin-right: auto;
`;

export const DenunciationContainer = styled.View`
  padding: 20px;
`;

export const DenunciationDescription = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #262626;
`;

export const DenunciationTitleText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #1a1a1a;
  margin-top: 20px;
  margin-bottom: 13px;
`;

export const MapContainer = styled.View`
  justify-content: center;
  width: 100%;
  height: 200px;
  border-radius: 10px;
  align-items: center;
  background-color: rgba(209, 58, 52, 0.863);
`;

export const DenunciationMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const DenunciationMetaDescription = styled.Text`
  font-family: 'RobotoSlab-Regular';
  font-size: 16px;
  color: #262626;
`;

export const DeleteDenunciationButton = styled(RectButton)`
  background: rgba(209, 58, 52, 0.863);
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
  align-items: center;
  width: 179px;
  height: 56px;
  margin: 29px;
`;

export const DeleteDenunciationButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 16px;
  color: #ffffff;
`;

export const DenunciationPhoto = styled.Image`
  width: 200px;
  height: 150px;
  border-radius: 2px;
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

export const DenunciationMetaDate = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const DenunciationMetaDateDescription = styled.Text`
  margin-left: 8px;
  color: #2b2b2b;
  font-family: 'RobotoSlab-Regular';
`;
