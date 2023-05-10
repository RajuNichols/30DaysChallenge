import React from 'react';
import renderer, { ReactTestRenderer, ReactTestInstance } from 'react-test-renderer';
import LoadingIndicator from '../loadingindicator';
import { ActivityIndicator } from 'react-native';
import { COLORS } from '../../colors';

describe('LoadingIndicator', () => {
  let testRenderer: ReactTestRenderer;
  let testInstance: ReactTestInstance;

  afterEach(() => {
    testRenderer.unmount();
  });

  it('renders correctly', () => {
    testRenderer = renderer.create(<LoadingIndicator />);
    testInstance = testRenderer.root;

    const activityIndicator = testInstance.findByType(ActivityIndicator);
    expect(activityIndicator).toBeTruthy();
  });

  it('has the correct size and color properties', () => {
    testRenderer = renderer.create(<LoadingIndicator />);
    testInstance = testRenderer.root;

    const activityIndicator = testInstance.findByType(ActivityIndicator);
    expect(activityIndicator.props.size).toBe('large');
    expect(activityIndicator.props.color).toBe(COLORS.blue);
  });
});