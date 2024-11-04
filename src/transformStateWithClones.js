'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  const resultAllState = [];
  let newState = { ...state };

  for (const action of actions) {
    switch (action.type) {
      case 'addProperties':
        const { extraData } = action;

        addProperties(newState, extraData);
        break;

      case 'removeProperties':
        const { keysToRemove } = action;

        removeProperties(newState, keysToRemove);
        break;

      case 'clear':
        newState = {};
        break;
    }

    const copyState = { ...newState };

    resultAllState.push(copyState);
  }

  return resultAllState;
}

function addProperties(state, extraData) {
  Object.assign(state, extraData);
}

function removeProperties(state, keysToRemove) {
  for (const key of keysToRemove) {
    delete state[key];
  }
}

module.exports = transformStateWithClones;
