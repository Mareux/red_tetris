import Player from "../player";
import {
    levelUpRequirement,
    createGameSession,
    getUser
} from "../tetris";

describe("Connecting to a game session", () => {
    const player = getUser('Placeholder room name', 'Placeholder user name', 'Placeholder socket ID');

    test('New player is successfully created', () => {
       expect(player).toBeDefined();
    });

    test('Default interval between steps is 300', () => {
        expect(player.interval).toBe(300);
    });

    test('Initial game level is 1', () => {
        expect(player.level).toBe(1);
    });

    test('Initial player score is 0', () => {
        expect(player.score).toBe(0);
    });

    test('Total cleared lines is initially 0', () => {
        expect(player.totalClearedLines).toBe(0);
    });

    test('By default, the player is not ready', () => {
       expect(player.ready).toBe(false);
    });

    test('The first player to connect to a session is a host', () => {
       expect(player.host).toBe(true);
    });

    test('By default, the game is not over', () => {
        expect(player.gameOver).toBe(false);
    });
});



describe("General stuff", () => {
    test('It takes 1 or more line to level up', () => {
        expect(levelUpRequirement).toBeGreaterThan(0);
    });
});