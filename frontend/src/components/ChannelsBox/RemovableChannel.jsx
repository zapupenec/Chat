import { useState } from 'react';
import { useSelector } from 'react-redux';
import {
  Button, Dropdown, ButtonGroup,
} from 'react-bootstrap';

import { Modal } from './Modal';
import { channelsSelectors } from '../../store/slices';

export const RemovableChannel = ({ channel, handleClickChannel }) => {
  const { id, name } = channel;
  const currentChannelId = useSelector(channelsSelectors.selectCurrentChannelId);

  const [modalShown, setModalShown] = useState(false);
  const [typeModal, setTypeModal] = useState(null);

  const hideModal = () => setModalShown(false);
  const handleClickDropdownItem = (modalName) => () => {
    setModalShown(true);
    setTypeModal(modalName);
  };

  return (
    <Dropdown key={id} as={ButtonGroup} className="w-100">
      <Button
        variant={currentChannelId === id ? 'secondary' : ''}
        className="rounded-0 text-start d-block text-truncate w-100"
        onClick={handleClickChannel(id)}
      >
        <span className="me-1">#</span>
        {name}
      </Button>
      <Dropdown.Toggle
        split
        variant={currentChannelId === id ? 'secondary' : ''}
        id={`dropdown-chanel-${name}`}
      >
        <span className="visually-hidden">Управление каналом</span>
      </Dropdown.Toggle>
      <Modal modalName={typeModal} modalShown={modalShown} hideModal={hideModal} id={id} />
      <Dropdown.Menu>
        <Dropdown.Item as={Button} onClick={handleClickDropdownItem('Remove')}>Удалить</Dropdown.Item>
        <Dropdown.Item as={Button} onClick={handleClickDropdownItem('Rename')}>Переименовать</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
