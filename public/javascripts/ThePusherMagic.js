// Enable pusher logging - don't include this in production
Pusher.logToConsole = true;

var pusher = new Pusher('186e76af49a25c6908a1', {
  cluster: 'us2',
  encrypted: true
});

var channel = pusher.subscribe('my-channel');
    channel.bind('saveMongoDb', function(data) {

        var countrys = data.message[0];
        var listCountry = Object.keys(country)
        var arN = country[listCountry[0]]
        var brN = country[listCountry[1]]
        var clN = country[listCountry[2]]
        var coN = country[listCountry[3]]
        var ecN = country[listCountry[4]]
        var paN = country[listCountry[5]]
        var peN = country[listCountry[6]]
        var urN = country[listCountry[7]]        
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