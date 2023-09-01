import { Add } from './Add';
import { Remove } from './Remove';
import { Rename } from './Rename';

const modals = {
  Add,
  Remove,
  Rename,
};
const getModal = (modalName) => modals[modalName];

export const Modal = ({
  modalName, modalShown, hideModal, id = null,
}) => {
  if (!modalShown) {
    return null;
  }

  const Component = getModal(modalName);
  return (
    <Component
      modalShown={modalShown}
      hideModal={hideModal}
      id={id}
    />
  );
};
