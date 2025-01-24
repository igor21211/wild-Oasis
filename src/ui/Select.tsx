import styled from 'styled-components';
interface SelectProps {
  type: 'white' | 'grey';
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  value: string;
}
interface SelectStyledProps {
  type: 'white' | 'grey';
}

const StyledSelect = styled.select<SelectStyledProps>`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

const Select = ({ options, onChange, value, ...props }: SelectProps) => {
  return (
    <StyledSelect
      {...props}
      onChange={(e) => onChange(e.target.value)}
      value={value}
    >
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </StyledSelect>
  );
};

export default Select;
