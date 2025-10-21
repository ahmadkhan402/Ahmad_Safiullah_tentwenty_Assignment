import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import CustomText from "../../components/customText/CustomText";
import { colors } from "../../utils/constants";
import { heightPixel, widthPixel } from "../../utils/helper";
import { Ionicons } from "@expo/vector-icons";
import { images } from "../../assets/images";
import SessionSelector from "../../components/sessionSelector/sessionSelector";
import SafeAreaWrapper from "../../components/safeAreaWrapper/afeAreaWrapper";
import { styles } from "./styles";
import { dates, sessions } from "../../utils/data";



const TicketBookingScreen = ({ navigation, route }: any) => {
    const { movieTitle, releaseDate } = route.params;
    const [selectedDate, setSelectedDate] = useState<number>(1);
    const [selectedSession, setSelectedSession] = useState<number | string>('');

    return (
        <SafeAreaWrapper style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="chevron-back-sharp" size={25} color="black" />
                </TouchableOpacity>

                <View style={{ alignItems: "center", flex: 1 }}>
                    <CustomText fontSize={18} weight="semiBold" color={colors.black}>
                        {movieTitle || "Undefined"}
                    </CustomText>
                    <CustomText fontSize={12} color={colors.skyBlue}>
                        In Theaters {releaseDate || "December 22, 2021"}
                    </CustomText>
                </View>

                <View style={{ width: 20 }} />
            </View>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: heightPixel(100) }}
            >
                <View style={{ marginTop: heightPixel(20) }}>
                    <CustomText fontSize={16} weight="semiBold" color={colors.black}>
                        Date
                    </CustomText>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        style={{ marginTop: heightPixel(10) }}
                        contentContainerStyle={{ gap: widthPixel(10) }}
                    >
                        {dates && dates?.map((item) => (
                            <TouchableOpacity
                                key={item.id}
                                style={[
                                    styles.dateButton,
                                    selectedDate === item.id && styles.activeDateButton,
                                ]}
                                onPress={() => setSelectedDate(item.id)}
                            >
                                <CustomText
                                    color={
                                        selectedDate === item.id ? colors.white : colors.black
                                    }
                                    fontSize={14}
                                    weight="medium"
                                >
                                    {item.label}
                                </CustomText>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>

                <View style={{ marginTop: heightPixel(25) }}>
                    <CustomText fontSize={16} weight="semiBold" color={colors.black}>
                        Sessions
                    </CustomText>
                    <SessionSelector
                        sessions={sessions}
                        selectedSession={selectedSession}
                        setSelectedSession={setSelectedSession}
                    />
                </View>
            </ScrollView>

            <TouchableOpacity
                style={[
                    styles.selectButton,
                    { opacity: selectedSession ? 1 : 0.6 },
                ]}
                disabled={!selectedSession}
                onPress={() => {
                    navigation.navigate("SeatSelectionScreen", {
                        sessionId: selectedSession,
                        date: selectedDate,
                    });
                }}
            >
                <CustomText color={colors.white} fontSize={16} weight="semiBold">
                    Select Seats
                </CustomText>
            </TouchableOpacity>
        </SafeAreaWrapper>
    );
};

export default TicketBookingScreen;

