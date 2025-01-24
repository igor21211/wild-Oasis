import { useSearchParams } from 'react-router-dom';
import Select from './Select';

const SortBy = ({
  options,
}: {
  options: { value: string; label: string }[];
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const handleChange = (value: string) => {
    searchParams.set('sortBy', value);
    setSearchParams(searchParams);
  };
  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={sortBy}
    />
  );
};

export default SortBy;
