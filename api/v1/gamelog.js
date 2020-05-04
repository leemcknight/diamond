
function boxScore(visitorLine, homeLine) {
    let box = [];
    console.log(`visitor line: ${visitorLine}`);
    console.log(`home line: ${homeLine}`);
    for(i = 0; i < visitorLine.length; i++) {
        box.push(
        {
            i: i+1,
            v: visitorLine.substring(i,i+1),
            h: homeLine.length <= i ? 'X' : homeLine.substring(i,i+1)
        }
        )
    }
    return box;
}

function unquote(s) {
    return s.replace(/"/g,'');
}



module.exports = {    
    parseGameLog: log => {
        parts = log.split(',');
        return {
            box: boxScore(unquote(parts[19]), unquote(parts[20])),
            visitorScore: parts[9],
            homeScore: parts[10],
            visitorHits:  parts[22],
            homeHits: parts[50],
            visitorErrors: parts[44],
            homeErrors: parts[72]
        };
    }
}