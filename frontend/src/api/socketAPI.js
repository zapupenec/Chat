/* eslint-disable import/prefer-default-export */
import { io } from 'socket.io-client';

const { origin } = window.location;

const socket = io(origin, {
  autoConnect: false,
  reconnectionDelay: 7000,
  reconnectionDelayMax: 7000,
});

export const socketAPI = {
  connect: () => socket.connect(),
  disconnect: () => socket.disconnect(),
  unsubscribeAll: () => socket.offAny(),
  connectError: (cb) => {
    socket.on('connect_error', () => cb());
  },
  recieveMessage: (cb) => {
    socket.on('newMessage', (data) => cb(data));
  },
  recieveChannel: (cb) => {
    socket.on('newChannel', (data) => cb(data));
  },
  recieveRemoveChannel: (cb) => {
    socket.on('removeChannel', (data) => cb(data));
  },
  recieveRenameChannel: (cb) => {
    socket.on('renameChannel', (data) => cb(data));
  },
  sendNewMessage: (data, cb) => {
    socket.emit('newMessage', data, (response) => cb(response));
  },
  sendNewChannel: (data, cb) => {
    socket.emit('newChannel', data, (response) => cb(response));
  },
  sendRemoveChannel: (data, cb) => {
    socket.emit('removeChannel', data, (response) => cb(response));
  },
  sendRenameChannel: (data, cb) => {
    socket.emit('renameChannel', data, (response) => cb(response));
  },
};
