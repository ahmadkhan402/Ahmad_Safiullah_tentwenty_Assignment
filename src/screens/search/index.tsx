import React, { useEffect, useState, useCallback } from 'react';
import { View, TextInput, StyleSheet, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchCategoryMovies, searchMovies, clearSearchResults } from '../../redux/slices/moviesSlice';
import { debounce } from 'lodash';
import MovieCard from '../../components/movieCard/movieCard';
import { styles } from './styles';
import SafeAreaWrapper from '../../components/safeAreaWrapper/afeAreaWrapper';
import SearchInput from '../../components/searchInput/searchInput';
import GenresCard from '../../components/genreCard/genresCard';
import { heightPixel, widthPixel } from '../../utils/helper';
import CustomText from '../../components/customText/CustomText';
import { colors } from '../../utils/constants';


const { width } = Dimensions.get('window');

const SearchScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, searchResults, loading } = useAppSelector(state => state.movies);
    const [query, setQuery] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    useEffect(() => {
        dispatch(fetchCategoryMovies());
    }, [dispatch]);


    const genreList = Object.entries(categories).map(([genre, movies]) => ({
        genre,
        thumbnail: movies[0]?.poster_path || '',
    }));

    return (
        <SafeAreaWrapper style={styles.container}>
            <SearchInput
                query={query}
                setQuery={setQuery}
                onSearchActive={setSearchActive}
            />

            {loading && <ActivityIndicator size="large" color="#fff" style={{ marginVertical: 10 }} />}

            {searchActive ? (
                <FlatList
                    key="searchResults"
                    data={searchResults}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListHeaderComponent={() => (
                        <View style={{ borderBottomWidth: 0.2, borderColor: "#0000001", marginBottom: heightPixel(20) }}>
                            <CustomText
                                fontSize={12}
                                weight="semiBold"
                                color={colors.black}
                                style={{ marginBottom: heightPixel(10) }}
                            >
                                Top Results
                            </CustomText>
                        </View>
                    )}
                />
            ) : (
                <FlatList
                    data={genreList}
                    numColumns={2}
                    keyExtractor={item => item.genre}
                    renderItem={({ item }) => <GenresCard genre={item.genre} poster={item.thumbnail} />}
                    columnWrapperStyle={{ gap: widthPixel(8), marginVertical: heightPixel(4) }}
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


