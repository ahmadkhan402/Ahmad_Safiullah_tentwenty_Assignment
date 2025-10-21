import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/constants';
import { heightPixel } from '../../utils/helper';
import CustomText from '../customText/CustomText';
import { IMAGE_BASE_URL } from '../../config';


const { width } = Dimensions.get('window');

interface Props {
    genre: string;
    poster: string;
}

const GenreCard: React.FC<Props> = ({ genre, poster }) => {
    return (
        <View style={styles.card}>
            <ImageBackground
                source={{ uri: `${IMAGE_BASE_URL}${poster}` }}
                style={styles.poster}
                imageStyle={styles.imageRadius}
            >
                <View style={styles.overlay}>
                    <CustomText fontSize={16} weight="semiBold" color={colors.white} numberOfLines={1}>
                        {genre}
                    </CustomText>
                </View>
            </ImageBackground>
        </View>
    );
};

export default React.memo(GenreCard);

const CARD_WIDTH = (width - 48) / 2;

const styles = StyleSheet.create({
    card: {
        width: CARD_WIDTH,
        height: heightPixel(180),
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
        backgroundColor: 'rgba(0,0,0,0.4)',
        padding: 8,
        justifyContent: 'flex-end',
    },
});
