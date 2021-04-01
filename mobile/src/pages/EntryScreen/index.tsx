import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  View,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import Recaptcha, { RecaptchaHandles } from 'react-native-recaptcha-that-works';
import { RECAPTCHA_BASE_URL, RECAPTCHA_SITY_KEY } from '@env';
import { useAuth } from '../../hooks/auth';

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
  ModalContainer,
  ModalContainerMeta,
  ModalText,
  ModalButtonConfirm,
  ModalButtonTextConfirm,
  ModalButtonCancel,
  ModalInputText,
  ModalErrText,
} from './styles';

const EntryScreen: React.FC = () => {
  const navigation = useNavigation();
  const [modal, setModal] = useState(false);
  const [err, setErr] = useState<string>();
  const [nickname, setNickname] = useState<string>();
  const recaptcha = useRef<RecaptchaHandles>(null);

  const { signInAnonymous } = useAuth();

  const handleUserAnonymous = useCallback(() => {
    if (!nickname) {
      setErr('Campo obrigatório');
      return;
    }
    recaptcha.current?.open();
  }, [nickname]);

  const onVerify = useCallback(
    async (token: string) => {
      try {
        if (nickname) {
          await signInAnonymous(nickname);
        }
      } catch (er) {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer o login anônimo tente novamente mais tarde',
        );
      }
    },
    [nickname, signInAnonymous],
  );

  const onExpire = useCallback(() => {
    setErr('Tempo expirado');
  }, []);

  const onError = useCallback(async () => {
    setErr('Falha ao carregar verificação');
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
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
                <ModalButtonCancel
                  onPress={() => {
                    setErr('');
                    setModal(!modal);
                  }}
                >
                  <Icon name="x" size={20} color="#bb1818" />
                </ModalButtonCancel>
                <ModalText>Digite um apelido:</ModalText>
                <ModalInputText
                  maxLength={20}
                  onChangeText={(text) => {
                    setNickname(text);
                    setErr('');
                  }}
                />
                {!nickname && err ? <ModalErrText>{err}</ModalErrText> : <></>}

                <ModalButtonConfirm onPress={handleUserAnonymous}>
                  <ModalButtonTextConfirm>Confirmar</ModalButtonTextConfirm>
                </ModalButtonConfirm>
              </ModalContainerMeta>
            </ModalContainer>
          </Modal>
          <Image source={logoImg} />

          <Recaptcha
            ref={recaptcha}
            lang="pt-BR"
            theme="light"
            siteKey={RECAPTCHA_SITY_KEY}
            baseUrl={RECAPTCHA_BASE_URL}
            onVerify={onVerify}
            onExpire={onExpire}
            onError={onError}
            size="normal"
          />

          <View>
            <Title>Como deseja entrar:</Title>
          </View>

          <EntryButtonAccount onPress={() => navigation.navigate('SignIn')}>
            <Icon name="user" size={20} color="#ffffff" />
            <EntryButtonAccountText>Tenho conta</EntryButtonAccountText>
          </EntryButtonAccount>

          <EntryButtonAnonymously
            onPress={() => {
              setModal(!modal);
            }}
          >
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