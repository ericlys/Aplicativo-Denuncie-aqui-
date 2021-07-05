import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RectButton } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import { Category } from './index';

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

export const HeaderTitle = styled.Text`
  color: #000000;
  font-size: 20px;
  font-family: 'RobotoSlab-Regular';
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #ff0000;
  font-family: 'RobotoSlab-Medium';
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
  background-color: #ff0202;
`;
export const CategoryList = styled(FlatList as new () => FlatList<Category>)`
  padding: 32px 24px 16px;
`;

export const CategoryListTitle = styled.Text`
  font-size: 24px;
  margin-bottom: 24px;
  color: #161516;
  font-family: 'RobotoSlab-Medium';
`;

export const CategoryContainer = styled(RectButton)`
  background: #f7f7f7;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 16px;
  flex-direction: row;
  align-items: center;
`;

export const MyDenunciationsBurron = styled(RectButton)`
  width: 60px;
  padding: 15px;
  flex-direction: row;
  align-items: center;
`;

export const CategoryImage = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 36px;
  background-color: #ff0202;
`;

export const CategoryInfo = styled.View`
  flex: 1;
  margin-left: 20px;
`;

export const CategoryTitle = styled.Text`
  font-family: 'RobotoSlab-Medium';
  font-size: 20px;
  color: #333435;
`;
