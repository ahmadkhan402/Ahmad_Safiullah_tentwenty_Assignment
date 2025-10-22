import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ConfigState {
    imageBaseUrl: string;
}

const initialState: ConfigState = {
    imageBaseUrl: 'https://image.tmdb.org/t/p/w500',
};

const configSlice = createSlice({
    name: 'config',
    initialState,
    reducers: {
        setImageBaseUrl: (state, action: PayloadAction<string>) => {
            state.imageBaseUrl = action.payload;
        },
    },
});

export const { setImageBaseUrl } = configSlice.actions;
export default configSlice.reducer;
