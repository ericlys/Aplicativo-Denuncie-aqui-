import React, { useRef, useCallback, useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import Icon from 'react-native-vector-icons/Feather';
import * as ImagePicker from 'react-native-image-picker';

import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErros';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Title,
  BackButton,
  UserAvatarButton,
  UserAvatar,
  QuitButton,
  ModalContainer,
  ModalText,
  ModalButtonCancel,
  ModalButtonConfirm,
  ModalButtonTextCancel,
  ModalButtonTextConfirm,
  ModalContainerMeta,
} from './styles';

interface ProfileFormData {
  name: string;
  cpf: string;
  email: string;
  old_password: string;
  password: string;
  password_confirmation: string;
}

const SignUp: React.FC = () => {
  const { signOut } = useAuth();
  const [modal, setModal] = useState(false);
  const { user, updateUser } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const navigation = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const cpfInputRef = useRef<TextInput>(null);
  const oldPasswordInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const passwordConfirmInputRef = useRef<TextInput>(null);

  const handleSignUp = useCallback(
    async (data: ProfileFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string().required('CPF obrigatório'),
          // .matches(/^[0-9]+$/, 'Must be only digits')
          // .length(14, 'Deve conter 11  dígitos'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: (val) => !!val.length,
            then: Yup.string().required('Campo obrigatório'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: (val) => !!val.length,
              then: Yup.string().required('Campo obrigatório'),
              otherwise: Yup.string(),
            })
            .oneOf(
              [Yup.ref('password'), null || undefined],
              'Confirmação incorreta',
            ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          name,
          email,
          cpf,
          old_password,
          password,
          password_confirmation,
        } = data;

        const formData = {
          name,
          email,
          cpf,
          ...(old_password
            ? {
                old_password,
                password,
                password_confirmation,
              }
            : {}),
        };

        const response = await api.put('/profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso!');

        navigation.goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro no atualização do perfil',
          'Ocorreu um erro ao atualizar seu perfil, tente novamente.',
        );
      }
    },
    [navigation, updateUser],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.launchCamera(
      {
        mediaType: 'photo',
        includeBase64: false,
        maxWidth: 400,
        maxHeight: 400,
      },
      (response) => {
        if (response.errorCode) {
          Alert.alert('Erro ao carregar imagem.');
          return;
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api.patch('users/avatar', data).then((apiResponse) => {
          updateUser(apiResponse.data);
        });
      },
    );
  }, [updateUser, user.id]);

  const hangleGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
        >
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
                  <ModalText>
                    Deseja desvincular sua conta deste aplicativo?
                  </ModalText>

                  <ModalButtonConfirm onPress={signOut}>
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

            <BackButton onPress={hangleGoBack}>
              <Icon name="chevron-left" size={24} color="#999591" />
            </BackButton>

            {user.avatar_url && (
              <UserAvatarButton onPress={handleUpdateAvatar}>
                <UserAvatar source={{ uri: user.avatar_url }} />
              </UserAvatarButton>
            )}
            <QuitButton
              onPress={() => {
                setModal(!modal);
              }}
            >
              <Icon name="log-out" size={24} color="#e42929" />
            </QuitButton>
            <View>
              <Title>Meu Perfil</Title>
            </View>
            <Form initialData={user} ref={formRef} onSubmit={handleSignUp}>
              <Input
                editable={false}
                autoCapitalize="words"
                name="name"
                icon="user"
                placeholder="Nome"
                returnKeyType="next"
                onSubmitEditing={() => {
                  cpfInputRef.current?.focus();
                }}
              />

              {user.cpf && (
                <>
                  <Input
                    ref={cpfInputRef}
                    keyboardType="numeric"
                    name="cpf"
                    icon="user"
                    placeholder="CPF"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      emailInputRef.current?.focus();
                    }}
                  />
                  <Input
                    ref={emailInputRef}
                    keyboardType="email-address"
                    autoCorrect={false}
                    autoCapitalize="none"
                    name="email"
                    icon="mail"
                    placeholder="E-mail"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      oldPasswordInputRef.current?.focus();
                    }}
                  />

                  <Input
                    ref={oldPasswordInputRef}
                    secureTextEntry
                    name="old_password"
                    icon="lock"
                    placeholder="Senha Atual"
                    textContentType="newPassword"
                    returnKeyType="next"
                    containerStyle={{ marginTop: 16 }}
                    onSubmitEditing={() => {
                      passwordInputRef.current?.focus();
                    }}
                  />

                  <Input
                    ref={passwordInputRef}
                    secureTextEntry
                    name="password"
                    icon="lock"
                    placeholder="Nova senha"
                    textContentType="newPassword"
                    returnKeyType="next"
                    onSubmitEditing={() => {
                      passwordConfirmInputRef.current?.focus();
                    }}
                  />

                  <Input
                    ref={passwordConfirmInputRef}
                    secureTextEntry
                    name="password_confirmation"
                    icon="lock"
                    placeholder="Confirmar senha"
                    textContentType="newPassword"
                    returnKeyType="send"
                    onSubmitEditing={() => {
                      formRef.current?.submitForm();
                    }}
                  />

                  <Button
                    onPress={() => {
                      formRef.current?.submitForm();
                    }}
                  >
                    Confirmar Mudanças
                  </Button>
                </>
              )}
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignUp;
