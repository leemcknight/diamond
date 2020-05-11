
const fs = require('fs');

module.exports = {

    locations: () => {

        if(global.locations == undefined) {
            const csv = fs.readFileSync('config/field_locations.csv').toString();
            const lines = csv.split(/\r?\n/);
            let locs = {};
            for(line of lines) {
                parts = line.split(',');
                locs[parts[0].trim()] = parts[1];
            }    
            global.locations = locs;
            
        } 
        return global.locations;        
    },


    getLocationString: code => {
        let loc;
        switch(code) {
            case '1':
                loc = 'pitcher';
                break;
            case '2':
                loc = 'catcher';
                break;
            case '3':
                loc = 'first';
                break;
            case '4':
                loc = 'second';
                break;
            case '5':
                loc = 'third';
                break;
            case '6':
                loc = 'shortstop';
                break;
            case '7':
                loc = 'left field';
                break;
            case '8':
                loc = 'center field';
                break;
            case '9':
                loc = 'right field';
                break;
            case '11':
                loc = 'pinch hitter';
                break;
            case '12':
                loc = 'pinch runner';
                break;
        }

        return loc;
    },

    getPlayerAtPosition: code => {        
        switch(code) {
            case '1':
                loc = 'pitcher';
                break;
            case '2':
                loc = 'catcher';
                break;
            case '3':
                loc = 'first baseman';
                break;
            case '4':
                loc = 'second baseman';
                break;
            case '5':
                loc = 'third baseman';
                break;
            case '6':
                loc = 'shortstop';
                break;
            case '7':
                loc = 'left fielder';
                break;
            case '8':
                loc = 'center fielder';
                break;
            case '9':
                loc = 'right fielder';
                break;
            case '11':
                loc = 'pinch hitter';
                break;
            case '12':
                loc = 'pinch runner';
                break;
        }

        return loc;
    }
}