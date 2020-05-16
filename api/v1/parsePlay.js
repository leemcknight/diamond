const {getLocationString, getPlayerAtPosition} = require('./fieldLocations');
const {parseAdvances} = require('./advances');
const {fromBases} = require('./bases');
const {buildModifiers} = require('./modifiers');



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
function buildOutDescription(code) {
    let desc = {
        long: ''
    };    
    if(code.length == 1) {     
        //unassisted   
        switch(code) {
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
                desc.short = "Pop out";
                desc.long = `pops out to ${getPlayerAtPosition(code)}`
                break;
            case '7':
            case '8':
            case '9':
                desc.short = "Flyout";
                desc.long = `flies out to ${getPlayerAtPosition(code)}`
        }
    } else {
        //assisted
        let outs = 1;
        let runnerCode = false;   
        let initialFielder = true;             
        for(pos of code) {
            if(pos == '(') {
                runnerCode = true;                
            } else if(pos == ')') {
                runnerCode = false;
            } else if(runnerCode) {
                desc.long += ` (the ${fromBases[pos]} is out)`                
            } else {              
                if(initialFielder) {
                    desc.long += getPlayerAtPosition(pos);
                    initialFielder = false;
                } else {
                    desc.long += ` to ${getPlayerAtPosition(pos)}`
                }
            }
        }

        desc.short = "Ground out";
    }    
    if(desc.long.endsWith(' to ,')) {
        desc.long = desc.long.substr(0, desc.long.length-5);
    }
        
    return desc;
}

function buildDescription(code) {
    let desc = {};
    const initial = code.substring(0,1);
    switch(initial) {
        case '1':            
        case '2':            
        case '3':            
        case '4':            
        case '5':            
        case '6':            
        case '7':            
        case '8':            
        case '9':
            desc = buildOutDescription(code);
            break;            
        case 'K':
            desc.long = "stikes out";
            desc.short = "Strikeout"
            break;
        case 'W':
            desc.long = "walks";
            desc.short = "Walk";
            break;
        case 'I':        
            desc.long = "intentionally walked";
            desc.short = "Intentional Walk";
            break;
        case 'H':        
            desc.long = "homers";
            desc.short = "Homerun";
            break;
        case 'S':
            desc.short = "Single";
            desc.long = `singles to ${getLocationString(code.substring(1,2))}`;
            break;
        case 'D':
            desc.short = 'Double';
            desc.long = `doubles to ${getLocationString(code.substring(1,2))}`;
            break;
        case 'T':
            desc.short = 'Triple';
            desc.long = `triples to ${getLocationString(code.substring(1,2))}`;
            break;        
        default:
            desc.long = desc.short =  code;
            break;
    }

    return desc;
}

function parseEvent(eventString) {
    const parts = eventString.split('/');
    const descCode = parts[0];
    let event = {
        modifiers: []
    };     
    for(i = 1; i < parts.length; i++) {        
        if(i == (parts.length - 1)) {
            const subparts = parts[i].split('.');
            if(subparts.length > 1) {
                event.advances = parseAdvances(subparts[1]);
            }            
            event.modifiers.push(buildModifiers(subparts[0]));
        } else {            
            event.modifiers.push(buildModifiers(parts[i]));
        }
    }
    const description = buildDescription(descCode);
    event.description = description.long;
    event.shortDescription = description.short;
    return event;
}

function lookup(playerId, players) {
    for(player of players) {
        if(playerId == player.id) {
            return player.name;
        }
    }
    return playerId;
}

function parsePlay(playCsv, players) {
    //play,inning,home/visitor,player id,count,pitches,event
    const playParts = playCsv.split(',');
    let play = {};
    play.inning = playParts[1];
    play.side = playParts[2];
    play.playerId = playParts[3];
    play.player = lookup(play.playerId, players);
    play.count = playParts[4];
    play.pitches = parsePitches(playParts[5]);
    play.event = parseEvent(playParts[6]);
    play.substitutions = [];    
    play.raw = playCsv;
    return play;

}

module.exports = {parsePlay};