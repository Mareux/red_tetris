export const SET_GAME_STATE = 'SET_GAME_STATE';

export const gameState = {
  STARTING_SCREEN: 'STARTING_SCREEN',
  GAME_STARTED: 'GAME_STARTED',
  GAME_FINISHED: 'GAME_FINISHED'
};

export function setGameState(state) {
    return {
        type: SET_GAME_STATE,
        state
    }
}
