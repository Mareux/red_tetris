import Player from "../player";
import {
    levelUpRequirement,
    createGameSession,
    getUser
} from "../tetris";

const player1 = getUser('testRoomName', 'testUserName', 'testSocketID');

describe('Connecting to a game session', () => {
    test('New player is successfully created', () => {
        expect(player1).toBeDefined();
    });

    test('New session is successfully created', () => {
        expect(player1.session).toBeDefined();
    });

    test('The session has the new player in "players" array', () => {
       expect(player1.session.players[0]).toBe(player1);
    });

    test('The first player to connect to the session becomes the host', () => {
        expect(player1.host).toBe(true);
        expect(player1.session.host).toBe('testUserName');
    });
});


describe('Testing initial player state', () => {
    test('The playfield has been generated', () => {
       expect(player1.playfield).toBeDefined();
       expect(player1.playfield.playfield).toBeDefined();
    });

    test('Default interval between game steps is 300', () => {
        expect(player1.interval).toBe(300);
    });

    test('Initial game level is 1', () => {
       expect(player1.level).toBe(1);
    });

    test('Initial player score is 0', () => {
      expect(player1.score).toBe(0);
    });

    test('Total cleared lines is initially 0', () => {
      expect(player1.totalClearedLines).toBe(0);
    });

    test('By default, the player is not ready', () => {
      expect(player1.ready).toBe(false);
    });

    test('By default, the game is not over', () => {
     expect(player1.gameOver).toBe(false);
    });
});

const session1 = player1.session;

describe('Testing initial session state', () => {
    test('The session has only one player', () => {
        expect(session1.players.length).toBe(1);
    });

    test('Two initial tetrominos have been generated', () => {
       expect(session1.tetrominos.length).toBe(2);
    });
});

describe("General stuff", () => {
    test('It takes 1 or more line to level up', () => {
        expect(levelUpRequirement).toBeGreaterThan(0);
    });
});

