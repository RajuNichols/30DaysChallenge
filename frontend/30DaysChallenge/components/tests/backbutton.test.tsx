import React from "react";
import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import renderer from "react-test-renderer";

import BackButton from "../backbutton";

describe("BackButton", () => {
  const navigation = { goBack: jest.fn() };

  it("renders correctly", () => {
    const tree = renderer.create(<BackButton navigation={navigation} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("calls navigation.goBack when pressed", () => {
    const wrapper = renderer.create(<BackButton navigation={navigation} />);
    const button = wrapper.root.findByType(TouchableOpacity);

    button.props.onPress();
    expect(navigation.goBack).toHaveBeenCalledTimes(1);
  });

  it("displays the correct icon", () => {
    const wrapper = renderer.create(<BackButton navigation={navigation} />);
    const icon = wrapper.root.findByType(Ionicons);

    expect(icon.props.name).toEqual("arrow-back");
    expect(icon.props.size).toEqual(24);
    expect(icon.props.color).toEqual("black");
  });
});