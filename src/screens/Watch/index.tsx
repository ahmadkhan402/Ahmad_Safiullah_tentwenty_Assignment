import React, { memo, useEffect } from 'react';
import { View, FlatList, ImageBackground, ActivityIndicator, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchCategoryMovies, fetchUpcomingMovies } from '../../redux/slices/moviesSlice';
import { Movie } from '../../types/types';
import { heightPixel, widthPixel } from '../../utils/helper';
import { colors } from '../../utils/constants';
import CustomText from '../../components/customText/CustomText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { ScreenNames } from '../../route/screenNames';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import SafeAreaWrapper from '../../components/safeAreaWrapper/afeAreaWrapper';




const Header = ({ navigation }: any) => (
  <View style={styles.headerContainer}>
    <CustomText
      fontSize={16}
      weight="semiBold"
      color={colors.black}
      style={styles.headerTitle}
    >
      Watch
    </CustomText>

    <TouchableOpacity
      style={styles.searchButton}
      activeOpacity={0.7}
      onPress={() => navigation?.navigate(ScreenNames.Search)}
    >
      <Ionicons name="search" size={24} color={colors.black} />
    </TouchableOpacity>
  </View>
);
const MovieCard = memo(({ item }: { item: Movie }) => {
  const { imageBaseUrl } = useAppSelector(state => state.config);
  const navigation = useNavigation<any>()

  return (
    <Pressable style={styles.card} onPress={() => {
      navigation.navigate(ScreenNames.MovieDetails, { movie: item });
    }}>
      <ImageBackground
        source={{ uri: `${imageBaseUrl}${item.poster_path}` }}
        style={styles.poster}
        imageStyle={styles.imageRadius}
      >
        <View style={styles.overlay}>
          <CustomText
            fontSize={14}
            color={colors.white}
            weight="semiBold"
            numberOfLines={1}
            style={styles.title}
          >
            {item.title}
          </CustomText>
        </View>
      </ImageBackground>
    </Pressable>
  );
});
const Watch: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { movies, loading, error } = useAppSelector(state => state.movies);
  const { imageBaseUrl } = useAppSelector(state => state.config);
  useEffect(() => {
    dispatch(fetchUpcomingMovies());
    dispatch(fetchCategoryMovies());
  }, [dispatch]);

  const hasData = movies.length > 0;

  if (loading && !hasData) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.darkBackground} />
      </View>
    );
  }

  if (error && !hasData) {
    return (
      <View style={styles.center}>
        <CustomText color={colors.red} fontSize={16}>
          {error}
        </CustomText>
      </View>
    );
  }

  const renderItem = ({ item }: { item: Movie }) => <MovieCard item={item} />;

  return (
    <SafeAreaWrapper style={styles.container}>
      <Header navigation={navigation} />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => (item?.id?.toString() ?? Math?.random().toString())}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        updateCellsBatchingPeriod={100}
      />
    </SafeAreaWrapper>
  );
};



export default React.memo(Watch);
