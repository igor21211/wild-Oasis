import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import { CabinType } from './types';
import Empty from '../../ui/Empty';
import Pagination from '../../ui/Pagination';
import useCabins from './useCabins';

const CabinTable = () => {
  const { cabins, isLoading, count } = useCabins();

  if (!cabins) return <Empty resource="cabins" />;

  if (isLoading) return <Spinner />;
  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
        </Table.Header>
        <Table.Body
          data={cabins}
          render={(cabin) => (
            <CabinRow key={cabin.id} cabin={cabin as CabinType} />
          )}
        />
        <Table.Footer>
          <Pagination count={count!} />
        </Table.Footer>
      </Table>
    </Menus>
  );
};

export default CabinTable;
