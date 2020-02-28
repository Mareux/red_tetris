import {parseUsername} from "../tetris";

test("Split [ '#1', 'pet]' ] expect to be pet", () => {
    expect(parseUsername([ '#1', 'pet]' ])).toBe("pet");
});
