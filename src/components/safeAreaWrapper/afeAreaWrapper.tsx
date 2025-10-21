import React, { FC, ReactNode } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
    children: ReactNode;
    style?: StyleProp<ViewStyle>;
}

const SafeAreaWrapper: FC<Props> = ({ children, style }) => {
    const insets = useSafeAreaInsets();

    return (
        <View style={[{ flex: 1, paddingTop: insets.top, paddingBottom: insets.bottom }, style]}>
            {children}
        </View>
    );
};

export default SafeAreaWrapper;
