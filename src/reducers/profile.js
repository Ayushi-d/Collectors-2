const initialState = {
  user: {},
};

export default function userProfile(state = initialState, action) {
  switch (action.type) {
    case 'USER_SUCCESS':
      return {...state, user: action.payload};
    default:
      return state;
  }
}
