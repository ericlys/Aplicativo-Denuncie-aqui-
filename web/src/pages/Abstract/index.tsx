import React from 'react';
import 'react-day-picker/lib/style.css';

import { Container, Content, NewCategory, SectionTwo } from './styles';

import Header from '../../components/Header';

const Abstract: React.FC = () => {
  return (
    <Container>
      <Header />
      <Content>
        <NewCategory>
          <h1>Resumo</h1>
          <div>
            <h2>Adicionar Categoria:</h2>
          </div>
        </NewCategory>

        <SectionTwo>
          <h2>Categorias:</h2>
        </SectionTwo>
      </Content>
    </Container>
  );
};

export default Abstract;
