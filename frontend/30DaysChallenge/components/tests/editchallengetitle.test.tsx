import React from 'react';
import { Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import renderer, { ReactTestRenderer, ReactTestInstance } from 'react-test-renderer';
import EditChallengeModal from '../editchallengetitle';

describe('EditChallengeModal', () => {
  let testRenderer: ReactTestRenderer;
  let testInstance: ReactTestInstance;
  const closeModalMock = jest.fn();
  const challenge = { id: 1, title: 'Sample Challenge' };

  afterEach(() => {
    testRenderer.unmount();
    closeModalMock.mockClear();
  });

  it('renders the modal correctly', () => {
    testRenderer = renderer.create(
      <EditChallengeModal closeModal={closeModalMock} isOpen={true} challenge={challenge} />
    );
    testInstance = testRenderer.root;

    const modal = testInstance.findByType(Modal);
    expect(modal.props.visible).toBeTruthy();
  });

  it('renders the title correctly', () => {
  testRenderer = renderer.create(
    <EditChallengeModal closeModal={closeModalMock} isOpen={true} challenge={challenge} />
  );
  testInstance = testRenderer.root;

  const title = testInstance.findAllByType(Text).find((textComponent) => {
    return textComponent.props.children === 'Enter Title For Challenge';
  });
  
  expect(title).toBeDefined();
  
  if (title) {
    expect(title.props.style).toMatchObject({ fontSize: 20 });
  }
});

  it('renders the input field correctly', () => {
    testRenderer = renderer.create(
      <EditChallengeModal closeModal={closeModalMock} isOpen={true} challenge={challenge} />
    );
    testInstance = testRenderer.root;

    const inputField = testInstance.findByType(TextInput);
    expect(inputField.props.placeholder).toBe('Title name');
  });

  it('renders the close button and calls closeModal when pressed', () => {
    testRenderer = renderer.create(
      <EditChallengeModal closeModal={closeModalMock} isOpen={true} challenge={challenge} />
    );
    testInstance = testRenderer.root;

    const closeButton = testInstance.findAllByType(TouchableOpacity)[0];
    closeButton.props.onPress();
    expect(closeModalMock).toHaveBeenCalledTimes(1);
  });

  // Add more tests as needed
});