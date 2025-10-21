import React, { memo, useEffect } from 'react';
import { View, FlatList, ImageBackground, ActivityIndicator, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchUpcomingMovies } from '../../redux/slices/moviesSlice';
import { Movie } from '../../types/types';
import { heightPixel, widthPixel } from '../../utils/helper';
import { colors } from '../../utils/constants';
import CustomText from '../../components/customText/CustomText';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './styles';
import { ScreenNames } from '../../route/screenNames';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'expo-image';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';


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
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: `${IMAGE_BASE_URL}${item.poster_path}` }}
        style={styles.poster}
        contentFit="cover"
        cachePolicy="memory"
        transition={300}
      />
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
    </View>
  );
});
const Watch: React.FC = () => {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets()
  const navigation = useNavigation<any>()
  const { movies, loading, error } = useAppSelector(state => state.movies);

  useEffect(() => {
    dispatch(fetchUpcomingMovies());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.darkBackground} />
      </View>
    );
  }

  if (error) {
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
    <View style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
      <Header navigation={navigation} />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={5}
        removeClippedSubviews
        updateCellsBatchingPeriod={100}
      />
    </View>
  );
};



export default React.memo(Watch);
