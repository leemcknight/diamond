const {fromBases, toBases} = require('./bases');

function advanceDescription(advanceString) {
    const from = advanceString.substring(0,1);
    const to = advanceString.substring(2,3);
    return `The ${fromBases[from]} ${toBases[to]}`;
}

function parseAdvances(advanceString) {
    return advanceString.split(';').map(advance => advanceDescription(advance));    
}

module.exports = {parseAdvances};