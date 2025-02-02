import { useOutsideClick } from '../hooks/useOutsideClick';
import { createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiEllipsisVertical } from 'react-icons/hi2';
import styled from 'styled-components';

const Menu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

interface StyledListProps {
  position: { x: number; y: number } | null;
}

const StyledList = styled.ul<StyledListProps>`
  position: fixed;

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position?.x}px;
  top: ${(props) => props.position?.y}px;
`;

const StyledButton = styled.button`
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

const MenusContext = createContext<{
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: { x: number; y: number } | null;
  setPosition: (position: { x: number; y: number } | null) => void;
}>({
  openId: '',
  close: () => {},
  open: () => {},
  position: null,
  setPosition: () => {},
});

const Menus = ({ children }: { children: React.ReactNode }) => {
  const [openId, setOpenId] = useState('');
  const [position, setPosition] = useState<{ x: number; y: number } | null>(
    null
  );
  const close = () => setOpenId('');
  const open = setOpenId;
  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
};

const Toggle = ({ id }: { id: string }) => {
  const { openId, open, close, setPosition } = useContext(MenusContext);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const button = (e.target as HTMLElement).closest('button');
    const rect = button?.getBoundingClientRect();
    setPosition({
      x: window.innerWidth - (rect?.width ?? 0) - (rect?.x ?? 0),
      y: (rect?.y ?? 0) + (rect?.height ?? 0) + 10,
    });
    openId === '' || openId !== id ? open(id) : close();
  };
  return (
    <StyledToggle onClick={handleClick} id={id}>
      <HiEllipsisVertical />
    </StyledToggle>
  );
};

const List = ({ children, id }: { children: React.ReactNode; id: string }) => {
  const { openId, position, close } = useContext(MenusContext);
  const ref = useOutsideClick<HTMLUListElement>({
    handler: close,
    listenCapturing: false,
  });

  if (openId !== id) return null;
  return createPortal(
    <StyledList position={position} ref={ref}>
      {children}
    </StyledList>,
    document.body
  );
};

const Button = ({
  children,
  icon,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) => {
  const { close } = useContext(MenusContext);
  const handleClick = () => {
    console.log('clicked');
    onClick?.();
    close();
  };
  return (
    <li>
      <StyledButton onClick={handleClick} disabled={disabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
};

Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
