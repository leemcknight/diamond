const parser = require('./parsePlay');

test('parse play', () => {

    const play = parser.parsePlay('play,6,1,camik001,00,X,23/SH.1-2');
    console.log(JSON.stringify(play));
    
    const play2 = parser.parsePlay('play,5,1,ramir001,00,,S8.3-H;1-2');
    console.log(JSON.stringify(play2));


    //indicates a ground ball out at first on a ball fielded by the shortstop.
    const play3 = parser.parsePlay('play,6,0,davie001,01,FX,63/G6M');
    console.log(JSON.stringify(play3));

    //indicates a fly ball out to the center fielder with the runner on second doubled up.
    const play4 = parser.parsePlay('play,7,0,leonj001,01,CX,8(B)84(2)/LDP/L8');
    console.log(JSON.stringify(play4));
});