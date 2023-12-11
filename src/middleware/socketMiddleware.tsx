import io from 'socket.io-client';
import * as notifyTypes from '../store/notifications/notify.types';

const {
    VITE_REACT_APP_API_ENDPOINT,
    VITE_REACT_APP_PROD_SERVER_URL,
} = import.meta.env;

const SERVER_URL: string = import.meta.env.VITE_REACT_APP_LOCAL_MODE ? VITE_REACT_APP_API_ENDPOINT : VITE_REACT_APP_PROD_SERVER_URL;

interface SocketNotifyData {
    type: string;
    message: string;
}

let socket;

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

            socket.on('data_notification', (data: {active: boolean, message: string}) => {
                dispatch({
                    type: notifyTypes.SET_USER_DATA_NOTIFY,
                    payload: {
                        active: data.active,
                        message: data.message
                    }
                })
            })

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
