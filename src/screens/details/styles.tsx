import { Dimensions, StyleSheet } from "react-native";
import { colors } from "../../utils/constants";
import { heightPixel, widthPixel } from "../../utils/helper";
const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    posterBackground: {
        width: width,
        height: heightPixel(350),
        justifyContent: 'flex-end',
    },
    overviewScroll: {
        maxHeight: heightPixel(200),
        marginTop: heightPixel(10),
    },
    overlay: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingVertical: heightPixel(20),
        alignItems: 'center',
    },
    backButton: {
        position: 'absolute',
        top: heightPixel(40),
        left: widthPixel(20),
        zIndex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8
    },
    ticketButton: {
        marginTop: heightPixel(12),
        backgroundColor: '#61C3F2',
        paddingHorizontal: widthPixel(60),
        paddingVertical: heightPixel(10),
        borderRadius: 10,
    },
    trailerButton: {
        marginTop: heightPixel(10),
        borderColor: '#61C3F2',
        borderWidth: 1,
        paddingHorizontal: widthPixel(50),
        paddingVertical: heightPixel(10),
        borderRadius: 10,
    },
    section: {
        marginHorizontal: widthPixel(20),
        marginTop: heightPixel(20),
    },
    genreContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: heightPixel(10),
        gap: widthPixel(10),
    },
    genreBadge: {
        borderRadius: 20,
        paddingVertical: heightPixel(4),
        paddingHorizontal: widthPixel(14),
    },
});