import React from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import CustomText from '../customText/CustomText';
import { Movie } from '../../types/types';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../utils/constants';
import { heightPixel } from '../../utils/helper';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';
const { width } = Dimensions.get('window');

interface Props {
    movie: Movie;
    onPressMenu?: () => void;
}

const CARD_WIDTH = (width - 48) / 2;

const MovieCard: React.FC<Props> = ({ movie, onPressMenu }) => {
    return (
        <View style={styles.card}>
            <ImageBackground
                source={{ uri: movie.poster_path ? `${IMAGE_BASE_URL}${movie.poster_path}` : '' }}
                style={styles.poster}
                imageStyle={styles.imageRadius}
            />

            <View style={styles.infoContainer}>
                <CustomText
                    fontSize={16}
                    weight="semiBold"
                    color={colors.white}
                    numberOfLines={1}
                >
                    {movie.title ?? 'Untitled'}
                </CustomText>

                {movie.genre_names && movie.genre_names.length > 0 && (
                    <View style={styles.genreContainer}>
                        {movie.genre_names.map((genre: any, index: number) => (
                            <CustomText
                                key={index}
                                fontSize={12}
                                weight="regular"
                                color="#aaa"
                                style={{ marginBottom: 4 }}
                            >
                                {genre}
                            </CustomText>
                        ))}
                    </View>
                )}

                <View style={styles.bottomRow}>
                    <CustomText fontSize={12} weight="medium" color="#aaa">
                        {movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'}
                    </CustomText>
                    <TouchableOpacity activeOpacity={0.7} onPress={onPressMenu}>
                        <MaterialIcons name="more-vert" size={22} color={colors.white} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        backgroundColor: '#111',
        borderRadius: 12,
        overflow: 'hidden',
        marginBottom: 16,
    },
    poster: {
        width: '100%',
        height: heightPixel(180),
        justifyContent: 'flex-end',
    },
    imageRadius: {
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    infoContainer: {
        padding: 10,
    },
    genreContainer: {
        marginTop: 4,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
});
