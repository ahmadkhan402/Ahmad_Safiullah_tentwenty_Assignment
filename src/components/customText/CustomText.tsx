import React, { FC } from 'react';
import { StyleProp, Text, TextProps, TextStyle } from 'react-native';
import { colors, fontFamily } from '../../constant/constants';
import { font, heightPixel } from '../../utils/helper';

interface CustomTextProps extends TextProps {
  fontSize?: number;
  color?: string;
  flex?: boolean;
  center?: boolean;
  style?: StyleProp<TextStyle>;
  underline?: boolean;
  onPress?: () => void;
  textAlignCenter?: boolean;
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold';
  fontfamily?: keyof typeof fontFamily;
}

const CustomText: FC<CustomTextProps> = ({
  flex,
  style,
  center,
  onPress,
  children,
  underline,
  fontSize = 14,
  numberOfLines,
  textAlignCenter,
  weight = 'regular',
  color = colors.white,
  fontfamily = 'poppins',
  ...props
}) => {
  return (
    <Text
      {...props}
      onPress={onPress}
      numberOfLines={numberOfLines}
      allowFontScaling={false}
      style={[
        { fontFamily: fontFamily[weight] },
        center && { alignSelf: 'center' },
        textAlignCenter && { textAlign: 'center' },
        underline && { textDecorationLine: 'underline' },
        {
          fontSize: font(fontSize),
          includeFontPadding: false,
          textAlignVertical: 'center',
          paddingTop: heightPixel(3.5),
          color,
          flex: flex ? 1 : undefined,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

export default React.memo(CustomText);
