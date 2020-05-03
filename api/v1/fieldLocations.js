module.exports = {
    getLocationString(code) {
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
    }
}