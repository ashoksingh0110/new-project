const initialState = {
  users: {
    data: [], 
    loading: false,
    error: null, 
  },
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_USER_DATA_REQUEST':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'FETCH_USER_DATA_SUCCESS':
      return { 
        ...state, 
        users: action.payload, 
        loading: false,
        error: null,
      };
    case 'FETCH_USER_DATA_FAILURE':
      return { 
        ...state, 
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default UserReducer;
