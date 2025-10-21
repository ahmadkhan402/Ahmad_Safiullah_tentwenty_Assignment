import { StyleSheet } from "react-native";
import { widthPixel, heightPixel } from "../../utils/helper";
import { colors } from "../../utils/constants";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: widthPixel(16),
        paddingTop: heightPixel(40),
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
    },
    dateButton: {
        backgroundColor: "#EAEAEA",
        borderRadius: 12,
        paddingVertical: heightPixel(10),
        paddingHorizontal: widthPixel(16),
    },
    activeDateButton: {
        backgroundColor: colors.skyBlue,
    },
    selectButton: {
        backgroundColor: colors.skyBlue,
        borderRadius: 10,
        paddingVertical: heightPixel(14),
        alignItems: "center",
        justifyContent: "center",
        // position: "absolute",
        // bottom: heightPixel(20),
        // left: widthPixel(16),
        // right: widthPixel(16),
    },
});
