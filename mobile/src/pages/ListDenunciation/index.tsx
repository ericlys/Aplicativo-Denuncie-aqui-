import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

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
} from './styles';
import api from '../../services/api';

export interface ListDenunciation {
  id: string;
  title: string;
  icon_url: string;
}

const ListDenunciation: React.FC = () => {
  const [categories, setCategories] = useState([]);

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

export default ListDenunciation;
