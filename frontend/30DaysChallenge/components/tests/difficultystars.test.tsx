import React from 'react';
import renderer, { ReactTestRenderer, ReactTestInstance } from 'react-test-renderer';
import DifficultyStars from '../difficultystars';

describe('DifficultyStars', () => {
  let testRenderer: ReactTestRenderer;
  let testInstance: ReactTestInstance;

  afterEach(() => {
    testRenderer.unmount();
  });

  it('renders the correct number of solid and blank stars based on difficulty', () => {
    const difficulty = 3;
    testRenderer = renderer.create(<DifficultyStars difficulty={difficulty} />);
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct star images based on size prop', () => {
    const difficulty = 3;
    const size = 1;

    testRenderer = renderer.create(<DifficultyStars difficulty={difficulty} size={size} />);
    const tree = testRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });

  // Add more tests as needed
});