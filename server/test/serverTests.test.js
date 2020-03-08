import Player from "../player";
import {
    levelUpRequirement,
    createGameSession,
    getUser
} from "../tetris";

const player = getUser('testRoomName', 'testUserName', 'testSocketID');

describe('Connecting to a game session', () => {
    test('New player is successfully created', () => {
        expect(player).toBeDefined();
    });

    test('New session is successfully created', () => {
        expect(player.session).toBeDefined();
    });

    test('The first player to connect to the session becomes the host', () => {
        expect(player.host).toBe(true);
        expect(player.session.host).toBe('testUserName');
    });
});


describe('Testing initial player state', () => {
    test('Default interval between game steps is 300', () => {
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

    test('By default, the game is not over', () => {
     expect(player.gameOver).toBe(false);
    });
});


describe("General stuff", () => {
    test('It takes 1 or more line to level up', () => {
        expect(levelUpRequirement).toBeGreaterThan(0);
    });
});

