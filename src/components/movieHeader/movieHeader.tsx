import React, { FC } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import CustomText from "../customText/CustomText";
import { colors } from "../../utils/constants";
import { widthPixel } from "../../utils/helper";

interface MovieHeaderProps {
    movieTitle?: string;
    releaseDate?: string;
    onBackPress: () => void;
}

const MovieHeader: FC<MovieHeaderProps> = ({ movieTitle, releaseDate, onBackPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity onPress={onBackPress}>
                <Ionicons name="chevron-back-sharp" size={25} color="black" />
            </TouchableOpacity>

            <View style={styles.centerContent}>
                <CustomText fontSize={18} weight="semiBold" color={colors.black}>
                    {movieTitle || "Undefined"}
                </CustomText>
                <CustomText fontSize={12} color={colors.skyBlue}>
                    In Theaters {releaseDate || "December 22, 2021"}
                </CustomText>
            </View>

            <View style={{ width: 20 }} />
        </View>
    );
};

export default MovieHeader;

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingVertical: 10,
        paddingHorizontal: widthPixel(16),

    },
    centerContent: {
        alignItems: "center",
        flex: 1,
    },
});
