import React from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';

const SignUp: React.FC = () => {
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
            <Image
              source={logoImg}
              style={{ width: '60%', marginBottom: -60, marginTop: -20 }}
              resizeMode="center"
            />

            <View>
              <Title>Crie sua conta</Title>
            </View>

            <Input name="name" icon="user" placeholder="Nome" />

            <Input name="email" icon="mail" placeholder="E-mail" />

            <Input
              name="confirmEmail"
              icon="mail"
              placeholder="Confirmar E-mail"
            />

            <Input name="cpf" icon="user" placeholder="CPF" />

            <Input name="password" icon="lock" placeholder="Senha" />

            <Input
              name="confirmpassword"
              icon="lock"
              placeholder="Confirmar senha"
            />

            <Button
              onPress={() => {
                console.log('deu');
              }}
            >
              Cadastrar
            </Button>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
      <BackToSignIn onPress={() => {}}>
        <Icon name="arrow-left" size={20} color="#000000" />
        <BackToSignInText>Voltar para logon</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
