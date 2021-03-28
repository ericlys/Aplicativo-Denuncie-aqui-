import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  CategoryList,
  CategoryContainer,
  CategoryImage,
  CategoryInfo,
  CategoryTitle,
  CategoryListTitle,
  MyDenunciationsBurron,
} from './styles';
import api from '../../services/api';

export interface Category {
  id: string;
  title: string;
  icon_url: string;
}

const Dashbord: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const { user } = useAuth();
  const { navigate } = useNavigation();

  useEffect(() => {
    api.get('category').then((response) => {
      setCategories(response.data);
    });
  }, []);

  const navigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const navigateToListDenunciation = useCallback(() => {
    navigate('ListDenunciation');
  }, [navigate]);

  const navigateToCreateDenunciation = useCallback(
    (categoryId: string) => {
      navigate('CreateDenunciation', { categoryId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo, {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={navigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>

      <MyDenunciationsBurron onPress={navigateToListDenunciation}>
        <Icon name="list" size={24} color="#999591" />
      </MyDenunciationsBurron>

      <CategoryList
        data={categories}
        keyExtractor={(category) => category.id}
        ListHeaderComponent={<CategoryListTitle>Categorias</CategoryListTitle>}
        renderItem={({ item: category }) => (
          <CategoryContainer
            onPress={() => navigateToCreateDenunciation(category.id)}
          >
            <CategoryImage source={{ uri: category.icon_url }} />
            <CategoryInfo>
              <CategoryTitle>{category.title}</CategoryTitle>
            </CategoryInfo>
          </CategoryContainer>
        )}
      />
    </Container>
  );
};

export default Dashbord;
