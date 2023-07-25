export const FetchUserData = () => {
    return async (dispatch) => {
      try {
        const response = await fetch('http://localhost:8000/user');
        const data = await response.json();
        dispatch({ 
            type: 'FETCH_USER_DATA_SUCCESS', 
            payload: data 
          });
      } 
      catch (error) {
        dispatch({ 
            type: 'FETCH_USER_DATA_FAILURE', 
            payload: error.message });
      }
    };
  };
  