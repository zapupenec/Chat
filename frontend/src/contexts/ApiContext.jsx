/* eslint-disable import/prefer-default-export */
import {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { channelsActions, messagesActions } from '../store/slices';

const ApiContext = createContext({});

export const ApiProvider = ({ children, socket }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    socket.connect();

    socket.on('connect_error', () => {
      toast.error(t('toasts.netWorkError'));
    });

    socket.on('newMessage', (message) => {
      dispatch(messagesActions.addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(channelsActions.addChannel(channel));
    });

    socket.on('removeChannel', (channel) => {
      dispatch(channelsActions.removeChannel(channel.id));
    });

    socket.on('renameChannel', (channel) => {
      dispatch(channelsActions.updateChannel({ id: channel.id, changes: channel }));
    });

    return () => {
      socket.offAny();
      socket.disconnect();
    };
  }, [dispatch, socket, t]);

  const providedData = useMemo(() => {
    const sendMessage = (message, cb) => {
      socket.emit('newMessage', message, ({ status }) => {
        if (status === 'ok') {
          dispatch(messagesActions.setHasAdd(true));
          cb();
        } else {
          toast.error(t('toasts.netWorkError'));
        }
      });
    };

    const addChannel = (data, cb) => {
      socket.emit('newChannel', data, ({ status, data: { id } }) => {
        if (status === 'ok') {
          dispatch(channelsActions.setCurrentChannelId(id));
          dispatch(channelsActions.setHasAdd(true));
          toast.success(t('toasts.add'));
          cb();
        } else {
          toast.error(t('toasts.netWorkError'));
        }
      });
    };

    const removeChannel = (id, cb) => {
      socket.emit('removeChannel', { id }, ({ status }) => {
        if (status === 'ok') {
          cb();
          toast.success(t('toasts.remove'));
        } else {
          toast.error(t('toasts.netWorkError'));
        }
      });
    };

    const renameChannel = (data, cb) => {
      socket.emit('renameChannel', data, ({ status }) => {
        if (status === 'ok') {
          cb();
          toast.success(t('toasts.rename'));
        } else {
          toast.error(t('toasts.netWorkError'));
        }
      });
    };

    return {
      sendMessage,
      addChannel,
      removeChannel,
      renameChannel,
    };
  }, [dispatch, t, socket]);

  return (
    <ApiContext.Provider value={providedData}>
      {children}
    </ApiContext.Provider>
  );
};

export const useAPI = () => useContext(ApiContext);
