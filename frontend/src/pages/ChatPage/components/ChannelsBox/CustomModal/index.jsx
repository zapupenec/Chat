/* eslint-disable import/prefer-default-export */
import { useDispatch, useSelector } from 'react-redux';
import { Modal } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { Add } from './Add';
import { Remove } from './Remove';
import { Rename } from './Rename';
import { modalsActions, modalsSelectors } from '../../../../../store/slices';

const modals = {
  add: Add,
  remove: Remove,
  rename: Rename,
};
const getBody = (typeModal, hideModal) => {
  const Component = modals[typeModal];
  return <Component hideModal={hideModal} />;
};

export const CustomModal = () => {
  const { t } = useTranslation();
  const typeModal = useSelector(modalsSelectors.selectTypeModal);

  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(modalsActions.setTypeModal(null));
  };

  if (!typeModal) {
    return null;
  }

  return (
    <Modal
      centered
      show
      onHide={hideModal}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {t(`modals.${typeModal}`)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {getBody(typeModal, hideModal)}
      </Modal.Body>
    </Modal>
  );
};
