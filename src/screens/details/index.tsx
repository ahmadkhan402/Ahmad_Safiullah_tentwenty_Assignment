import React from 'react';
import {
    View,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from 'react-native';
import { styles } from './styles';
import CustomText from '../../components/customText/CustomText';
import { colors } from '../../utils/constants';
import { heightPixel } from '../../utils/helper';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/screenNames';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w500';

interface Props {
    route: any;
    navigation: any;
}

const MovieDetailsScreen: React.FC<Props> = ({ route }) => {
    const navigation = useNavigation<any>()
    const { movie } = route.params;
    const genreNames = movie?.genre_ids || [];

    return (
        <View style={styles.container}>
            {/* Header Image */}
            <ImageBackground
                source={{ uri: `${IMAGE_BASE_URL}${movie?.backdrop_path}` }}
                style={styles.posterBackground}
                resizeMode="cover"
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back-sharp" size={25} color="#fff" />

                    <CustomText fontSize={16} weight="medium" color={colors.white}>
                        Watch
                    </CustomText>
                </TouchableOpacity>

                <View style={styles.overlay}>
                    <CustomText fontSize={22} weight="semiBold" textAlignCenter>
                        {movie?.title}
                    </CustomText>
                    <CustomText
                        fontSize={14}
                        color={colors.white}
                        textAlignCenter
                        style={{ marginTop: 5 }}
                    >
                        In Theaters {movie?.release_date}
                    </CustomText>

                    <TouchableOpacity style={styles.ticketButton}>
                        <CustomText fontSize={14} weight="semiBold" color={colors.white}>
                            Get Tickets
                        </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.trailerButton} onPress={() => navigation.navigate(ScreenNames.MoviePlayer, { movieId: movie.id })}>
                        <CustomText fontSize={14} weight="medium" color={colors.white}>
                            ▶ Watch Trailer
                        </CustomText>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

            <View style={styles.section}>
                <CustomText fontSize={16} weight="semiBold" color={colors.black}>
                    Genres
                </CustomText>
                <View style={styles.genreContainer}>
                    {genreNames.map((genre: string, index: number) => (
                        <View
                            key={index}
                            style={[
                                styles.genreBadge,
                                { backgroundColor: genreColors[index % genreColors.length] },
                            ]}
                        >
                            <CustomText fontSize={12} weight="medium" color={colors.white}>
                                {genre}
                            </CustomText>
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.section}>
                <CustomText fontSize={16} weight="semiBold" color={colors.black}>
                    Overview
                </CustomText>
                <ScrollView
                    showsVerticalScrollIndicator={true}
                    style={styles.overviewScroll}
                >
                    <CustomText
                        fontSize={13}
                        color={'#777'}
                        style={{ lineHeight: 20, paddingBottom: heightPixel(20) }}
                    >
                        {movie?.overview ||
                            'No overview available for this movie.'}
                    </CustomText>
                </ScrollView>
            </View>
        </View>
    );
};


export default MovieDetailsScreen;

const genreColors = ['#00C1A2', '#D74B76', '#4C47E8', '#E5AF2C'];


