import { io } from 'socket.io-client';

const { origin } = window.location;

export const socket = io(origin, {
  autoConnect: false,
  reconnectionDelay: 7000,
  reconnectionDelayMax: 7000,
});
