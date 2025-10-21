import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../../types/types';

const API_URL = 'https://api.themoviedb.org/3/movie/upcoming';
const API_KEY = 'c74475b817f3d09b98d78c3b2bc3ecbe';

interface MoviesState {
    movies: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    movies: [],
    loading: false,
    error: null,
};
export const fetchUpcomingMovies = createAsyncThunk<Movie[], void, { rejectValue: string }>(
    'movies/fetchUpcoming',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(API_URL, { params: { api_key: API_KEY } });

            const data = response.data.results as Movie[];
            await AsyncStorage.setItem('upcomingMovies', JSON.stringify(data));
            return data;
        } catch (error: any) {
            console.warn('API fetch failed, loading offline cache...');

            const cached = await AsyncStorage.getItem('upcomingMovies');
            if (cached) {
                return JSON.parse(cached) as Movie[];
            }

            return rejectWithValue(error.message || 'Failed to fetch movies');
        }
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchUpcomingMovies.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUpcomingMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.loading = false;
                state.movies = action.payload;
            })
            .addCase(fetchUpcomingMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to load movies';
            });
    },
});

export default moviesSlice.reducer;
