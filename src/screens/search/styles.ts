import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants";
import { heightPixel, widthPixel } from "../../utils/helper";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: colors.white,

    },
    search: {
        backgroundColor: '#111',
        borderRadius: 10,
        padding: 12,
        color: '#fff',
        marginHorizontal: 16,
        marginBottom: 16,
    },

    listContainer: {
        paddingTop: heightPixel(20),
        paddingBottom: heightPixel(10),
        paddingHorizontal: widthPixel(15),
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignContent: 'center'

    },
});