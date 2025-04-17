// socket.js
import { io } from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.139:3000'; // IP backend máy bạn

const socket = io(SOCKET_URL, {
    transports: ['websocket'], // Quan trọng trên React Native
    timeout: 10000,
    autoConnect: false, // để bạn chủ động connect
});

export default socket;