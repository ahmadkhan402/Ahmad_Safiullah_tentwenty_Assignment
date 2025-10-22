import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Dimensions, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchCategoryMovies } from '../../redux/slices/moviesSlice';
import MovieCard from '../../components/movieCard/movieCard';
import { styles } from './styles';
import SafeAreaWrapper from '../../components/safeAreaWrapper/afeAreaWrapper';
import SearchInput from '../../components/searchInput/searchInput';
import GenresCard from '../../components/genreCard/genresCard';
import { heightPixel, widthPixel } from '../../utils/helper';
import CustomText from '../../components/customText/CustomText';
import { colors } from '../../utils/constants';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const SearchScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { categories, searchResults, loading } = useAppSelector(state => state.movies);
    const [query, setQuery] = useState('');
    const [searchActive, setSearchActive] = useState(false);
    const [onSearchPress, setOnSearchPress] = useState(false);
    const [isGenreListReady, setIsGenreListReady] = useState(false);

    useEffect(() => {
        const loadCategories = async () => {
            await dispatch(fetchCategoryMovies());
            setIsGenreListReady(true);
        };
        loadCategories();
    }, [dispatch]);

    const genreList = Object.entries(categories).map(([genre, movies]) => ({
        genre,
        thumbnail: movies?.[0]?.poster_path || '',
    }));

    const loadingFuntion = () => {

        if (loading || !isGenreListReady) {
            return (
                <SafeAreaWrapper style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={colors.darkBackground} />
                    <CustomText
                        fontSize={14}
                        color={colors.darkBackground}
                        style={{ marginTop: heightPixel(10) }}
                    >
                        Loading movies...
                    </CustomText>
                </SafeAreaWrapper>
            );
        }
    }

    return (
        <SafeAreaWrapper style={styles.container}>
            {onSearchPress ? (
                <View style={styles.searchResultHeader}>
                    <TouchableOpacity onPress={() => setOnSearchPress(false)}>
                        <Ionicons name="chevron-back-sharp" size={25} color="black" />
                    </TouchableOpacity>

                    <CustomText
                        fontSize={16}
                        weight="semiBold"
                        color={colors.black}
                        style={styles.txt}
                        textAlignCenter
                    >
                        {searchResults.length} result{searchResults.length !== 1 ? 's' : ''} found
                    </CustomText>
                </View>
            ) : (
                <SearchInput
                    query={query}
                    setQuery={setQuery}
                    onSearchActive={setSearchActive}
                    onSearchPress={setOnSearchPress}
                />
            )}
            {loadingFuntion()}
            {searchActive ? (
                <FlatList
                    key="searchResults"
                    data={searchResults}
                    renderItem={({ item }) => <MovieCard movie={item} />}
                    keyExtractor={item => (item?.id?.toString() ?? Math?.random().toString())}

                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    ListEmptyComponent={() => (
                        <View style={styles.emptyContainer}>
                            <CustomText fontSize={16} weight="medium" color="#999" textAlignCenter>
                                No search results available
                            </CustomText>
                        </View>
                    )}
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
                    data={(!loading && isGenreListReady) ? genreList : []}
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
                    ListEmptyComponent={() => (
                        !loading && isGenreListReady && <View style={styles.emptyContainer}>
                            <CustomText fontSize={16} weight="medium" color="#999" textAlignCenter>
                                No genreList available
                            </CustomText>
                        </View>
                    )}
                />
            )}
        </SafeAreaWrapper>
    );
};

export default SearchScreen;
