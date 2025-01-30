import { css, styled } from 'styled-components';
type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
};

const Heading = styled.h1<HeadingProps>`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 2rem;
      font-weight: 700;
      color: var(--color-grey-800);
    `}
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 1.5rem;
      font-weight: 600;
      color: var(--color-grey-800);
    `}
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 1rem;
      font-weight: 500;
      color: var(--color-grey-800);
    `}
  ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 1.6rem;
      font-weight: 600;
      text-align: center;
      color: var(--color-grey-800);
    `}
`;

Heading.defaultProps = {
  as: 'h1',
};

export default Heading;
