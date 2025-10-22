import React from 'react';
import {
    View,
    Image,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import CustomText from '../customText/CustomText';
import { Movie } from '../../types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/constants';
import { widthPixel, heightPixel, getGenreNames } from '../../utils/helper';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/screenNames';
import { useAppSelector } from '../../redux/hooks/hooks';
const { width } = Dimensions.get('window');

interface Props {
    movie: Movie;
    onPressMenu?: () => void;
}

const CARD_HEIGHT = heightPixel(120);
const POSTER_WIDTH = widthPixel(80);

const MovieCard: React.FC<Props> = ({ movie, onPressMenu }) => {
    const { imageBaseUrl } = useAppSelector(state => state.config);
    const genreNames = movie.genre_ids ? getGenreNames(movie.genre_ids) : [];
    const navigation = useNavigation<any>()
    return (
        <Pressable style={styles.card} hitSlop={15} onPress={() => {
            navigation.navigate(ScreenNames.MovieDetails, { movie });
        }}>
            {/* Poster */}
            <Image
                source={{ uri: movie.poster_path ? `${imageBaseUrl}${movie.poster_path}` : '' }}
                style={styles.poster}
                resizeMode="cover"
            />

            <View style={styles.infoContainer}>
                <CustomText
                    fontSize={16}
                    weight="semiBold"
                    color={colors.black}
                    numberOfLines={1}
                >
                    {movie?.title ?? movie.original_title}
                </CustomText>


                <CustomText
                    fontSize={12}
                    weight="regular"
                    color="#DBDBDF"
                    style={{ marginBottom: 2 }}
                >
                    {genreNames[0]}
                </CustomText>
                {/* <CustomText fontSize={12} weight="medium" color="#aaa">
                    {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
                </CustomText> */}
            </View>

            <View style={styles.bottomRow}>

                <TouchableOpacity activeOpacity={0.7} onPress={onPressMenu}>
                    <MaterialIcons name="more-horiz" size={24} color="#61C3F2" />
                </TouchableOpacity>
            </View>
        </Pressable>
    );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        // backgroundColor: '#111',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 12,
        height: CARD_HEIGHT,
    },
    poster: {
        width: widthPixel(130),
        height: '100%',
        borderRadius: 10
    },
    infoContainer: {
        flex: 1,
        padding: 10,
        gap: heightPixel(4)
        // justifyContent: 'space-between',
    },
    genreContainer: {
        marginTop: 4,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
