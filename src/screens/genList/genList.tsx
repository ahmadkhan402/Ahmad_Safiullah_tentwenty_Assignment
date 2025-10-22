import React, { useEffect, useState } from 'react';
import { View, FlatList, ActivityIndicator, Dimensions } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchCategoryMovies } from '../../redux/slices/moviesSlice';
import GenresCard from '../../components/genreCard/genresCard';
import SafeAreaWrapper from '../../components/safeAreaWrapper/afeAreaWrapper';
import CustomText from '../../components/customText/CustomText';
import { colors } from '../../utils/constants';
import { heightPixel, widthPixel } from '../../utils/helper';
import { styles } from './styles';
import SearchInput from '../../components/searchInput/searchInput';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/screenNames';

const { width } = Dimensions.get('window');

const GenListScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>()
    const { categories, loading } = useAppSelector(state => state.movies);
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

    const loadingfun = () => {

        if (loading) {
            return (
                <SafeAreaWrapper style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
                    <ActivityIndicator size="large" color={colors.darkBackground} />
                    <CustomText fontSize={14} color={colors.darkBackground} style={{ marginTop: heightPixel(10) }}>
                        Loading genres...
                    </CustomText>
                </SafeAreaWrapper>
            );
        }
    }

    return (
        <SafeAreaWrapper style={styles.container}>
            <SearchInput
                isSearch={false}
            />
            {(loading)
                ? (
                    loadingfun()
                ) : (
                    <FlatList
                        data={genreList || []}
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

export default GenListScreen;
