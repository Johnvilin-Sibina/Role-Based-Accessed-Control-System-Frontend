import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  loading: false,
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    signInStart: (state) => {
      (state.token = ""), (state.loading = true);
    },
    signInSuccess: (state, action) => {
      (state.loading = false), (state.token = action.payload);
    },
    signInFailure: (state, action) => {
      state.loading = false;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } =
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