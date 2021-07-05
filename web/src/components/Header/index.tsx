import React, { useCallback } from 'react';
import 'react-day-picker/lib/style.css';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { FiPower } from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';
import { HeaderContainer, HeaderContent, Profile, ButtonMenu } from './styles';

import logoImg from '../../assets/logo2.png';
import { useAuth } from '../../hooks/auth';

const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();

  const handleClick = useCallback(event => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  const handleHome = useCallback(() => {
    setAnchorEl(null);
    history.push('/dashboard');
  }, [history]);

  const handleCategory = useCallback(() => {
    setAnchorEl(null);
    history.push('/category');
  }, [history]);

  const handleAbstract = useCallback(() => {
    setAnchorEl(null);
    history.push('/abstract');
  }, [history]);

  const { signOut, user } = useAuth();

  return (
    <HeaderContainer>
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

        <ButtonMenu
          className="buttonMenu"
          onClick={handleClick}
          aria-controls="customized-menu"
          aria-haspopup="true"
          variant="contained"
        >
          Menu
        </ButtonMenu>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleHome}>Home</MenuItem>
          <MenuItem onClick={handleCategory}>Categorias</MenuItem>
          <MenuItem onClick={handleAbstract}>Resumo</MenuItem>
          <MenuItem onClick={signOut}>
            <FiPower /> Sair
          </MenuItem>
        </Menu>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
