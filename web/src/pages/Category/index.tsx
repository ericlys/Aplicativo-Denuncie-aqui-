import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import 'react-day-picker/lib/style.css';

import { FiPower, FiTrash2 } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  NewCategory,
  InputCategory,
  IconCategory,
  Button,
  SectionTwo,
  Categories,
  ButtonDelete,
} from './styles';

import logoImg from '../../assets/logo2.png';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface Category {
  title: string;
  icon: string;
  id: string;
  icon_url: string;
}

const Category: React.FC = () => {
  const { addToast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState<string>();
  const [icon, setIcon] = useState<string>();
  const [file, setFile] = useState<File>();
  const { signOut, user } = useAuth();

  const handleNewCategory = useCallback(() => {
    if (file && categoryName) {
      const data = new FormData();
      data.append('icon', file);
      data.append('title', categoryName);
      api.post('/category', data).then(res => {
        setCategories([...categories, res.data]);

        addToast({
          type: 'success',
          title: 'Categoria adicionada com sucesso',
          description: 'Nova categoria adicionada. ',
        });
      });
    } else {
      addToast({
        type: 'error',
        title: 'Dados incompletos',
        description: 'Preencha todos os campos antes de cadastrar.',
      });
    }
  }, [addToast, categories, categoryName, file]);

  const handleCategoryIcon = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setIcon(URL.createObjectURL(e.target.files[0]));
      setFile(e.target.files[0]);
    }
  }, []);

  useEffect(() => {
    api.get('category').then(response => {
      setCategories(response.data);
    });
  }, []);

  const handleDeleteCategory = useCallback(
    id => {
      api.delete(`/category/${id}`);
      setCategories(categories.filter(item => item.id !== id));
      addToast({
        type: 'success',
        title: 'Categoria deletada',
        description: `A categoria foi excluida`,
      });
    },
    [addToast, categories],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="DenuncieAqui" />

          <Profile>
            <img src={user.avatar_url} alt={user.name} />
            <div>
              <span>Bem-vindo,</span>
              <Link to="/profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <NewCategory>
          <h1>Categoria</h1>
          <div>
            <h2>Adicionar Categoria:</h2>
            <InputCategory
              name="category"
              placeholder="Nome da categoria"
              onChange={val => {
                setCategoryName(val.currentTarget.value);
              }}
            />
            <IconCategory>
              <label htmlFor="avatar">
                {icon && <img src={icon} alt={user.name} />}
                Adicionar Icone
                <input
                  accept="image/png, image/jpeg"
                  type="file"
                  id="avatar"
                  onChange={handleCategoryIcon}
                />
              </label>
            </IconCategory>
            <Button onClick={handleNewCategory}>Cadastrar</Button>
          </div>
        </NewCategory>

        <SectionTwo>
          <h2>Categorias:</h2>
          {categories.map(category => (
            <Categories key={category.id}>
              <img src={category.icon_url} alt={category.icon} />
              <strong id={category.id}>{category.title}</strong>
              <ButtonDelete
                onClick={() => {
                  handleDeleteCategory(category.id);
                }}
              >
                <FiTrash2 />
              </ButtonDelete>
            </Categories>
          ))}
        </SectionTwo>
      </Content>
    </Container>
  );
};

export default Category;
