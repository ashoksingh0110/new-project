import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//===========================================Create actions=============================
//get ALL Users
export const getAllUsers = createAsyncThunk('getAllUsers', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('http://localhost:8000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
});
// //get Single User
export const getSingleUser = createAsyncThunk('getSingleUser', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:8000/user/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
});
//delete user
export const deleteUser = createAsyncThunk('deleteUser', async (id, { rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:8000/user/${id}`, {
      method: 'DELETE',
    });
    const result = await response.json();
    alert(result.message)

    try {
    const response = await fetch('http://localhost:8000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    return result;
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
});
//add user
export const addUser = createAsyncThunk('addUser', async (data, { rejectWithValue }) => {
  try {
    const response = await fetch("http://localhost:8000/user", {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    // alert(result.message)
    // console.log(result);
    return result
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
})
//update user
export const updateUser = createAsyncThunk('updateUser', async (id,data,{ rejectWithValue }) => {
  try {
    const response = await fetch(`http://localhost:8000/user/${id}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
    const result = await response.json()
    alert(result.message)
    console.log("data",data)
    console.log("id",id)
    return result
  }
  catch (error) {
    return rejectWithValue(error.message);
  }
})

const userSlice = createSlice({
  name: 'userDetail',
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [addUser.pending]: (state) => {
      state.loading = true;
    },
    [addUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users.push(action.payload);
    },
    [addUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error || action.payload;
    },
    
    [updateUser.pending]: (state) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      const updatedUser = action.payload;
      console.log(updatedUser)

      // state.users.push(updatedUser)
      // state.users = state.users.map((user) =>
      //   user._id === updatedUser._id ? updatedUser : user
      // );
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    


    [getAllUsers.pending]: (state) => {
      state.loading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.data
      // console.log(action.payload.data)
    },
    [getAllUsers.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error || action.payload;
    },
    
    [getSingleUser.pending]: (state) => {
      state.loading = true;
    },
    [getSingleUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload
      // console.log(action.payload.data)
    },
    [getSingleUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error || action.payload;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.users = action.payload.data
      // console.log(action.payload.data)
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.error || action.payload;
    },
  },
});

export default userSlice.reducer;
