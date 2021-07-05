import React, { useCallback, useRef } from 'react';
import { FormHandles } from '@unform/core';
import {
  FiArrowLeft,
  FiMail,
  FiUser,
  FiLock,
  FiDatabase,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import getValidationErrors from '../../utils/getValidationErrors';
import logoImg from '../../assets/logo.png';
import { Container, Content, AnimationContainer, Background } from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  cpf: string;
  password: string;
  administrator: boolean;
}

const SingUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string()
            .required('CPF obrigatório')
            .matches(/^[0-9]+$/, 'Must be only digits')
            .length(11, 'Deve conter 11  dígitos'),
          password: Yup.string().min(6, 'No mínimo'),
        });
        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/users', { ...data, administrator: true });

        history.push('/');

        addToast({
          type: 'success',
          title: 'Cadastro realizado com sucesso',
          description:
            'Ative sua conta no seu e-mail para poder fazer seu logon no DenuncieAqui!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);

          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description: 'Ocorreu um erro ao fazer cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={logoImg} alt="DenuncieAqui" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Fazer Cadastro:</h1>

            <Input name="name" icon={FiUser} placeholder="Nome" />
            <Input name="email" icon={FiMail} placeholder="E-mail" />
            <Input name="cpf" icon={FiDatabase} placeholder="CPF" />
            <Input
              name="password"
              icon={FiLock}
              type="password"
              placeholder="Senha"
            />

            <Button type="submit">Cadastrar</Button>
          </Form>

          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SingUp;
