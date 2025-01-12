import { css, styled } from "styled-components";
type HeadingProps = {
    type?: "large" | "medium" | "small"
}

const StyledHeading = styled.h1<HeadingProps>`
    ${(props) => props.type === "large" && css`
    font-size: 2rem;
    font-weight: 700;
    color: red;
  `}
  ${(props) => props.type === "medium" && css`
    font-size: 1.5rem;
    font-weight: 600;
    color:  blue;
  `}
  ${(props) => props.type === "small" && css`
    font-size: 1rem;
    font-weight: 500;
    color:  green;
  `}
`;

export default StyledHeading;
