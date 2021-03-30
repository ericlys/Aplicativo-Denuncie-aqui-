import React, { useCallback, useRef } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { useAuth } from '../../hooks/auth';

import getValidationErrors from '../../utils/getValidationErros';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  CreateAccountButton,
  CreateAccountButtonText,
  EntryButtonAnonymously,
  EntryButtonAnonymouslyText,
  EntryButtonAccount,
  EntryButtonAccountText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const EntryScreen: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, cheque as credenciais.',
        );
      }
    },
    [signIn],
  );

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Image source={logoImg} />

          <View>
            <Title>Como deseja entrar:</Title>
          </View>

          <EntryButtonAccount onPress={() => navigation.navigate('SignIn')}>
            <Icon name="user" size={20} color="#ffffff" />
            <EntryButtonAccountText>Tenho conta</EntryButtonAccountText>
          </EntryButtonAccount>

          <EntryButtonAnonymously>
            <Icon name="user-x" size={20} color="#ffffff" />
            <EntryButtonAnonymouslyText>
              Anonimamente
            </EntryButtonAnonymouslyText>
          </EntryButtonAnonymously>
        </Container>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <Icon name="log-in" size={20} color="#bb1818" />
        <CreateAccountButtonText>Criar sua conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default EntryScreen;
