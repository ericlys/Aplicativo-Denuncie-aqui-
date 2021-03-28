import React, { useCallback, useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  Header,
  HeaderTitle,
  Container,
  BackButton,
  DenunciationList,
  DenunciationContainer,
  DenunciationInfo,
  DenunciationTitle,
  DenunciationMeta,
  DenunciationMetaDescription,
} from './styles';
import api from '../../services/api';

export interface Denunciation {
  id: string;
  title: string;
  description: string;
  hour: Date;
}

const ListDenunciation: React.FC = () => {
  const [denunciations, setDenunciations] = useState([]);
  const navigation = useNavigation();

  const { navigate } = useNavigation();

  const formattedDate = useCallback((time: Date) => {
    return format(time, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });
  }, []);

  useEffect(() => {
    api.get('denunciation/my').then((response) => {
      setDenunciations(response.data);
    });
  }, []);

  const hangleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const navigateToCreateDetails = useCallback(
    (denunciationId: string) => {
      navigate('ShowDenunciation', { denunciationId });
    },
    [navigate],
  );

  return (
    <Container>
      <Header>
        <BackButton onPress={hangleGoBack}>
          <Icon name="chevron-left" size={24} color="#181818" />
        </BackButton>

        <HeaderTitle>Minhas denúncias</HeaderTitle>
      </Header>

      <DenunciationList
        data={denunciations}
        keyExtractor={(category) => category.id}
        renderItem={({ item: denunciation }) => (
          <DenunciationContainer
            onPress={() => navigateToCreateDetails(denunciation.id)}
          >
            <DenunciationInfo>
              <DenunciationTitle>{denunciation.title}</DenunciationTitle>
              <DenunciationMeta>
                <Icon name="more-horizontal" size={14} color="#ff0000" />
                <DenunciationMetaDescription>
                  {denunciation.description}
                </DenunciationMetaDescription>
              </DenunciationMeta>
              <DenunciationMeta>
                <Icon name="calendar" size={14} color="#ff0000" />
                <DenunciationMetaDescription>
                  {formattedDate(new Date(denunciation.hour))}
                </DenunciationMetaDescription>
              </DenunciationMeta>
            </DenunciationInfo>
          </DenunciationContainer>
        )}
      />
    </Container>
  );
};

export default ListDenunciation;
