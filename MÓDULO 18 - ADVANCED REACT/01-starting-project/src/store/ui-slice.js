import {createSlice} from '@reduxjs/toolkit';

const uiSlice = createSlice({
    name: 'ui',
    initialState: {cartVisible: true},
    reducers: {
        toggle(state) {
            state.cartVisible = !state.cartVisible;
        }
    }
});

const uiReducer = uiSlice.reducer;

export const uiActions = uiSlice.actions;

export default uiReducer;