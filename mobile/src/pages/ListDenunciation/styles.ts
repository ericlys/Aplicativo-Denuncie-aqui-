import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { Denunciation } from './index';

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

export const DenunciationList = styled(
  FlatList as new () => FlatList<Denunciation>,
)`
  padding: 32px 24px 16px;
`;

export const DenunciationContainer = styled(RectButton)`
  background: #f7f7f7;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const DenunciationInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const DenunciationTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 18px;
  color: #333435;
`;

export const DenunciationMeta = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const DenunciationMetaDescription = styled.Text`
  margin-left: 8px;
  color: #2b2b2b;
  font-family: 'RobotoSlab-Regular';
`;
