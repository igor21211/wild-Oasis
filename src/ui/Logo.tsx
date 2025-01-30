import { useDarkMode } from '../context/DarkModeContext';
import styled from 'styled-components';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

const Logo = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <StyledLogo>
      <Img src={isDarkMode ? '/logo-dark.png' : '/logo-light.png'} alt="Logo" />
    </StyledLogo>
  );
};

export default Logo;
