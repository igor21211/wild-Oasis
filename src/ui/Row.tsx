import { css, styled } from "styled-components";
type RowStyledProps = {
  type?: "horizontal" | "vertical";
};

const RowStyled = styled.div<RowStyledProps>`
  display: flex;
  ${({ type }) => type === "horizontal" && css`
   justify-content: space-between;
   align-items: center;
  `}
  ${({ type }) => type === "vertical" && css`
   flex-direction: column;
   gap: 1.6rem;
  `}
`;

RowStyled.defaultProps = {
  type: "horizontal",
};

export default RowStyled;
