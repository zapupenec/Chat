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

export const CustomModal = () => {
  const { t } = useTranslation();
  const isShowen = useSelector(modalsSelectors.selectIsShowen);
  const typeModal = useSelector(modalsSelectors.selectType);

  const dispatch = useDispatch();
  const hideModal = () => {
    dispatch(modalsActions.closeModal());
  };

  const Component = modals[typeModal];

  return (
    <Modal
      centered
      show={isShowen}
      onHide={hideModal}
    >
      {isShowen && (
        <>
          <Modal.Header closeButton>
            <Modal.Title>
              {t(`modals.${typeModal}`)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {typeModal && <Component hideModal={hideModal} />}
          </Modal.Body>
        </>
      )}
    </Modal>
  );
};
