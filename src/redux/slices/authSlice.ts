import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
    isLoggedIn:boolean,
    user:null|{email:string;userName:string},
    token:any|null
}

const initialState:AuthState = {
  isLoggedIn:false,
  user:null,
  token:null
};

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{
        login(state,action:PayloadAction<{user:any;token:any}>){
            state.isLoggedIn=true;
            state.user=action.payload.user;
            state.token=action.payload.token;
            // console.log("values : ",JSON.stringify(state.user))
        },
        signup(state,action:PayloadAction<{user:any;token:any}>){
            state.isLoggedIn=true;
           state.user=action.payload.user;
           state.token=action.payload.token;
        },
        logout(state){
            state.isLoggedIn=false;
            state.user=null;
            state.token=null;
        }
    }

});

export const {login, signup,logout} = authSlice.actions;
export default authSlice.reducer;