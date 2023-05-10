import React from "react";
import renderer from "react-test-renderer";
import ChallengeListItem from "../challengeListItem";
import DifficultyStars from "../difficultystars";


describe("ChallengeListItem", () => {
  const props = {
    name: "Test Challenge",
    difficulty: 3,
    navigation: {},
    display: true,
  };

  it("renders correctly with valid display prop", () => {
    const tree = renderer.create(<ChallengeListItem {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("renders correctly with invalid display prop", () => {
    const invalidProps = { ...props, display: false };
    const tree = renderer.create(<ChallengeListItem {...invalidProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });


  it("displays the difficulty stars", () => {
    const tree = renderer.create(<ChallengeListItem {...props} />);
    const difficultyStarsComponent = tree.root.findByType(DifficultyStars);
    expect(difficultyStarsComponent.props.difficulty).toEqual(props.difficulty);
  });

});