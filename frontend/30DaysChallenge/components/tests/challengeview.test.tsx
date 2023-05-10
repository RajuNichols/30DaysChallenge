import React from 'react';
import renderer, { act } from 'react-test-renderer';
import ChallengeView from '../challengeview';

describe('ChallengeView', () => {
  const sampleProps = {
    startDate: new Date(2023, 4, 1),
    endDate: new Date(2023, 4, 31),
    completedDates: new Array(31).fill(false),
    challengeDay: 5,
    friends: [
      { name: 'Alice', completedDates: new Array(31).fill(false) },
      { name: 'Bob', completedDates: new Array(31).fill(false) },
    ],
  };

  it('renders without errors', () => {
    let component: any;

    act(() => {
      component = renderer.create(<ChallengeView {...sampleProps} />);
    });

    expect(component.toJSON()).toMatchSnapshot();
  });
});