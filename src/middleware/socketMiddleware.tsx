import io from 'socket.io-client';
let socket;
import * as notifyTypes from '../store/notifications/notify.types';
const SERVER_URL: string = 'http://192.168.50.106:9001';

interface SocketNotifyData {
    type: string;
    message: string;
}

const socketMiddleware = () => {
    console.log('Starting socket middleware') //!REMOVE
    return ({ dispatch }) => next => action => {
        // Handling socket connection
        if (action.type === 'CONNECT_SOCKET') {
            socket = io(SERVER_URL, {
                query: { unx_id: action.unx_id }
            });

            socket.on('notification', (data: SocketNotifyData) => {
                console.log('Received notification: ', data); //!REMOVE
                dispatch({
                    type: notifyTypes.SET_NOTIFY,
                    payload: {
                        type: data.type,
                        message: data.message,
                    }
                })
            });

            // Add other global event listeners here if needed
        }

        // Handling socket disconnection
        if (action.type === 'DISCONNECT_SOCKET') {
            if (socket) socket.disconnect();
        }

        // Handling emitting events
        if (action.type === 'EMIT_SOCKET_EVENT') {
            if (socket) socket.emit(action.event, action.data);
        }

        return next(action);
    };
};

export default socketMiddleware;
