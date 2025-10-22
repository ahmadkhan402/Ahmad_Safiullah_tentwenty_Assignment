import React, { useCallback } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
    Alert,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { searchMovies, clearSearchResults } from '../../redux/slices/moviesSlice';
import { debounce } from 'lodash';
import { colors, fontFamily } from '../../utils/constants';
import { widthPixel } from '../../utils/helper';
import { useNavigation } from '@react-navigation/native';
import { ScreenNames } from '../../route/screenNames';

interface Props {
    query?: string;
    setQuery?: (value: string) => void;
    onSearchActive?: (active: boolean) => void;
    onSearchPress?: (active: boolean) => void;
    isSearch?: boolean;
}

const SearchInput: React.FC<Props> = ({ query, isSearch = true, onSearchPress, setQuery, onSearchActive }) => {
    const dispatch = useAppDispatch();
    const navigation = useNavigation<any>();
    const { searchResults } = useAppSelector(state => state.movies);

    const handleSearch = useCallback(
        debounce(async (text: string) => {
            if (text.trim().length > 0) {
                try {
                    const resultAction = await dispatch(searchMovies(text));
                    if (searchMovies.rejected.match(resultAction)) {
                        Alert.alert(
                            'Network Error',
                            resultAction.payload || 'Unable to fetch results. Showing previous results if any.'
                        );
                        onSearchActive?.(searchResults.length > 0);
                    } else {
                        onSearchActive?.(true);
                    }
                } catch (error) {
                    console.warn('Unexpected error', error);
                }
            } else {
                dispatch(clearSearchResults());
                onSearchActive?.(false);
            }
        }, 400),
        [dispatch, searchResults]
    );

    const onChangeText = (text: string) => {
        setQuery?.(text);
        handleSearch(text);
    };

    const onClear = () => {
        setQuery?.('');
        dispatch(clearSearchResults());
        onSearchActive?.(false);
        Keyboard.dismiss();
    };

    const handleNavigate = () => {
        if (!isSearch) {
            navigation.navigate(ScreenNames.Search);
        } else {
            onSearchPress?.(true);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleNavigate}>
                <MaterialIcons name="search" size={30} color="#999" style={{ marginRight: 8 }} />
            </TouchableOpacity>

            <TextInput
                placeholder="TV shows, movies and more"
                placeholderTextColor="#999"
                value={query}
                // editable={isSearch}
                onChangeText={onChangeText}
                onFocus={() => !isSearch && navigation.navigate(ScreenNames.Search)}
                style={styles.input}
            />

            {query && query.length > 0 && (
                <TouchableOpacity onPress={onClear}>
                    <MaterialIcons name="close" size={24} color="#999" />
                </TouchableOpacity>
            )}
        </View>
    );
};

export default SearchInput;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.background,
        borderRadius: 30,
        paddingHorizontal: widthPixel(18),
        paddingVertical: 8,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    input: {
        flex: 1,
        color: colors.black,
        fontSize: 16,
        fontFamily: fontFamily.regular,
    },
});
