import { RectButton } from 'react-native-gesture-handler';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #e4e4e4;

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

export const Title = styled.Text`
  color: #2c2c2c;
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  margin-left: 16px;
  margin-right: auto;
  padding: 12px;
`;

export const DenunciationContainer = styled.View`
  flex: 1;
  padding: 12px 15px 12px;
  margin-bottom: 30px;
`;

export const FrontContainer = styled.View`
  flex: 1;
  flex-direction: row;
  width: 50%;
`;

export const CreateDenunciationButton = styled(RectButton)`
  height: 50px;
  background: #224429;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  margin: 0 24px 24px;
`;

export const CreateDenunciationButtonText = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #ffff;
`;
