import React, { useCallback } from "react";
import {
    FlatList,
    TouchableOpacity,
    View,
    Image,
    ListRenderItem,
    ImageSourcePropType,
} from "react-native";
import CustomText from "../../components/customText/CustomText";
import { colors } from "../../utils/constants";
import { heightPixel, widthPixel } from "../../utils/helper";
import { styles } from "./styles";


interface Session {
    id: number | string;
    time: string;
    hall: string;
    image: ImageSourcePropType;
    price: string;
    bonus: string;
}

interface SessionSelectorProps {
    sessions: Session[];
    selectedSession: any
    setSelectedSession: (id: any) => void;
}

const SessionSelector: React.FC<SessionSelectorProps> = ({
    sessions,
    selectedSession,
    setSelectedSession,
}) => {
    const renderItem: ListRenderItem<Session> = useCallback(
        ({ item }) => (
            <TouchableOpacity
                onPress={() => setSelectedSession(item)}
                style={[
                    styles.sessionCard,
                    selectedSession === item.id && styles.activeSessionCard,
                ]}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginBottom: heightPixel(8),
                    }}
                >
                    <CustomText fontSize={14} weight="semiBold" color={colors.black}>
                        {item.time}
                    </CustomText>
                    <CustomText
                        fontSize={12}
                        color="#999"
                        style={{ marginLeft: widthPixel(8) }}
                    >
                        {item.hall}
                    </CustomText>
                </View>

                <Image source={item.image} style={styles.seatImage} resizeMode="contain" />

                <CustomText
                    fontSize={10}
                    color="#666"
                    style={{ marginTop: heightPixel(6) }}
                >
                    From <CustomText fontSize={12} weight="bold" color={colors.black}>{item.price}</CustomText> or{" "}
                    <CustomText fontSize={12} weight="bold" color={colors.black}>{item.bonus}</CustomText>
                </CustomText>
            </TouchableOpacity>
        ),
        [selectedSession]
    );

    const keyExtractor = useCallback((item: Session) => item.id.toString(), []);

    return (
        <FlatList
            data={sessions}
            renderItem={renderItem}
            keyExtractor={keyExtractor}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                gap: widthPixel(12),
                paddingHorizontal: widthPixel(4),
                marginTop: heightPixel(20),
            }}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
            windowSize={5}
            removeClippedSubviews
            getItemLayout={(_, index) => ({
                length: widthPixel(180),
                offset: widthPixel(180) * index,
                index,
            })}
        />
    );
};

export default React.memo(SessionSelector);
