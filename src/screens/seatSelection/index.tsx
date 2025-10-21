import React, { useState } from "react";
import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import CustomText from "../../components/customText/CustomText";
import SafeAreaWrapper from "../../components/safeAreaWrapper/afeAreaWrapper";
import MovieHeader from "../../components/movieHeader/movieHeader";
import { colors } from "../../utils/constants";
import { heightPixel, widthPixel } from "../../utils/helper";
import { images } from "../../assets";

const SeatSelectionScreen = ({ navigation, route }: any) => {
    const { movieTitle, releaseDate, session } = route.params;

    const [selectedSeats, setSelectedSeats] = useState([" 4 / 3", " 1 / 3", " 2 / 4"]);
    const handleRemoveSeat = (seat: string) => {
        const updated = [...selectedSeats];
        const index = updated.indexOf(seat);
        if (index !== -1) {
            updated.splice(index, 1);
        }
        setSelectedSeats(updated);
    };
    ;

    return (
        <SafeAreaWrapper style={styles.container}>
            <MovieHeader
                movieTitle={movieTitle}
                releaseDate={releaseDate}
                onBackPress={() => navigation.goBack()}
            />

            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingHorizontal: widthPixel(16), flexGrow: 1, }}
            >
                <View style={styles.seatImageContainer}>
                    <Image
                        source={images.seatImg}
                        style={styles.seatImage}
                        resizeMode="contain"
                    />
                </View>

                <View style={styles.legendContainer}>
                    {[
                        { label: "Selected", color: colors.skyBlue },
                        { label: "Not Available", color: "#ccc" },
                        { label: "VIP ($150)", color: "#FFD700" },
                        { label: "Regular ($50)", color: "#90EE90" },
                    ].map((item, index) => (
                        <View key={index} style={styles.legendItem}>
                            <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                            <CustomText fontSize={13} color={'#8F8F8F'}>
                                {item.label}
                            </CustomText>
                        </View>
                    ))}
                </View>

                <View style={styles.selectedSeatsContainer}>
                    {selectedSeats.map((seat) => (
                        <View key={seat} style={styles.selectedSeatChip}>
                            <CustomText fontSize={12} weight="semiBold" color={colors.black}>
                                {seat} row
                            </CustomText>
                            <TouchableOpacity onPress={() => handleRemoveSeat(seat)}>
                                <Ionicons name="close" size={14} color={colors.black} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.bottomContainer}>
                <View style={styles.priceContainer}>
                    <CustomText fontSize={14} color={"#cccc"}>
                        Total
                    </CustomText>
                    <CustomText fontSize={18} weight="semiBold" color={colors.black}>
                        ${session?.price || 10}
                    </CustomText>
                </View>

                <TouchableOpacity
                    style={styles.payButton}
                    onPress={() => null}
                >
                    <CustomText color={colors.white} fontSize={16} textAlignCenter weight="semiBold">
                        Proceed to Pay
                    </CustomText>
                </TouchableOpacity>
            </View>
        </SafeAreaWrapper>
    );
};

export default SeatSelectionScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    seatImageContainer: {
        alignItems: "center",
        marginTop: heightPixel(40),
        backgroundColor: colors.background,
        justifyContent: 'center'
    },
    seatImage: {
        width: '100%',
        height: '45%',
    },
    legendContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        marginTop: heightPixel(30),
    },
    legendItem: {
        flexDirection: "row",
        alignItems: "center",
        width: "48%",
        marginVertical: heightPixel(8),
        gap: widthPixel(8),
    },
    legendDot: {
        width: widthPixel(18),
        height: widthPixel(18),
        borderRadius: 9,
    },
    selectedSeatsContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: widthPixel(10),
        marginTop: heightPixel(30),
    },
    selectedSeatChip: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.background,
        borderRadius: 20,
        paddingVertical: heightPixel(6),
        paddingHorizontal: widthPixel(12),
        gap: widthPixel(4),
    },
    bottomContainer: {
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        // justifyContent: "space-between",
        paddingHorizontal: widthPixel(20),
        paddingVertical: heightPixel(15),

    },
    priceContainer: {
        backgroundColor: colors.background,
        borderRadius: 10,
        padding: widthPixel(12),
        flexDirection: "row",
        gap: 8
    },
    payButton: {
        flex: 1,
        backgroundColor: colors.skyBlue,
        padding: widthPixel(12),
        borderRadius: 10,

    },
});
