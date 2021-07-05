import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import MapView, { Marker } from 'react-native-maps';

import { useNavigation, useRoute } from '@react-navigation/native';
import { ActivityIndicator, Alert, Modal, ScrollView } from 'react-native';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  Header,
  HeaderTitle,
  Container,
  BackButton,
  DenunciationContainer,
  DenunciationDescription,
  DenunciationTitleText,
  MapContainer,
  DenunciationMeta,
  DenunciationMetaDescription,
  DeleteDenunciationButton,
  DeleteDenunciationButtonText,
  DenunciationPhoto,
  ModalContainer,
  ModalText,
  ModalButtonCancel,
  ModalButtonConfirm,
  ModalButtonTextCancel,
  ModalButtonTextConfirm,
  ModalContainerMeta,
  DenunciationMetaDate,
  DenunciationMetaDateDescription,
} from './styles';
import api from '../../services/api';

interface RouteParams {
  denunciationId: string;
}

interface Idenunciation {
  id: string | undefined;
  anonymous: false;
  title: string | undefined;
  description: string | undefined;
  status: string | undefined;
  photo: string | undefined;
  hour: Date;
  address: {
    id: string | undefined;
    address: string | undefined;
    street: string | undefined;
    city: string | undefined;
    zipcode: string | undefined;
    number: string | undefined;
    complement: string | undefined;
    latitude: string;
    longitude: string;
  };
  category: {
    title: string | undefined;
  };
  photo_url: string | undefined;
}

const ShowDenunciation: React.FC = () => {
  const { reset } = useNavigation();
  const [modal, setModal] = useState(false);
  const [denunciation, setDenunciation] = useState<Idenunciation>();
  const route = useRoute();
  const navigation = useNavigation();

  const { denunciationId } = route.params as RouteParams;

  useEffect(() => {
    api.get(`denunciation/${denunciationId}`).then((response) => {
      setDenunciation(response.data);
    });
  }, [denunciationId]);

  const formattedDate = useCallback((time: Date) => {
    return format(time, "EEEE', dia' dd 'de' MMMM 'de' yyyy 'às' HH:mm'h'", {
      locale: ptBR,
    });
  }, []);

  const hangleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const hangleDeleteDenunciation = useCallback(() => {
    api.delete(`denunciation/${denunciationId}`);
    Alert.alert('Denúncia excluída', 'Sua denúncia foi cancelada.');
    setModal(!modal);
    reset({
      routes: [{ name: 'Dashboard' }],
      index: 0,
    });
  }, [denunciationId, modal, reset]);

  return (
    <Container>
      <Modal
        animationType="slide"
        transparent
        visible={modal}
        onRequestClose={() => {
          setModal(!modal);
        }}
      >
        <ModalContainer>
          <ModalContainerMeta>
            <ModalText>Deseja realmente excluir essa denúncia?</ModalText>

            <ModalButtonConfirm onPress={hangleDeleteDenunciation}>
              <ModalButtonTextConfirm>Confirmar</ModalButtonTextConfirm>
            </ModalButtonConfirm>

            <ModalButtonCancel
              onPress={() => {
                setModal(!modal);
              }}
            >
              <ModalButtonTextCancel>Cancelar</ModalButtonTextCancel>
            </ModalButtonCancel>
          </ModalContainerMeta>
        </ModalContainer>
      </Modal>

      <Header>
        <BackButton onPress={hangleGoBack}>
          <Icon name="chevron-left" size={24} color="#181818" />
        </BackButton>

        <HeaderTitle>{denunciation?.title}</HeaderTitle>
      </Header>

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <DenunciationContainer>
          {denunciation?.hour ? (
            <DenunciationMetaDate>
              <Icon name="calendar" size={14} color="#ff0000" />
              <DenunciationMetaDateDescription>
                {formattedDate(new Date(denunciation?.hour))}
              </DenunciationMetaDateDescription>
            </DenunciationMetaDate>
          ) : (
            <></>
          )}

          <DenunciationDescription>
            {denunciation?.description}
          </DenunciationDescription>
          <DenunciationTitleText>Endereço:</DenunciationTitleText>
          <MapContainer>
            {!denunciation ? (
              <ActivityIndicator size="large" color="#ffffff" />
            ) : (
              <MapView
                style={{
                  zIndex: 1,
                  width: '100%',
                  height: '100%',
                }}
                initialRegion={{
                  latitude: +denunciation?.address.latitude,
                  longitude: +denunciation?.address.longitude,
                  latitudeDelta: 0.0068,
                  longitudeDelta: 0.0068,
                }}
                loadingEnabled
                scrollEnabled={false}
                zoomEnabled={false}
              >
                <Marker
                  coordinate={{
                    latitude: +denunciation?.address.latitude,
                    longitude: +denunciation?.address.longitude,
                  }}
                  icon={{
                    uri:
                      'https://img.icons8.com/color/96/000000/coronavirus--v2.png',
                  }}
                />
              </MapView>
            )}
          </MapContainer>
          <DenunciationMeta>
            <Icon name="map-pin" size={14} color="#ff0000" />
            <DenunciationMetaDescription>
              {denunciation?.address.address}, {denunciation?.address.number} /{' '}
              {denunciation?.address.street} -{' '}
              {denunciation?.address.complement}
            </DenunciationMetaDescription>
          </DenunciationMeta>
          <DenunciationMeta>
            <Icon name="map" size={14} color="#ff0000" />
            <DenunciationMetaDescription>
              {denunciation?.address.city} - {denunciation?.address.zipcode}
            </DenunciationMetaDescription>
          </DenunciationMeta>
        </DenunciationContainer>
        {denunciation?.photo_url ? (
          <DenunciationPhoto source={{ uri: denunciation?.photo_url }} />
        ) : (
          <></>
        )}
        <DeleteDenunciationButton
          onPress={() => {
            setModal(!modal);
          }}
        >
          <DeleteDenunciationButtonText>
            Cancelar denúncia
          </DeleteDenunciationButtonText>
        </DeleteDenunciationButton>
      </ScrollView>
    </Container>
  );
};

export default ShowDenunciation;
