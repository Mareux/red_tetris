import Player from "../player";
import {
    levelUpRequirement,
    createGameSession,
    getUser, joinSession
} from "../game";


describe('Connecting to a game session', () => {
    const player1 = getUser('room1', 'user1', 'r1u1');

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
        expect(player1.session.host).toBe('user1');
    });
});


describe('Testing initial player state', () => {
    const player1 = getUser('room1', 'user1', 'r1u1');

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


describe('Testing initial session state', () => {
    const player1 = getUser('room1', 'user1', 'r1u1');
    const session1 = player1.session;

    test('The session has only one player', () => {
        expect(session1.players.length).toBe(1);
    });

    test('Two initial tetrominos have been generated', () => {
       expect(session1.tetrominos.length).toBe(2);
    });
});

describe('Adding another player to the session', () => {
    const player1 = getUser('room1', 'user1', 'r1u1');
    const session1 = player1.session;
    const player2 = getUser('room1', 'user2', 'r1u2');

   test('Another player was successfully created', () => {
      expect(player2).toBeDefined();
   });

   test('The session has both players in "players" array', () => {
       expect(session1.players.length).toBe(2);
       expect(session1.players.find((element) => {
           if (element === player1)
               return true;
       }));
       expect(session1.players.find((element) => {
           if (element === player2)
               return true;
       }));
   });
});

describe("General stuff", () => {
    test('It takes 1 or more line to level up', () => {
        expect(levelUpRequirement).toBeGreaterThan(0);
    });
});

