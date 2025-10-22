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
import { useAppSelector } from '../../redux/hooks/hooks';


interface Props {
    route: any;
    navigation: any;
}

const MovieDetailsScreen: React.FC<Props> = ({ route }) => {
    const { imageBaseUrl } = useAppSelector(state => state.config);
    const navigation = useNavigation<any>()
    const { movie } = route.params;
    const genreNames = movie?.genre_ids || [];
    const imgUrl = movie?.backdrop_path ? `${imageBaseUrl}${movie.backdrop_path}` : null;

    console.log("imada", !!movie?.backdrop_pathUrl);


    return (
        <View style={styles.container}>
            <ImageBackground
                source={imgUrl ? { uri: imgUrl } : undefined}
                style={styles.posterBackground}
                resizeMode="cover"
            >
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Ionicons name="chevron-back-sharp" size={25} color={movie?.backdrop_path ? "#fff" : "#000"} />

                    <CustomText fontSize={16} weight="medium" color={movie?.backdrop_path ? "#fff" : "#000"}>
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

                    <TouchableOpacity style={styles.ticketButton} onPress={() => navigation.navigate(ScreenNames.TicketBooking, {
                        movieTitle: movie.title,
                        releaseDate: movie.release_date,
                    })}>
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
                            <CustomText fontSize={12} weight="medium" textAlignCenter color={colors.white}>
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


