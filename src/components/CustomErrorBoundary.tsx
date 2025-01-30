import { Component, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  background-color: #fff8f8;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ErrorTitle = styled.p`
  font-size: 1.5rem;
  color: #e74c3c;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const ErrorMessage = styled.pre`
  background-color: #fff;
  padding: 1rem;
  border-radius: 4px;
  border: 1px solid #ffcdd2;
  color: #666;
  font-size: 0.9rem;
  margin: 1rem 0;
  max-width: 100%;
  overflow-x: auto;
`;

const RetryButton = styled.button`
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;

  &:hover {
    background-color: #c0392b;
  }
`;

class CustomErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <ErrorContainer role="alert">
          <ErrorTitle>Что-то пошло не так:</ErrorTitle>
          <ErrorMessage>{this.state.error?.message}</ErrorMessage>
          <RetryButton
            onClick={() => this.setState({ hasError: false, error: null })}
          >
            Попробовать снова
          </RetryButton>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default CustomErrorBoundary;
