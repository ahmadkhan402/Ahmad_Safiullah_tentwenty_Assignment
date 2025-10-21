import React, { useState, useCallback } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { searchMovies, clearSearchResults } from '../../redux/slices/moviesSlice';
import { debounce } from 'lodash';
import { colors, fontFamily } from '../../utils/constants';
import { widthPixel } from '../../utils/helper';

interface Props {
    query: string;
    setQuery: (value: string) => void;
    onSearchActive: (active: boolean) => void;
}

const SearchInput: React.FC<Props> = ({ query, setQuery, onSearchActive }) => {
    const dispatch = useAppDispatch();
    const { searchResults } = useAppSelector(state => state.movies);

    const handleSearch = useCallback(
        debounce((text: string) => {
            if (text.trim().length > 0) {
                dispatch(searchMovies(text));
                onSearchActive(true);
            } else {
                dispatch(clearSearchResults());
                onSearchActive(false);
            }
        }, 400),
        []
    );

    const onChangeText = (text: string) => {
        setQuery(text);
        handleSearch(text);
    };

    const onClear = () => {
        setQuery('');
        dispatch(clearSearchResults());
        onSearchActive(false);
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <MaterialIcons name="search" size={30} color="#999" style={{ marginRight: 8 }} />
            <TextInput
                placeholder="TV shows, movies and more"
                placeholderTextColor="#999"
                value={query}
                onChangeText={onChangeText}
                style={styles.input}
            />
            {query.length > 0 && (
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
        fontFamily: fontFamily.regular
    },
});
