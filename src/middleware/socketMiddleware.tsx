import io from 'socket.io-client';
let socket;
const SERVER_URL: string = 'http://192.168.50.103:9001';

const socketMiddleware = () => {
    console.log('Starting socket middleware') //!REMOVE
    return ({ dispatch }) => next => action => {
        // Handling socket connection
        if (action.type === 'CONNECT_SOCKET') {
            socket = io(SERVER_URL, {
                query: { unx_id: action.unx_id }
            });

            socket.on('notification', (data) => {
                dispatch({ type: 'RECEIVE_NOTIFICATION', data });
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
