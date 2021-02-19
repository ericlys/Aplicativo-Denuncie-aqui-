import React, { useCallback, useRef } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { Alert, ScrollView, TextInput } from 'react-native';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
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
} from './styles';
import { useAuth } from '../../hooks/auth';
import Input from '../../components/Input';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErros';

interface User {
  id: string;
}

interface RouteParams {
  id: string;
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
  latitude: number;
  longitude: number;
  number: number;
  street: string;
  zipcode: string;
  hour: Date;
}

const CreateDenunciation: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { user } = useAuth();
  const route = useRoute();
  const { goBack, navigate } = useNavigation();

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

  const handleCreateDenunciation = useCallback(
    async (data: DenunciationFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          title: Yup.string().required('Titulo obrigatório'),
          description: Yup.string().required('Descricao obrigatória'),
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

        Alert.alert(data.addres);

        await api.post('/denunciation', {
          anonymous: false,
          title: data.title,
          description: data.description,
          photo: '',
          status: 'pendente',
          user,
          address: {
            address: data.addres,
            city: 'teste3',
            complement: 'zona rural',
            latitude: '-6.84972',
            longitude: '-38.39556',
            number: '00',
            street: 'Pd. AntDut',
            zipcode: '58910-000',
          },
          hour: '2021-02-18T14:58:22.330Z',
        });

        navigate('DenunciationCreated');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);
        }

        // Alert.alert(
        //   'Erro ao criar denuncia',
        //   'Ocorreu um erro ao criar uma denuncia, tente novamente',
        // );
      }
    },
    [navigate, user],
  );

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
              icon=""
              placeholder="Titulo"
              returnKeyType="next"
              onSubmitEditing={() => {
                descriptionInputRef.current?.focus();
              }}
            />

            <Input
              ref={descriptionInputRef}
              name="description"
              icon=""
              placeholder="Descricao"
              returnKeyType="next"
              onSubmitEditing={() => {
                addressInputRef.current?.focus();
              }}
            />

            <Title>Local</Title>

            <Input
              ref={addressInputRef}
              name="addres"
              icon=""
              placeholder="Endereco"
              returnKeyType="next"
              onSubmitEditing={() => {
                streetInputRef.current?.focus();
              }}
            />

            <Input
              ref={streetInputRef}
              name="street"
              icon=""
              placeholder="Rua"
              returnKeyType="next"
              onSubmitEditing={() => {
                cityInputRef.current?.focus();
              }}
            />
            <Input
              ref={cityInputRef}
              name="city"
              icon=""
              placeholder="Cidade"
              returnKeyType="next"
              onSubmitEditing={() => {
                zipCodeInputRef.current?.focus();
              }}
            />

            <FrontContainer>
              <Input
                ref={zipCodeInputRef}
                name="zipCode"
                icon=""
                placeholder="CEP"
                returnKeyType="next"
                onSubmitEditing={() => {
                  numberInputRef.current?.focus();
                }}
              />

              <Input
                ref={numberInputRef}
                name="number"
                icon=""
                placeholder="Numero"
                returnKeyType="next"
                onSubmitEditing={() => {
                  complementInputRef.current?.focus();
                }}
              />
            </FrontContainer>

            <Input
              ref={complementInputRef}
              name="Complement"
              icon=""
              placeholder="Complemento"
              returnKeyType="next"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
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
