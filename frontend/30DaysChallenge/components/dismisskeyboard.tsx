import React, { ReactNode } from "react";
import { View, Keyboard } from "react-native";

interface props {
  children: ReactNode;
}

const DismissKeyboard = ({ children }: props) => {
  return (
    <View
      style={{ flex: 1 }}
      onStartShouldSetResponderCapture={() => {
        Keyboard.dismiss();
        return false;
      }}
    >
      {children}
    </View>
  );
};

export default DismissKeyboard;