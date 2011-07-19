$(document).ready(function(){
    var url ="http://2.desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
    $.get("http://jsonp.deployfu.com/clean/" + encodeURIComponent(url),
    function(data,textStatus,jqXHR)
    {
        console.log(data);
        $('#content').append(data);
    }
    ,"jsonp").error(function(){
        alert(textStatus);
    });
});