import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { Movie } from '../../types/types';
import { colors } from '../../utils/constants';
import { widthPixel, heightPixel } from '../../utils/helper';
import CustomText from '../customText/CustomText';
import { IMAGE_BASE_URL } from '../../config';

const { width } = Dimensions.get('window');

interface Props {
    movie: Movie;
}

const MovieCard: React.FC<Props> = ({ movie }) => {
    return (
        <View style={styles.card}>
            <ImageBackground
                source={{ uri: `${IMAGE_BASE_URL}${movie.poster_path}` }}
                style={styles.poster}
                imageStyle={styles.imageRadius}
            >
                <View style={styles.overlay}>
                    <CustomText
                        fontSize={14}
                        weight="semiBold"
                        color={colors.white}
                        numberOfLines={1}
                        style={{ paddingHorizontal: widthPixel(10) }}
                    >
                        {movie.title}
                    </CustomText>
                </View>
            </ImageBackground>
        </View>
    );
};

export default React.memo(MovieCard);

const styles = StyleSheet.create({
    card: {
        width: width * 0.4,
        height: heightPixel(220),
        marginRight: 12,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#111',
    },
    poster: {
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    imageRadius: {
        borderRadius: 10,
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.3)',
        paddingVertical: heightPixel(8),
    },
});
