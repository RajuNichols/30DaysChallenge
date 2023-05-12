import React, { ReactNode } from "react";
import renderer from "react-test-renderer";
import DismissKeyboard from "../dismisskeyboard";
import TestRenderer from 'react-test-renderer';
import { Keyboard, View } from 'react-native';


describe('DismissKeyboard', () => {
  it('dismisses the keyboard when tapped', () => {
    Keyboard.dismiss = jest.fn();

    const childElement = <View testID="child" />;
    const testRenderer = TestRenderer.create(
      <DismissKeyboard>{childElement}</DismissKeyboard>
    );
    const testInstance = testRenderer.root;

    const view = testInstance.findByType(View);
    view.props.onStartShouldSetResponderCapture();

    expect(Keyboard.dismiss).toHaveBeenCalled();
  });

  it('renders the children correctly', () => {
    const childElement = <View testID="child" />;
    const testRenderer = TestRenderer.create(
      <DismissKeyboard>{childElement}</DismissKeyboard>
    );
    const testInstance = testRenderer.root;

    const child = testInstance.findByProps({ testID: 'child' });
    expect(child).toBeTruthy();
  });
});
