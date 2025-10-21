import React from 'react';
import { View, ImageBackground, StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../utils/constants';
import { heightPixel, widthPixel } from '../../utils/helper';
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


const styles = StyleSheet.create({
    card: {
        flex: 1,
        borderRadius: widthPixel(10),
        overflow: 'hidden',
        backgroundColor: colors.black,
        elevation: 3,
    },
    poster: {
        aspectRatio: 5 / 3,

        borderRadius: widthPixel(10),
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
