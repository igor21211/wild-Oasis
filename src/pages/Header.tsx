import UserAvatar from '../features/authentication/UserAvatar';
import HeaderMenu from '../ui/HeaderMenu';
import { styled } from 'styled-components';

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 1.2rem 4.8rem;
  display: flex;
  justify-content: flex-end;
  gap: 2.4rem;
  align-items: center;
`;

const Header = () => {
  return (
    <StyledHeader>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
};

export default Header;
