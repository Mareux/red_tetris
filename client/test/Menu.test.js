import renderer from 'react-test-renderer';
import Menu from "../src/components/Menu";
import React from "react";

it('renders correctly', () => {
    const tree = renderer.create(
        <Menu />
    ).toJson();
    expect(tree).toMatchSnapshot();
});
