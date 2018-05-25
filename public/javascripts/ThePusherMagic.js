// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('186e76af49a25c6908a1', {
  cluster: 'us2',
  encrypted: true
});

var channel = pusher.subscribe('my-channel');
    channel.bind('saveMongoDb', function(data) {

        var countrys = data.message[0];
        var listCountry = Object.keys(countrys)
        var arN = countrys[listCountry[0]]
        var brN = countrys[listCountry[1]]
        var clN = countrys[listCountry[2]]
        var coN = countrys[listCountry[3]]
        var ecN = countrys[listCountry[4]]
        var paN = countrys[listCountry[5]]
        var peN = countrys[listCountry[6]]
        var urN = countrys[listCountry[7]]        
        $("#ar").children().text(arN)
        $("#br").children().text(brN)
        $("#cl").children().text(clN)
        $("#co").children().text(coN)
        $("#ec").children().text(ecN)
        $("#pa").children().text(paN)
        $("#pe").children().text(peN)
        $("#ur").children().text(urN)       
      console.log(countrys)
    });
