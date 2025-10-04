import { createSlice } from "@reduxjs/toolkit"

interface OnboardingState{
    hasSeenOnboarding:boolean
}

const initialState:OnboardingState={
    hasSeenOnboarding:false
}

const onboardingSlice = createSlice({
    name:'onboarding',
    initialState,
    reducers:{
        setHasSeenOnboarding(state){
            state.hasSeenOnboarding=true;
        }
    }
})

export const {setHasSeenOnboarding} = onboardingSlice.actions;

export default onboardingSlice.reducer;