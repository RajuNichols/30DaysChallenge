import react from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { COLORS } from '../colors';



export default function LoadingIndicator(){
    return(
        <ActivityIndicator size="large" color={COLORS.blue} style={styles.indicator}/>
    )
}

const styles = StyleSheet.create({
    indicator:{
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1
    }
})