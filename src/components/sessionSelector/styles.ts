import { StyleSheet } from "react-native";
import { colors } from "../../utils/constants";
import { heightPixel, widthPixel } from "../../utils/helper";

export const styles = StyleSheet.create({
    sessionCard: {
        width: widthPixel(180),
        backgroundColor: "#fff",
        borderRadius: widthPixel(10),
        paddingVertical: heightPixel(10),
        paddingHorizontal: widthPixel(12),
        borderWidth: 1,
        borderColor: "#E0E0E0",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    activeSessionCard: {
        borderColor: colors.skyBlue || "#4CA6EA",
        borderWidth: 0.8,
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    seatImage: {
        width: "100%",
        height: heightPixel(120),
        borderRadius: widthPixel(8),
    },
});
