import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Movie } from '../../types/types';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../../config';
import { categoriesList } from '../../utils/data';

interface MoviesState {
    movies: Movie[];
    categories: Record<string, Movie[]>;
    searchResults: Movie[];
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    movies: [],
    categories: {},
    searchResults: [],
    loading: false,
    error: null,
};

export const loadCachedMovies = createAsyncThunk<
    { movies: Movie[]; categories: Record<string, Movie[]> },
    void,
    { rejectValue: string }
>('movies/loadCached', async (_, { rejectWithValue }) => {
    try {
        const cachedMovies = await AsyncStorage.getItem('upcomingMovies');
        const cachedCategories = await AsyncStorage.getItem('categoryMovies');

        return {
            movies: cachedMovies ? JSON.parse(cachedMovies) : [],
            categories: cachedCategories ? JSON.parse(cachedCategories) : {},
        };
    } catch (error: any) {
        return rejectWithValue(error.message || 'Failed to load cached movies');
    }
});

export const fetchUpcomingMovies = createAsyncThunk<Movie[], void, { rejectValue: string }>(
    'movies/fetchUpcoming',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/movie/upcoming`, {
                params: { api_key: TMDB_API_KEY },
            });

            const data = response.data.results as Movie[];
            await AsyncStorage.setItem('upcomingMovies', JSON.stringify(data));
            return data;
        } catch (error: any) {
            console.warn('API fetch failed, loading offline cache...');
            const cached = await AsyncStorage.getItem('upcomingMovies');
            if (cached) return JSON.parse(cached) as Movie[];
            return rejectWithValue(error.message || 'Failed to fetch movies');
        }
    }
);

export const fetchCategoryMovies = createAsyncThunk<
    Record<string, Movie[]>,
    void,
    { rejectValue: string }
>('movies/fetchCategories', async (_, { rejectWithValue }) => {
    try {
        const results: Record<string, Movie[]> = {};

        for (const cat of categoriesList) {
            const response = await axios.get(`${TMDB_BASE_URL}/discover/movie`, {
                params: { api_key: TMDB_API_KEY, with_genres: cat.id },
            });
            results[cat.name] = response.data.results;
        }

        await AsyncStorage.setItem('categoryMovies', JSON.stringify(results));
        return results;
    } catch (error: any) {
        console.warn('Category fetch failed, loading offline cache...');
        const cached = await AsyncStorage.getItem('categoryMovies');
        if (cached) return JSON.parse(cached) as Record<string, Movie[]>;
        return rejectWithValue(error.message || 'Failed to fetch category movies');
    }
});

export const searchMovies = createAsyncThunk<Movie[], string, { rejectValue: string }>(
    'movies/search',
    async (query, { rejectWithValue }) => {
        try {
            const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
                params: { api_key: TMDB_API_KEY, query },
            });
            return response.data.results as Movie[];
        } catch (error: any) {
            return rejectWithValue(error.message || 'Search failed');
        }
    }
);

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        clearSearchResults: state => {
            state.searchResults = [];
        },
        clearMovies: state => {
            state.movies = [];
            state.categories = {};
            state.searchResults = [];
            state.error = null;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(loadCachedMovies.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                loadCachedMovies.fulfilled,
                (state, action: PayloadAction<{ movies: Movie[]; categories: Record<string, Movie[]> }>) => {
                    state.loading = false;
                    state.movies = action.payload.movies;
                    state.categories = action.payload.categories;
                }
            )
            .addCase(loadCachedMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to load cached movies';
            })

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
            })

            // Categories
            .addCase(fetchCategoryMovies.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCategoryMovies.fulfilled, (state, action: PayloadAction<Record<string, Movie[]>>) => {
                state.loading = false;
                state.categories = action.payload;
            })
            .addCase(fetchCategoryMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to load categories';
            })

            // Search
            .addCase(searchMovies.pending, state => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
                state.loading = false;
                state.searchResults = action.payload;
            })
            .addCase(searchMovies.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? 'Failed to search movies';
            });
    },
});

export const { clearSearchResults, clearMovies } = moviesSlice.actions;
export default moviesSlice.reducer;
