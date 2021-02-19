import React, { Provider, useCallback, useEffect, useState } from 'react';
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

const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Aglomeração',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Categoria2',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    title: 'Categoria3',
  },
];

const Dashbord: React.FC = () => {
  // const [categories, setCategories] = useState<Category[]>([]);

  const { signOut, user } = useAuth();
  const { navigate } = useNavigation();

  // useEffect(() => {
  //   api.get('categories').then((response) => {
  //     setCategories(response.data);
  //   });
  // }, []);

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
        data={DATA}
        keyExtractor={(data) => DATA.id}
        ListHeaderComponent={<CategoryListTitle>Categorias</CategoryListTitle>}
        renderItem={({ item: data }) => (
          <CategoryContainer
            onPress={() => navigateToCreateDenunciation(data.id)}
          >
            <CategoryImage source={{ uri: '' }} />
            <CategoryInfo>
              <CategoryTitle>{data.title}</CategoryTitle>
            </CategoryInfo>
          </CategoryContainer>
        )}
      />
    </Container>
  );
};

export default Dashbord;
