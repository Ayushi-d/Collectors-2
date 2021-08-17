const initialState = {
    data: [],
    error: {}
};

export default function allUsersPost(state = initialState, action) {
    switch (action.type) {
        case 'POST_SUCCESS':
            return {...state, data: action.payload};
        case 'POST_FAILED':
            return {...state, error: action.payload};
        default:
            return state;
    }
}
