import CreateCabinForm from './CreateCabinForm';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';

/* const AddCabin = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  return (
    <div>
      <Button
        size="small"
        variation="secondary"
        onClick={() => setIsOpenModal(!isOpenModal)}
      >
        Add cabin
      </Button>
      <Row>
        {isOpenModal && (
          <Modal onClose={() => setIsOpenModal(false)}>
            <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
          </Modal>
        )}
      </Row>
    </div>
  );
};
 */

const AddCabin = () => {
  return (
    <div>
      <Modal>
        <Modal.Open opens="cabin-form">
          <Button size="small" variation="primary">
            Add cabin
          </Button>
        </Modal.Open>
        <Modal.Window name="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
};
export default AddCabin;
