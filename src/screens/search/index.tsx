import React, { useEffect, useState, useCallback } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    FlatList,
    ScrollView,
    ActivityIndicator,
    Dimensions,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import {
    fetchCategoryMovies,
    searchMovies,
    clearSearchResults,
} from '../../redux/slices/moviesSlice';
import { debounce } from 'lodash';
import CustomText from '../../components/customText/CustomText';
import MovieCard from '../../components/movieCard/movieCard';

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

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <TextInput
                placeholder="Search movies..."
                placeholderTextColor="#999"
                value={query}
                onChangeText={onChangeText}
                style={styles.search}
            />

            {loading && (
                <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 10 }} />
            )}

            {query.trim().length > 0 ? (
                <FlatList
                    horizontal
                    data={searchResults}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                />
            ) : (
                <ScrollView showsVerticalScrollIndicator={false}>
                    {Object.entries(categories).map(([genre, movies]) => (
                        <View key={genre} style={styles.categoryBlock}>
                            <CustomText fontSize={18} weight="semiBold" color="#fff">
                                {genre}
                            </CustomText>
                            <FlatList
                                horizontal
                                data={movies}
                                renderItem={({ item }) => <MovieCard movie={item} />}
                                keyExtractor={item => item.id.toString()}
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={5}
                                maxToRenderPerBatch={10}
                                windowSize={5}
                            />
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        paddingTop: 40,
        paddingHorizontal: 16,
    },
    search: {
        backgroundColor: '#111',
        borderRadius: 10,
        padding: 12,
        color: '#fff',
        marginBottom: 16,
    },
    categoryBlock: {
        marginBottom: 20,
    },
});
