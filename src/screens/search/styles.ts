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
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
        flexGrow: 1
    },
    txt: {
        paddingBottom: 4
    },
    searchResultHeader: {
        gap: widthPixel(5),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#fff',
        borderRadius: 10,
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