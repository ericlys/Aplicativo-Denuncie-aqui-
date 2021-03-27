import React, { useCallback, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Form } from '@unform/mobile';
import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  TextInput,
} from 'react-native';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import * as ImagePicker from 'react-native-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';

import MapView, { Marker } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import { GOOGLE_MAPS_SECRET } from '@env';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  Title,
  DenunciationContainer,
  FrontContainer,
  CreateDenunciationButton,
  CreateDenunciationButtonText,
  PhotoButton,
  CreatePhotoButtonText,
  PhotoDenunciation,
  MapContainer,
  Time,
  TitleTime,
  OpenTimePikerButton,
  OpenTimePikerButtonText,
} from './styles';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import getValidationErrors from '../../utils/getValidationErros';

import api from '../../services/api';

import viacep from '../../services/viacep';

interface User {
  id: string;
}

interface RouteParams {
  categoryId: string;
}

interface DenunciationFormData {
  anonymous: boolean;
  title: string;
  description: string;
  photo: string;
  status: string;
  user: User;
  addres: string;
  city: string;
  complement: string;
  number: number;
  street: string;
  zipcode: string;
  hour: Date;
}

interface IViacep {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

interface Imap {
  latitude: number;
  longitude: number;
}

interface IPhoto {
  filename: string | undefined;
  uri: string | undefined;
}

const CreateDenunciation: React.FC = () => {
  Geocoder.init(GOOGLE_MAPS_SECRET, { language: 'pt' });
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const route = useRoute();
  const { goBack, navigate } = useNavigation();

  const [showTimePicker, setShowTimePiker] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [zipcode, setZipcode] = useState<string>();
  const [photo, setPhoto] = useState<IPhoto>();
  const [loading, setLoading] = useState(true);
  const [coordinates, setCoordinates] = useState<Imap>({
    latitude: 0,
    longitude: 0,
  });

  const { categoryId } = route.params as RouteParams;

  const navigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  const descriptionInputRef = useRef<TextInput>(null);
  const addressInputRef = useRef<TextInput>(null);
  const streetInputRef = useRef<TextInput>(null);
  const cityInputRef = useRef<TextInput>(null);
  const zipCodeInputRef = useRef<TextInput>(null);
  const numberInputRef = useRef<TextInput>(null);
  const complementInputRef = useRef<TextInput>(null);

  const handleLahLongByCep = useCallback(async () => {
    Geocoder.from(`${zipcode}`).then((json) => {
      const {
        location: { lat, lng },
      } = json.results[0].geometry;
      setCoordinates({ latitude: lat, longitude: lng });
      setLoading(false);
    });
  }, [zipcode]);

  const handleCepByLahLong = useCallback(async (coordinate) => {
    Geocoder.from(coordinate).then((json) => {
      const addressComponent = json.results[0].formatted_address;
      const code = addressComponent.substr(addressComponent.length - 17, 9);
      if (
        code.slice(5, 6) === '-' &&
        code.slice(6, 8).match('[0-9]+') != null
      ) {
        setZipcode(code);
        setCoordinates(coordinate);
        formRef.current?.setData({
          zipCode: code,
        });
        return;
      }
      setCoordinates(coordinate);
    });
  }, []);

  const updateForm = useCallback((addres: IViacep) => {
    formRef.current?.setData({
      zipCode: addres?.cep,
      addres: addres?.logradouro,
      street: addres?.bairro,
      city: addres?.localidade,
      Complement: addres?.complemento,
    });
  }, []);

  const onBlurCep = useCallback(async () => {
    setLoading(true);
    viacep.get(`${zipcode}/json`).then((response) => {
      updateForm(response.data);
    });
    handleLahLongByCep();
  }, [zipcode, handleLahLongByCep, updateForm]);

  const handleToggleTimePiker = useCallback(() => {
    setShowTimePiker((state) => !state);
  }, []);

  const handleTimeChanged = useCallback(
    (event: unknown, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowTimePiker(false);
      }
      if (date) {
        setSelectedTime(date);
      }
    },
    [],
  );

  const handleCreateDenunciation = useCallback(
    async (data: DenunciationFormData) => {
      try {
        const fdata = new FormData();
        const schema = Yup.object().shape({
          title: Yup.string().required('Título obrigatório'),
          description: Yup.string().required('Descrição obrigatória'),
          addres: Yup.string().required('Endereco obrigatório'),
          street: Yup.string().required('Rua obrigatório'),
          city: Yup.string().required('Cidade obrigatório'),
          zipCode: Yup.string().required('CEP obrigatório'),
          number: Yup.number().required('Numero necessario'),
          complement: Yup.string().notRequired(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (photo?.uri != null) {
          fdata.append('photo', {
            type: 'image/jpeg',
            name: `${photo?.filename}.jpg`,
            uri: photo?.uri,
          });
        } else {
          fdata.append('photo', null);
        }

        fdata.append('category_id', categoryId);
        fdata.append('anonymous', false);
        fdata.append('title', data.title);
        fdata.append('description', data.description);
        fdata.append('user_id', user.id);
        fdata.append('status', 'pendente');
        fdata.append('address', data.addres);
        fdata.append('street', data.street);
        fdata.append('zipcode', zipcode);
        fdata.append('number', data.number);
        fdata.append('city', data.city);
        fdata.append('complement', data.complement);
        fdata.append('latitude', coordinates.latitude);
        fdata.append('longitude', coordinates.longitude);
        fdata.append('hour', selectedTime.toString());

        await api.post('/denunciation', fdata);

        navigate('DenunciationCreated', { title: data.title });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }
        Alert.alert(
          `Erro ao criar denuncia ${err}`,
          'Ocorreu um erro ao criar uma denuncia, tente novamente',
        );
      }
    },
    [categoryId, coordinates, navigate, photo, selectedTime, user.id, zipcode],
  );

  // photo
  const handleUploadPhoto = useCallback(() => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 400,
      },
      (response) => {
        if (response.errorCode) {
          Alert.alert('Erro ao carregar imagem.');
          return;
        }

        setPhoto({ filename: response.fileName, uri: response.uri });
      },
    );
  }, []);

  // map
  // useEffect(() => {
  //   Geolocation.getCurrentPosition(
  //     ({ coords }) => {
  //       setCoordinates({
  //         latitude: coords.latitude,
  //         longitude: coords.longitude,
  //       });
  //       setLoading(false);
  //     },
  //     (error) => {
  //       console.log(error);
  //     },
  //     { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 },
  //   );
  // }, []);

  return (
    <Container>
      <Header>
        <BackButton onPress={navigateBack}>
          <Icon name="chevron-left" size={24} color="#181818" />
        </BackButton>

        <HeaderTitle>Nova Denúncia</HeaderTitle>
      </Header>

      <DenunciationContainer>
        <ScrollView>
          <Form ref={formRef} onSubmit={handleCreateDenunciation}>
            <Title>Denuncia</Title>
            <Input
              name="title"
              icon="file-text"
              placeholder="Título"
              returnKeyType="next"
              onSubmitEditing={() => {
                descriptionInputRef.current?.focus();
              }}
            />

            <Input
              ref={descriptionInputRef}
              name="description"
              icon="file-plus"
              placeholder="Descrição"
              returnKeyType="next"
              onSubmitEditing={() => {
                zipCodeInputRef.current?.focus();
              }}
            />
            <Time>
              <TitleTime>Escolha uma hora: </TitleTime>
              <OpenTimePikerButton onPress={handleToggleTimePiker}>
                <OpenTimePikerButtonText>
                  Selecionar outro horário
                </OpenTimePikerButtonText>
              </OpenTimePikerButton>

              {showTimePicker && (
                <DateTimePicker
                  value={selectedTime}
                  display="clock"
                  onChange={handleTimeChanged}
                  mode="time"
                  is24Hour
                />
              )}
            </Time>

            <Title>Local</Title>

            <FrontContainer>
              <Input
                keyboardType="numeric"
                ref={zipCodeInputRef}
                name="zipCode"
                icon="map-pin"
                placeholder="CEP"
                returnKeyType="next"
                onBlur={onBlurCep}
                onChangeText={(code) => {
                  setZipcode(code);
                }}
                onSubmitEditing={() => {
                  numberInputRef.current?.focus();
                }}
              />

              <Input
                ref={numberInputRef}
                keyboardType="numeric"
                name="number"
                icon="home"
                placeholder="Número"
                returnKeyType="next"
                onSubmitEditing={() => {
                  addressInputRef.current?.focus();
                }}
              />
            </FrontContainer>

            <Input
              ref={addressInputRef}
              name="addres"
              icon="map"
              placeholder="Endereço"
              returnKeyType="next"
              onSubmitEditing={() => {
                streetInputRef.current?.focus();
              }}
            />

            <Input
              ref={streetInputRef}
              name="street"
              icon="map"
              placeholder="Rua"
              returnKeyType="next"
              onSubmitEditing={() => {
                cityInputRef.current?.focus();
              }}
            />
            <Input
              ref={cityInputRef}
              name="city"
              icon="map"
              placeholder="Cidade"
              returnKeyType="next"
              onSubmitEditing={() => {
                complementInputRef.current?.focus();
              }}
            />

            <Input
              ref={complementInputRef}
              name="Complement"
              icon="map"
              placeholder="Complemento"
              returnKeyType="next"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />

            <MapContainer>
              {loading ? (
                <ActivityIndicator size="large" color="#ffffff" />
              ) : (
                <MapView
                  style={{
                    zIndex: 1,
                    width: '100%',
                    height: '100%',
                  }}
                  initialRegion={{
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                    latitudeDelta: 0.0068,
                    longitudeDelta: 0.0068,
                  }}
                  loadingEnabled
                  onPress={(position) => {
                    handleCepByLahLong(position.nativeEvent.coordinate);
                  }}
                >
                  <Marker
                    coordinate={coordinates}
                    icon={{
                      uri:
                        'https://img.icons8.com/color/96/000000/coronavirus--v2.png',
                    }}
                  />
                </MapView>
              )}
            </MapContainer>

            <PhotoButton onPress={handleUploadPhoto}>
              <PhotoDenunciation source={{ uri: photo?.uri }} />
              <CreatePhotoButtonText>Adicionar Imagem</CreatePhotoButtonText>
            </PhotoButton>

            <CreateDenunciationButton
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              <CreateDenunciationButtonText>
                Denunciar
              </CreateDenunciationButtonText>
            </CreateDenunciationButton>
          </Form>
        </ScrollView>
      </DenunciationContainer>
    </Container>
  );
};

export default CreateDenunciation;
