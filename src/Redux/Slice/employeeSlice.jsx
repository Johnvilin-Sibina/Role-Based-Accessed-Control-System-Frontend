import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  Id:null
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.currentUser =  action.payload
    },
    signInFailure: (state, action) => {
      state.loading = false;
    },
    assignRole:(state,action)=>{
      state.Id = action.payload
    },
  },
});

export const { signInStart, signInSuccess, signInFailure, assignRole } =
  employeeSlice.actions;

export default employeeSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//     token:null,
//     loading:false
// }

// const employeeSlice = createSlice({
//     name:'employee',
//     initialState,
//     reducers:{
//         signInStart:(state)=>{
//             state.loading = true,
//             state.token = null
//         },
//         signInSuccess:(state,action)=>{
//             state.loading = false
//             state.token = action.payload
//         },
//         signInFailure:(state,action)=>{
//             state.token = action.payload
//         }
//     }
// })

// export const {signInStart,signInSuccess,signInFailure} = employeeSlice.actions

// export default employeeSlice.reducer
