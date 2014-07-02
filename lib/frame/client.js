// Client.js bakechat clientside javascript lib

function getCookie(c_name)
{
    var i,x,y,ARRcookies=document.cookie.split(";");

    for (i=0;i<ARRcookies.length;i++)
    {
        x=ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
        y=ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
        x=x.replace(/^\s+|\s+$/g,"");
        if (x==c_name)
        {
            return unescape(y);
        }
     }
}

function checkpassword(input){
	if(input != $('#rpass').val()){
		input.setCustomValidity('The two passwords must match.');
	} else {
		input.setCustomValidity('');
		$('#rpass').focus();
		input.focus();
	}
}

//tabs logic
var app = angular.module('chat', ['ui.bootstrap']);
var autoscroll = true;
$(window).scroll(function() {
    var scrollfrombottom = $(document).height() - $(window).height() - $(window).scrollTop();

    if(scrollfrombottom  > 300) {
        autoscroll = false;
    }
	else
	{
	    autoscroll = true;
	}
});

app.controller("TabsParentController", function ($scope) {
 
    var setAllInactive = function() {
        angular.forEach($scope.workspaces, function(workspace) {
            workspace.active = false;
        });
    };
 
    var addNewWorkspace = function() {
        var id = $scope.workspaces.length + 1;
        $scope.workspaces.push({
            id: id,
            name: "Chat " + id,
            active: true
        });
    };
 
    $scope.workspaces =
    [
        // { id: 1, name: "chat", active:true },
    ];
 
    $scope.addWorkspace = function () {
        setAllInactive();
        addNewWorkspace();
    };       
 
});

app.controller ("TabsChildController", function($scope, $log){
  
});

$("#message").focus(function(){
  this.selectionStart = this.selectionEnd = this.value.length;
});

function keyHandler(event) {
if(message.value != "") {
		if (event.keyCode == 13 && !event.shiftKey) {
		event.preventDefault();
		$("#submit").click();
		  return false;
		}
	}
};

function killwhisper() {
$('#hdnwspr').val(""); 
$('#totagcontainer').hide('slow','easeOutBounce');
};
//function makeWhisper=============================================================================
function makeWhisper(user) {
// message.value = "/w " + user + " " + message.value;
user = user.replace("To ","");
$('#totag').html("To " + user);
$('#hdnwspr').val("/w " + user);
$('#totagcontainer').show('slow','easeOutBounce');
return false;
};
//function makeTags()=============================================================================
function makeTags()
{
//message.style.fontFamily = txtfont.options[txtfont.selectedIndex].text;
msg = message.value;
//if(raw.checked)
//{ 
//document.getElementById('chat').contentWindow.settextCopy("<?php echo "<img class='avataricon' src='" . $avatar .  "'>" ?>" + msg);
//FitToContent(message, document.documentElement.clientHeight);
//return; 
//}
msg = msg.split("\n").join("<br>");
if(msg.indexOf("!ding!") != -1)
{
msg = msg.replace('!ding!', '<input type=\'button\' onclick=\'sndding.play();\' value=\'Play Ding\'/><scri' + 'pt type=\'text/javas' + 'cript\'> if(notify.checked){ sndding.' + 'play(); }<' + '/sc' + 'ript>');
}
if(msg.indexOf("!easy!") != -1)
{
msg = msg.replace('!easy!', '<input type=\'button\' onclick=\'sndeasy.play();\' value=\'Play Easy\'/><scri' + 'pt type=\'text/javas' + 'cript\'> if(notify.checked){ sndeasy.' + 'play(); }<' + '/sc' + 'ript>');
}
if(((msg.indexOf(".png") != -1) || (msg.indexOf(".jpg") != -1) || (msg.indexOf(".gif") != -1) || (msg.indexOf("http") != -1)) && ((msg.indexOf("://youtube.com") == -1) || ((msg.indexOf("://youtu.be") == -1))))
{
msg = urlify(msg);
}
//http://youtu.be/itvJybdcYbI
    if(msg.indexOf("://youtu.be/") != -1)
{
msg = msg.replace("https://","http://");
msg = msg.replace("http://youtu.be/","<iframe class='youtube' height='50' src='http://www.youtube.com/embed/");
if(msg.indexOf(".com/embed/") != -1)
{
var ytnum = msg.substring((msg.indexOf(".com/embed/")+11),(msg.indexOf(".com/embed/")+22));
msg = msg.replace(ytnum,ytnum + "' frameborder='0' allowfullscreen seamless>" + message.value + "</iframe>");
}
}
if(msg.indexOf("rickastar") != -1)
{
msg = msg.replace("rickastar","<img src='images/rickstar.png' height='100'/>");
}
if(msg.indexOf("filthyrick") != -1)
{
msg = msg.replace("filthyrick","<img src='images/rick.png' height='100'/>");
}
if(msg.indexOf("bakefail") != -1)
{
msg = msg.replace("bakefail","<img src='images/bake.png' height='100'/>");
}

//<?php include 'emotes.php'; ?>
msg = getemotes(msg);
msg = getJCemotes(msg);
msg = hashtags(msg);

FitToContent(message, document.documentElement.clientHeight);
$('#preview').html(
'<div class="bubble notrans" style="background-color:' + $('#pbarcolor').val() + ';color:' + $('#ppanelcolor').val() + ';">' + 
								'<img class="avataricon" src="' + 
								$('#useravatar').attr('src') + 
								'" height="30px" /><b>' + 
								$('#nickname').val() + 
								': </b><span class="innerbubble" style="background-color:' + $('#pbubblecolor').val() + ';color:' + $('#ptxtcolor').val() + 
								';font-family:' + $("#txtfont").val() + 
								';">' + 
								msg + 
								"</span><br><span class='timestamp'>Preview</span></div>"
);
if(msg != "") {
$('#preview').show("slow","easeOutBounce");
}
else{
$('#preview').hide("slow","easeOutBounce");
}
};

//function urlify(text)==============================================================================================
function urlify(text) { 

//    var rawText = strip(text)
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;()]*[-A-Z0-9+&@#\/%=~_|])/ig;   

    return text.replace(urlRegex, function(url) {   
    if ((url.indexOf("youtube.com") > 0) || (url.indexOf("youtu.be") > 0)){
url = url.replace("https://","http://");
if (url.indexOf("youtube.com") > 0){
url = url.replace("https://www.youtube.com","http://www.youtube.com");
url = url.replace("http://www.youtube.com/watch?v=","<iframe class='youtube' height='50' src='http://www.youtube.com/embed/");
if(url.indexOf(".com/embed/") != -1)
{
var ytnum = url.substring((url.indexOf(".com/embed/")+11),(url.indexOf(".com/embed/")+22));
url = url.replace(ytnum,ytnum + "' frameborder='0' allowfullscreen seamless></iframe>");
}
}
else 
{
url= url.replace("http://youtu.be/","<iframe class='youtube' height='50' src='http://www.youtube.com/embed/");
if(url.indexOf(".com/embed/") != -1)
{
var ytnum = url.substring((url.indexOf(".com/embed/")+11),(url.indexOf(".com/embed/")+22));
url= url.replace(ytnum,ytnum + "' frameborder='0' allowfullscreen seamless></iframe>");
}
}
            return url;    
    }
    else if ( ( url.indexOf(".jpg") > 0 ) || ( url.indexOf(".png") > 0 ) || ( url.indexOf(".gif") > 0 ) ) {
			return "<a href='" + url + "' target='_blank'><img src='" + url + "' height='150'/></a>";
        } else {
            return "<a href='" + url + "' target='_blank'>" + url + "</a>";
        }
    }) 
};

//function FitToContent(id, maxHeight)=============================================================================
function FitToContent(id, maxHeight)
{
   var text = id && id.style ? id : document.getElementById(id);
   if ( !text )
      return;

   /* Accounts for rows being deleted, pixel value may need adjusting */
   if (text.clientHeight == text.scrollHeight) {
      text.style.height = "20px";
   }       

   var adjustedHeight = text.clientHeight;
   if ( !maxHeight || maxHeight > adjustedHeight )
   {
      adjustedHeight = Math.max(text.scrollHeight, adjustedHeight);
      if ( maxHeight )
         adjustedHeight = Math.min(maxHeight, adjustedHeight);
      if ( adjustedHeight > text.clientHeight )
         text.style.height = adjustedHeight + "px";
   }
}

//======================================================================================================Save settings
function savesettings() {

var user = $('#nickname').val();
var pic = $('#avatarurl').val();
var barvatar = $('#barvatarurl').val();
var historyhours = $('#history').val();

prefs = ""
var iconsize=document.getElementById("iconsize");
prefs += "pic=" + iconsize.selectedIndex + "&"; 
var barsize=document.getElementById("barsize");
prefs += "bar=" + barsize.selectedIndex + "&";
prefs += "system=1&";
prefs += "bubble=" + $('#pbubblecolor').val() + "&";
var bubbletype=document.getElementById("bubbletype");
prefs += "btype=" + bubbletype.selectedIndex + "&";
prefs += "txtcolor=" + $("#ptxtcolor").val() + "&";
var txtsize=document.getElementById("txtsize");
prefs += "txtsize=" + txtsize.selectedIndex + "&";
prefs += "bgcolor=" + $('#pbgcolor').val() + "&";
prefs += "panelcolor=" + $('#ppanelcolor').val() + "&";
prefs += "barcolor=" + $('#pbarcolor').val() + "&";
prefs += "txtfont=" + txtfont.selectedIndex + "&";
prefs += "bold=" + ($("#bold").checked ? 1 : 0) + "&";
prefs += "italic=" + ($("#italic").checked ? 1 : 0) + "&";
prefs += "underline=" + ($("#underline").checked ? 1 : 0) + "&";
prefs += "userstyle=" + ($("#userstyle").checked ? 1 : 0) + "&";
prefs += "showusernames=" + ($("#showusernames").checked ? 1 : 0) + "&";

if($('#avatarurl').val() == ""){ pic = "images/chat.png"; } else { pic = $('#avatarurl').val(); };
if($('#barvatarurl').val() == ""){ barvatar = "images/equalizer.gif"; } else { barvatar = $('#barvatarurl').val(); };
if($('#history').val() == "") { historyhours = 3; } else { historyhours = $('#history').val(); };
prefs += 'historyhours=' + (isNaN(historyhours) ? 3 : historyhours)  + '&';

prefs += "wallpaper=" + $('#wallpaperurl').val() + "&";
message.style.fontFamily = txtfont.options[txtfont.selectedIndex].text;
console.log('setting saved (username:' + user + '\navatar:' + pic + '\nprefs:' + prefs + ")");
socket.emit('save prefs', prefs, function(data) {
console.log(data);
$('.username').css("background-color",$('#pbubblecolor').val()).css("color",$('#ptxtcolor').val());
$(".cssMenu li, input[type='checkbox']").css("background-color",$('#pbubblecolor').val()).css("color",$('#ptxtcolor').val());
$('.cssMenu a').css("color",$('#ptxtcolor').val());
$('.cssMenu ul').css("background-color",$('#ppanelcolor').val());
});
}
//======================================================================================================Save settings