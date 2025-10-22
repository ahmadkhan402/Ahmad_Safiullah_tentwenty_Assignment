import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, TouchableOpacity, ToastAndroid } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import YoutubePlayer, { PLAYER_STATES } from 'react-native-youtube-iframe';
import CustomText from '../../components/customText/CustomText';
import { colors } from '../../utils/constants';
import { TMDB_API_KEY } from '../../config';
import { styles } from './styles';

interface Props {
    route: any;
    navigation: any;
}

const MoviePlayerScreen: React.FC<Props> = ({ route, navigation }) => {
    const { movieId } = route.params;
    const [videoKey, setVideoKey] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchTrailer();
    }, []);

    const fetchTrailer = async () => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${TMDB_API_KEY}`
            );
            const data = await response.json();
            const trailer =
                data.results?.find(
                    (vid: any) =>
                        (vid.type === 'Trailer' || vid.type === 'Teaser') && vid.site === 'YouTube'
                ) || data.results?.[0];

            if (trailer) {
                setVideoKey(trailer.key);
            } else {
                alert('No trailer available');
                navigation.goBack();
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
            ToastAndroid.show('Something went wrong. Please try again.', ToastAndroid.SHORT);
            if (navigation.canGoBack()) {
                navigation.goBack();
            }
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color={colors.darkBackground || '#61C3F2'} />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.doneButton} onPress={() => navigation.goBack()}>
                <Ionicons name="close" size={28} color={colors.white} />
            </TouchableOpacity>

            {videoKey ? (
                <YoutubePlayer
                    height={250}
                    play={true}
                    videoId={videoKey}
                    onChangeState={(event: PLAYER_STATES) => {
                        console.log("eve,", event);

                        if (event === 'ended') {
                            navigation.goBack();
                        }
                    }}
                />
            ) : (
                <CustomText fontSize={16} color={colors.white}>
                    No Trailer Available
                </CustomText>
            )}
        </View>
    );
};

export default MoviePlayerScreen;
