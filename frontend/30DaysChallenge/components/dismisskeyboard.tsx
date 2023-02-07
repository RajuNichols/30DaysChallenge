import React, { ReactNode } from "react";
import { TouchableWithoutFeedback, Keyboard } from "react-native";

interface props{
    children: ReactNode;
}

const DismissKeyboard = ({children} : props) => {
    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    )
    
}

export default DismissKeyboard;