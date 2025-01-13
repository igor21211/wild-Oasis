import { css, styled } from 'styled-components';
type HeadingProps = {
  as?: 'h1' | 'h2' | 'h3';
};

const Heading = styled.h1<HeadingProps>`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 2rem;
      font-weight: 700;
      color: red;
    `}
  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 1.5rem;
      font-weight: 600;
      color: blue;
    `}
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 1rem;
      font-weight: 500;
      color: green;
    `}
`;

export default Heading;
