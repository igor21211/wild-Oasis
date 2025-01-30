import { useOutsideClick } from '../hooks/useOutsideClick';
import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const StyledModal = styled(motion.div)`
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

// Выберите один из вариантов анимации:

// Вариант 1: Масштабирование
const scaleAnimation = {
  initial: { opacity: 0, x: '-50%', y: '-50%', scale: 0 },
  animate: { opacity: 1, x: '-50%', y: '-50%', scale: 1 },
  exit: { opacity: 0, x: '-50%', y: '-50%', scale: 0 },
};

// Вариант 2: Вращение
const rotateAnimation = {
  initial: { opacity: 0, x: '-50%', y: '-50%', rotate: -180 },
  animate: { opacity: 1, x: '-50%', y: '-50%', rotate: 0 },
  exit: { opacity: 0, x: '-50%', y: '-50%', rotate: 180 },
};

// Вариант 3: Пружинный эффект
const springAnimation = {
  initial: { opacity: 0, x: '-50%', y: '-100vh' },
  animate: {
    opacity: 1,
    x: '-50%',
    y: '-50%',
    transition: {
      type: 'spring',
      damping: 10,
      stiffness: 100,
    },
  },
  exit: { opacity: 0, x: '-50%', y: '100vh' },
};

// Вариант 4: Появление из точки
const expandAnimation = {
  initial: { opacity: 0, x: '-50%', y: '-50%', scale: 0, borderRadius: '50%' },
  animate: {
    opacity: 1,
    x: '-50%',
    y: '-50%',
    scale: 1,
    borderRadius: '12px',
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, x: '-50%', y: '-50%', scale: 0, borderRadius: '50%' },
};

const ModalContext = createContext<{
  openName: string;
  close: () => void;
  open: (name: string) => void;
}>({
  openName: '',
  close: () => {},
  open: () => {},
});

function Modal({ children }: { children: React.ReactNode }) {
  const [openName, setOpenName] = useState('');
  const close = () => setOpenName('');
  const open = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({
  opens,
  children,
}: {
  opens: string;
  children: React.ReactNode;
}) {
  const { open } = useContext(ModalContext);
  return cloneElement(children as React.ReactElement, {
    onClick: () => {
      console.log('opens', opens);
      open(opens);
    },
  });
}

function Window({
  children,
  name,
}: {
  children: React.ReactNode;
  name: string;
}) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick({ handler: close, listenCapturing: true });

  return createPortal(
    <AnimatePresence>
      {name === openName && (
        <Overlay
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <StyledModal ref={ref} {...scaleAnimation}>
            <Button onClick={close}>
              <HiXMark />
            </Button>
            <div>
              {cloneElement(children as React.ReactElement, {
                onCloseModal: close,
              })}
            </div>
          </StyledModal>
        </Overlay>
      )}
    </AnimatePresence>,
    document.body
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
