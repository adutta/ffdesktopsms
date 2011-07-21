$(document).ready(function(){
    numbers = [];

    $('#inbox').click(
        function(event)
        {
            event.preventDefault();
            $('#sendListItem').removeClass("selected");
            $('#inboxListItem').addClass("selected");

            $('#txtStreamFrame').removeClass("hide");
            $('#containText').addClass("hide");
        }
    );

    $('#text').click(
        function(event)
        {
            event.preventDefault();
            $('#inboxListItem').removeClass("selected");
            $('#sendListItem').addClass("selected");

            $('#containText').removeClass("hide");
            $('#txtStreamFrame').addClass("hide");
        }
    );

    //var url ="http://desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
    var url ="https://2.desksms.appspot.com/api/v1/user/DSMS.clockwork@gmail.com/sms";
    $.get(url,
    function(data,textStatus,jqXHR)
    {
        data = data.data
        console.log(data);

        // Group Messages
        var threads = {};
        for (i in data)
        {
            var num = data[i].number;
            if(threads[num] == null)
            {
                var group = [];
                group.push(data[i]);
                threads[num] = group;
            }
            else if(threads[num])
            {
                threads[num].push(data[i]);
            }
        }
        console.log(threads);

        // Display texts
        showTxts(threads);
    }
    ,"jsonp").error(function(){
        alert(textStatus);
    });

    function realTime(utc)
    {
        theDate = new Date(utc);
        var month = theDate.getMonth() + 1;
        var day = theDate.getDate();
        var year = theDate.getFullYear();
        var hour = theDate.getHours();
        var minute = theDate.getMinutes();
        var sec = theDate.getSeconds();
        theDate = hour + ':' + minute + ':' + sec + ',' +month + "/" + day + "/" + year;
        return theDate;
    }

    function showTxts(threads)
    {
        var giantString = '';
        for(i in threads)
        {
            giantString+='<div class="txtThread">';
            for (j in threads[i])
            {
                var txt = threads[i][j];

                //Handle newlines and html tags
                txt['message'] = txt['message'].replace('<','&lt');
                txt['message'] = txt['message'].replace('>','&gt');
                txt['message'] = txt['message'].replace('\n','<br>');

                if(txt['type'] == 'incoming')
                    giantString += sprintf('<div class="%s"><strong>%s:</strong><br><em>Sent at: %s</em><br>%s</div>',
                                txt['type'],txt['name'],realTime(txt['date']),txt['message']);
                else
                    giantString += sprintf('<div class="%s"><strong>Me:</strong><br><em>Sent at: %s</em><br>%s</div>',
                                txt['name'],realTime(txt['date']),txt['message']);
            }
            giantString+='</div><br>'
        }
        $("#txtStream").append(giantString);
    }
});