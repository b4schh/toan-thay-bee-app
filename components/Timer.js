import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useExamTimer } from '../hooks/useExamTimer';
import colors from '../constants/colors';

export default function Timer({ duration, style }) {
    const { formattedTime } = useExamTimer(duration);

    return (
        <View style={[styles.container, style]}>
            <Text style={styles.timer}>{formattedTime}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 8,
        backgroundColor: colors.sky.lightest,
    },
    timer: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.ink.darkest,
    },
});