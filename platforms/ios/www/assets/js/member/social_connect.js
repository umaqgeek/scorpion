    document.getElementById("defaultOpen").click();

    function openNav() {
        document.getElementById("mySidenav").style.width = "200px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }
    
    function openCity(evt, cityName) 
    {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) 
        {
        tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("tablinks");
        
    for (i = 0; i < tablinks.length; i++) 
        {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
    }
    

//script for passcode
    $(document).ready(function () {
    var i = 0;
    localStorage.setItem("i",i);
 });


function insert(value)
{   
    
    if($("#first").html() != "<h3>-</h3>" )
    {
        if($("#second").html() != "<h3>-</h3>" )
        {
            if($("#third").html() != "<h3>-</h3>" )
            {
                var dis4 = value;
                $("#fourth").html("<h3>"+dis4+"</h3>");
                localStorage.setItem("fourth", dis4);
                //msg_alert('Authenticating ...', 2);
                 
                //window.setTimeout(post, 2500);
                
            }
            else
            {
                var dis3 = value;
                $("#third").html("<h3>"+dis3+"</h3>");
                localStorage.setItem("third", dis3);
            }
        }
        else
        {
            var dis2 = value;
            $("#second").html("<h3>"+dis2+"</h3>");
            localStorage.setItem("second", dis2);
        }
    }
    else
    {
        var dis1 = value;
        $("#first").html("<h3>"+dis1+"</h3>");
        localStorage.setItem("first", dis1);
    }

    
}



function reset()
{
    $('#first').html("<h3>-</h3>");
    $('#second').html("<h3>-</h3>");
    $('#third').html("<h3>-</h3>");
    $('#fourth').html("<h3>-</h3>");
}

function del_num()
{
    
    if($("#fourth").html() != "<h3>-</h3>" )
    {
        $('#fourth').html("<h3>-</h3>");
    }
    else
    {
        if($("#third").html() != "<h3>-</h3>" )
        {
            $('#third').html("<h3>-</h3>");     
        }
        else
        {
            if($("#second").html() != "<h3>-</h3>" )
            {
                $('#second').html("<h3>-</h3>");
                
            }
            else
            {
                if($("#first").html() != "<h3>-</h3>")
                {
                    $('#first').html("<h3>-</h3>");
                }
                else
                {
                    msg_alert('Pin code already empty',3);
                }
            }
        }
    }
}

function chance ()
{
    var a = 1;
    var i = localStorage.getItem("i");
    i = (+i) + (+a);
    
    localStorage.setItem("i",i);
    if(i=="3")
    {
        return false;
    }
    
    return true;
}

function submitPin(){


            var pwd = localStorage.getItem("first");
            pwd = pwd+localStorage.getItem("second");
            pwd = pwd+localStorage.getItem("third");
            pwd = pwd+localStorage.getItem("fourth");
            localStorage.setItem("pwd", pwd);

            var user = localStorage.getItem("username");

            $.ajax({
                    type:'post',
                    url: 'http://localhost/dpapps/index.php/social_connect/getPin',
                    data:{
                    'members_pin_no':pwd,
                    'members_username':user
                },
                    error: function(error_data){
                 	console.log(error_data);
                 	},
                    success:function(data){
                   	console.log(data);
                    msg_alert('Pin code Updated',1);
                    pass_url('member/overview.html');
					}
        });

}


$("#fbswitch").on('click', function(event) {
    event.preventDefault();
    event.stopPropagation();
    
    return false;
    
    alert('Break');
});


//start fb connection script

function sortMethod(a, b) {
var x = a.name.toLowerCase();
var y = b.name.toLowerCase();
return ((x < y) ? -1 : ((x > y) ? 1 : 0));
}
window.fbAsyncInit = function() {
FB.init({
appId: '1602824146689212', 
status: true, 
cookie: true,
xfbml: true,
oauth: true
});



function updateButton(response) {
var suisfb = document.getElementById('fbswitch');

if (response.authResponse) { // in case if we are logged in
var userInfo = document.getElementById('user-info');
FB.api('/me', function(response) {
userInfo.innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name;
fb.innerHTML = 'Connected';
document.getElementById('fbswitch').checked = true;
});
//get friends
/*FB.api('/me/taggable_friends?limit=5000', function(response) {
var result_holder = document.getElementById('result_friends');
var friend_data = response.data.sort(sortMethod);
var results = '';
for (var i = 0; i < friend_data.length; i++) {
results += '<div><img src="'+response.data[i].picture.data.url+'"/>' + friend_data[i].name + '</div><input type="hidden" value="'+friend_data[i].id+'">';

}
// and display them at our holder element
//result_holder.innerHTML = '<h2>Result list of your friends:</h2>' + results;
});*/
suisfb.onclick = function() {
FB.logout(function(response) {
window.location.reload();
document.getElementById('fbswitch').checked = false;

});
};
} else { // otherwise - dispay login button
suisfb.onclick = function() {
FB.login(function(response) {
if (response.authResponse) {
window.location.reload();

}
}, {scope:'email'});
}
}
}
// run once with current status and whenever the status changes
FB.getLoginStatus(updateButton);
FB.Event.subscribe('auth.statusChange', updateButton);    
};
(function() {
var e = document.createElement('script'); e.async = true;
e.src = document.location.protocol + '//connect.facebook.net/en_US/all.js';
document.getElementById('fb-root').appendChild(e);

}());
//end fb connection script