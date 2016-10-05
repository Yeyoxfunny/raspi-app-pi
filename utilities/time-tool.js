module.exports = function(time,option){
    var delay;
    switch(option){
        case "1":
            delay = time;
            break;
        case "2":
            delay = time * 1000;
            break;
        case "3":
            delay = time * 60000;
            break;
        case "4":
            delay = time * 3600000;
            break;
    }
    return delay;
}
