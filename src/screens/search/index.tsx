import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchCategoryMovies, searchMovies, clearSearchResults } from '../../redux/slices/moviesSlice';
import { debounce } from 'lodash';
import MovieCard from '../../components/movieCard/movieCard';
import GenreCard from '../../components/GenreCard/GenreCard';
import { styles } from './styles';
import SafeAreaWrapper from '../../components/safeAreaWrapper/afeAreaWrapper';


const { width } = Dimensions.get('window');

const SearchScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, searchResults, loading } = useAppSelector(state => state.movies);
    const [query, setQuery] = useState('');

    useEffect(() => {
        dispatch(fetchCategoryMovies());
    }, [dispatch]);

    const handleSearch = useCallback(
        debounce((text: string) => {
            if (text.trim().length > 0) dispatch(searchMovies(text));
            else dispatch(clearSearchResults());
        }, 400),
        []
    );

    const onChangeText = (text: string) => {
        setQuery(text);
        handleSearch(text);
    };

    const genreList = Object.entries(categories).map(([genre, movies]) => ({
        genre,
        thumbnail: movies[0]?.poster_path || '',
    }));

    return (
        <SafeAreaWrapper style={styles.container}>
            <TextInput
                placeholder="Search movies..."
                placeholderTextColor="#999"
                value={query}
                onChangeText={onChangeText}
                style={styles.search}
            />

            {loading && <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 10 }} />}

            {query.trim().length > 0 ? (
                <FlatList
                    key="searchResults"
                    data={searchResults}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <FlatList
                    data={genreList}
                    numColumns={2}
                    keyExtractor={item => item.genre}
                    renderItem={({ item }) => <GenreCard genre={item.genre} poster={item.thumbnail} />}
                    columnWrapperStyle={{ justifyContent: 'space-between', marginBottom: 16 }}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    initialNumToRender={10}
                    maxToRenderPerBatch={10}
                    windowSize={5}
                    removeClippedSubviews
                    updateCellsBatchingPeriod={100}
                />
            )}
        </SafeAreaWrapper>
    );
};

export default SearchScreen;


