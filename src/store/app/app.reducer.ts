

export function appLoading(state: boolean = true, action: {type: string, payload: boolean}) {
    switch(action.type) {
        case 'SET_APP_LOADING':
            return action.payload;
        default:
            return state;
    }
}