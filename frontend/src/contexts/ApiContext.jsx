/* eslint-disable import/prefer-default-export */
import {
  createContext, useContext, useEffect, useMemo,
} from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import axios from 'axios';

import { fetchData } from '../store/slices/initSlice';
import { channelsActions, messagesActions } from '../store/slices';
import { routes } from '../routes';

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
    const promisify = (func) => (...args) => new Promise((resolve, reject) => {
      func(...args, ({ data, status }) => {
        if (status === 'ok') {
          resolve(data);
        }
        reject();
      });
    });

    return {
      sendMessage: promisify((...args) => socket.emit('newMessage', ...args)),
      addChannel: promisify((...args) => socket.emit('newChannel', ...args)),
      removeChannel: promisify((...args) => socket.emit('removeChannel', ...args)),
      renameChannel: promisify((...args) => socket.emit('renameChannel', ...args)),
      fetchData: (authHeader) => dispatch(fetchData(authHeader)).unwrap(),
      logIn: (userData) => axios.post(routes.api.login, userData),
      signUp: (userData) => axios.post(routes.api.signup, userData),
    };
  }, [dispatch, socket]);

  return (
    <ApiContext.Provider value={providedData}>
      {children}
    </ApiContext.Provider>
  );
};

export const useAPI = () => useContext(ApiContext);
