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
import MovieHeader from "../../components/movieHeader/movieHeader";
import { ScreenNames } from "../../route/screenNames";



const TicketBookingScreen = ({ navigation, route }: any) => {
    const { movieTitle, releaseDate } = route.params;
    const [selectedDate, setSelectedDate] = useState<number>(1);
    const [selectedSession, setSelectedSession] = useState<number | string>('');

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
                contentContainerStyle={{ paddingHorizontal: widthPixel(16), flexGrow: 1, backgroundColor: colors.background }}
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
                    navigation.navigate(ScreenNames.SeatSelection, {
                        movieTitle,
                        releaseDate,
                        session: selectedSession,
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

