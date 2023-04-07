import React from "react";
import { Modal, View,Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS } from "../colors";


interface EditChallengeModalProps {
    closeModal: () => void;
    isOpen: boolean;
}


export default function EditChallengeModal(props: EditChallengeModalProps) {


    return (
            <Modal style={styles.Container} onDismiss={props.closeModal} visible={props.isOpen} transparent={true}>
                <View style={styles.content}>
                    <Text style={styles.title}>Enter Title For Challenge</Text>

                    <TouchableOpacity onPress={props.closeModal}>
                        <View>
                            <Text>Close</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                
            </Modal>
    )
}

const styles = StyleSheet.create({
    Container: {
        margin: 0,
    },
    content: {
        alignItems: "center",
        position: "absolute",
        left: "15%",
        top: "25%",
        width: "70%",
        height: "30%",
        backgroundColor: COLORS.blue,
        borderRadius: 5,
    },
    title:{
        fontSize: 20,
        fontFamily: "Inter_800ExtraBold"
    }
})