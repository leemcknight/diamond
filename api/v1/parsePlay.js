const fs = require('fs');


const locations = function() {
    const csv = fs.readFileSync('config/field_locations.csv').toString();
    const lines = csv.split(/\r?\n/);
    let locs = {};
    for(line of lines) {
        parts = line.split(',');
        locs[parts[0].trim()] = parts[1];
    }    
    return locs;
}();

function parsePitches(pitchString) {
    
    const pitchArray = pitchString.split('');
    let pitches = [];
    let pitch = {};
    let isDescriptor = false;
    for(pitchChar of pitchArray) {        
        
        if(!isDescriptor) {
            pitch = {};
        }
        isDescriptor = false;
        switch(pitchChar) {
            case '+':
                pitch.descriptor = "following pickoff throw by the catcher";
                isDescriptor = true;
                break;
            case '*':
                pitch.descriptor =  "the following pitch was blocked by the catcher";
                isDescriptor = true;
                break;
            case '.':
                pitch.descriptor =  "play not involving the batter";
                isDescriptor = true;
                break;
            case '1':
                pitch.descriptor = "pickoff throw to first";
                isDescriptor = true;
                break;
            case '2':
                pitch.descriptor = 'pickoff throw to second';
                isDescriptor = true;
                break;
            case '3':
                pitch.descriptor = 'pickoff throw to third';
                isDescriptor = true;
                break;
            case '>':
                pitch.descriptor = 'runner going on the pitch';
                isDescriptor = true;
                break;
            case 'B':
                pitch.result = 'Ball';
                break;            
            case 'C':
                pitch.result = 'Called Strike';
                break;
            case 'F':  
                pitch.result = 'Foul';
                break;
            case 'H':
                pitch.result = 'Hit batter';
                break;
            case 'I':
                pitch.result = 'Intentional ball';
                break;
            case 'K':
                pitch.result = 'Strike';
                break;
            case 'L':
                pitch.result = 'Foul bunt';
                break;
            case 'M':
                pitch.result = 'Missed bunt attempt';
                break;
            case 'N':
                pitch.result = 'no pitch (balks or interference calls)';
                break;
            case 'O':
                pitch.result = 'Foul tip on bunt';
                break;
            case 'P':
                pitch.result = 'Pitchout';
                break;
            case 'Q':
                pitch.result = 'Swinging on pitchout';
                break;
            case 'R':
                pitch.result = 'Foul ball on pitchout';
                break;
            case 'S':
                pitch.result = 'Swinging strike';
                break;
            case 'T':
                pitch.result = 'Foul tip';
                break;
            case 'U':
                pitch.result = 'Unknown or missed pitch';
                break;
            case 'V':
                pitch.result = 'Called ball because pitcher went to his mouth';
                break;
            case 'X':
                pitch.result = 'Ball put into play by batter';
                break;
            case 'Y':
                  pitch.result = 'Ball put into play on pitchout';
                  break;
        }

        if(!isDescriptor) {
            pitch.code = pitchChar;
            pitches.push(pitch);
        }
    }

    return pitches;
}

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
            modifier = 'fly';
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
            modifier = 'force out';
            break;
        case 'G':
            modifier = 'ground ball';
            break;            
        case 'GDP':
            modifier = 'ground ball double play';
            break;
        case 'GTP':
            modifier = 'ground ball triple play';
            break;
        case 'IF':
            modifier = 'infield fly rule';
            break;
        case 'INT':
            modifier = 'interference';
            break;
        case 'IPHR':
            modifier = 'inside the park home run';
            break;
        case 'L':
            modifier = 'line drive';
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

function buildDescription(code) {
    let desc = {};
    const initial = code.substring(0,1);
    switch(initial) {
        case '1':
            desc.long = "Pop out to pitcher";
            desc.short = "Pop out";
            break;
        case '2':
            desc.long = "Pop out to catcher";
            desc.short = "Pop out";
        case '3':
            desc.long = "Pop out to first baseman";
            desc.short = "Pop out";
        case '4':
            desc.long = "Pop out to second baseman";
            desc.short = "Pop out";
        case '5':
            desc.long = "Pop out to third baseman";
            desc.short = "Pop out";
        case '6':
            desc.long = "Pop out to shortstop";
            desc.short = "Pop out";
            break;
        case '7':
            desc.long = "Flyout to left fielder";
            desc.short = "Flyout"
        case '8':
            desc.long = "Flyout to center fielder";
            desc.short = "Flyout";
            break;
        case '9':
            desc.long = "Flyout to right fielder";
            desc.short = "Flyout";
            break;
        case 'K':
            desc.long = desc.short = "Strikeout";
            break;
        case 'W':
            desc.long = desc.short = "Walk";
            break;
        case 'I':
        case 'IW':
            desc.long = desc.short = "Intentional Walk";
            break;
        case 'H':
        case 'HR':
            desc.long = desc.short = "Homerun";
            break;
        case 'S':
            desc.short = "Single";
            desc.long = code;
            break;
        case 'D':
            desc.short = 'Double';
            desc.long = code;
            break;
        case 'T':
            desc.short = 'Triple';
            desc.long = code;
            break;        
        default:
            desc.long = desc.short =  code;
            break;
    }

    return desc;
}

function parseEvent(eventString) {
    const parts = eventString.split('/');
    let event = {
        modifiers: []
    };     
    for(i = 0; i < parts.length; i++) {
        if(i == 0) {
            const  desc = buildDescription(parts[i]);
            event.description = desc.long;
            event.shortDescription = desc.short;
        } else if(i == (parts.length - 1)) {
            const subparts = parts[i].split('.');
            if(subparts.length > 1) {
                event.advance = subparts[1];
            }            
            event.modifiers.push(buildModifiers(subparts[0]));
        } else {            
            event.modifiers.push(buildModifiers(parts[i]));
        }
    }
    return event;
}

function parsePlay(playCsv) {
    //play,inning,home/visitor,player id,count,pitches,event
    const playParts = playCsv.split(',');
    let play = {};
    play.inning = playParts[1];
    play.side = playParts[2];
    play.playerId = playParts[3];
    play.count = playParts[4];
    play.pitches = parsePitches(playParts[5]);
    play.event = parseEvent(playParts[6]);
    play.substitutions = [];    
    return play;

}

module.exports = {parsePlay};