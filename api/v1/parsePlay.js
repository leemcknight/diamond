
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
                pitch.result = 'Called String';
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

function parseEvent(event) {
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
    play.event = playParts[6];
    return play;

}

module.exports = {parsePlay};