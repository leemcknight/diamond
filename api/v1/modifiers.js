const {locations} = require('./fieldLocations');

function locationModifier(modifierCode) {    
    let battedBallType;
    for(c of 'GLPFB') {
        if(modifierCode.startsWith(c)) {
            battedBallType = c;
            break;
        }
    }
    let type;

    switch(battedBallType) {
        case 'G':
            type = 'Ground ball';
            break;
        case 'L':
            type = 'Line drive';
            break;
        case 'P':
            type = 'Popup';
            break;
        case 'F':
            type = 'Fly';
            break;
        case 'B':
            type = 'Bunt'
            break;
    }

    const locationCode = modifierCode.substring(1, modifierCode.length);    
    let val;
    if(type == undefined) {
        val =  `to ${locations[locationCode]}`;    
    } else {
        val =  `${type} to ${locations[locationCode]}`;    
    }    
    return val;
}

function buildModifiers(modifierCode) {     
    let modifier;

    switch(modifierCode) {
        case 'AP':
            modifier = 'appeal play';
            break;
        case 'BP':
            modifier = 'pop up bunt';
            break;
        case 'BG':
            modifier = 'ground ball bunt';
            break;
        case 'BGDP':
            modifier = 'bunt grounded into double play';
            break;
        case 'BINT':
            modifier = 'batter interference';
            break;
        case 'BL':
            modifier = 'line drive bunt';
            break;
        case 'BOOT':
            modifier = 'batting out of turn';
            break;
        case 'BP':
            modifier = 'bunt pop up';
            break;
        case 'BPDP':
            modifier = 'bunt popped into double play';
            break;
        case 'BR':
            modifier = 'runner hit by batted ball';
            break;
        case 'C':
            modifier = 'called third strike';
            break;
        case 'COUB':
            modifier = 'courtesy batter';
            break;
        case 'COUF':
            modifier = 'courtesy fielder';
            break;
        case 'COUR':
            modifier = 'courtesy runner';
            break;
        case 'DP':
            modifier = 'unspecified double play';
            break;                
        case 'E$':
            modifier = 'error on $';
            break;
        case 'F':
            modifier = 'on a fly';
            break;
        case 'FDP':
            modifier = 'fly ball double play';
            break;
        case 'FINT':
            modifier = 'fan interference';
            break;
        case 'FL':
            modifier = 'foul';
            break;
        case 'FO':
            modifier = 'on a force out';
            break;
        case 'G':
            modifier = 'on a ground ball';
            break;            
        case 'GDP':
            modifier = 'on a ground ball double play';
            break;
        case 'GTP':
            modifier = 'on a ground ball triple play';
            break;
        case 'IF':
            modifier = 'infield fly rule';
            break;
        case 'INT':
            modifier = 'interference';
            break;
        case 'IPHR':
            modifier = 'on an inside the park home run';
            break;
        case 'L':
            modifier = 'on a line drive';
            break;
        case 'LDP':
            modifier = 'lined into double play';
            break;
        case 'LTP':
            modifier = 'lined into triple play';
            break;
        case 'MREV':
            modifier = 'manager challenge of call on the field';
            break;
        case 'NDP':
            modifier = 'no double play credited for this play';
            break;
        case 'OBS':
            modifier = 'obstruction (fielder obstructing a runner)';
            break;
        case 'P':
            modifier = 'pop fly';
            break;
        case 'PASS':
            modifier = 'a runner passed another runner and was called out';
            break;
        case 'R$':
            modifier = 'relay throw from the initial fielder to $ with no out made';
            break;
        case 'RINT':
            modifier = 'runner interference';
            break;
        case 'SF':
            modifier = 'sacrifice fly';
            break;
        case 'SH':
            modifier = 'sacrifice hit (bunt)';
            break;
        case 'TH':
            modifier = 'throw';
            break;
        case 'TH%':
            modifier = 'throw to base %';
            break;
        case 'TP':
            modifier = 'unspecified triple play';
            break;
        case 'UINT':
            modifier = 'umpire interference';
            break;
        case 'UREV':
            modifier = 'umpire review of call on the field';
            break;
        default:
            if(modifierCode == undefined) {
                return null;
            } else {
                return locationModifier(modifierCode);
            }
    }            

    return modifier;
        
}


module.exports = {buildModifiers};