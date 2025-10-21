import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { TMDB_API_KEY } from '../../config';
import CustomText from '../../components/customText/CustomText';
import { colors } from '../../utils/constants';


interface Props {
    route: any;
    navigation: any;
}



const TrailerPlayerScreen: React.FC<Props> = ({ route, navigation }) => {
    const { movieId } = route.params;
    const videoRef = useRef<Video>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);
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
            const trailer = data.results?.find(
                (vid: any) => vid.type === 'Trailer' && vid.site === 'YouTube'
            );

            if (trailer) {
                setVideoUrl(`https://www.youtube.com/watch?v=${trailer.key}`);
            } else {
                alert('Trailer not available');
                navigation.goBack();
            }
        } catch (err) {
            console.error(err);
            navigation.goBack();
        } finally {
            setLoading(false);
        }
    };

    const handlePlaybackStatusUpdate = (status: any) => {
        if (status.didJustFinish) {
            navigation.goBack();
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
            <TouchableOpacity
                style={styles.doneButton}
                onPress={() => navigation.goBack()}
            >
                <Ionicons name="close" size={28} color={colors.white} />
                <CustomText fontSize={16} weight="medium" color={colors.white}>
                    Done
                </CustomText>
            </TouchableOpacity>

            {/* Video Player */}
            {videoUrl && (
                <Video
                    ref={videoRef}
                    style={styles.video}
                    source={{
                        uri: `https://drive.google.com/uc?export=download&id=${videoUrl}`,
                    }}
                    shouldPlay
                    resizeMode={ResizeMode.CONTAIN}
                    useNativeControls
                    onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                />
            )}
        </View>
    );
};

export default TrailerPlayerScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    video: {
        flex: 1,
    },
    doneButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
});
