import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ active?: boolean }>`
  background-color: var(--color-grey-0);
  border: none;
  ${(props: { active?: boolean }) =>
    props.active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const Filter = ({
  filterField,
  options,
}: {
  filterField: string;
  options: { value: string; label: string }[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get(filterField) || 'all';
  const handleClick = (filter: string) => {
    searchParams.set(filterField, filter);
    if (searchParams.get('page')) {
      searchParams.set('page', '1');
    }
    setSearchParams(searchParams);
  };
  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={activeFilter === option.value}
          disabled={option.value === activeFilter}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
};

export default Filter;
