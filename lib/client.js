// Client.js bakechat clientside javascript lib

////drawing functions
//(function() {
//  var App;
//  App = {};
//  /*
//  	Init 
//  */
//  App.init = function() {
//    App.canvas = document.createElement('canvas');
//    App.canvas.height = 400;
//    App.canvas.width = 800;
//    document.getElementsByTagName('article')[0].appendChild(App.canvas);
//    App.ctx = App.canvas.getContext("2d");
//    App.ctx.fillStyle = "solid";
//    App.ctx.strokeStyle = "#000";
//    App.ctx.lineWidth = 5;
//    App.ctx.lineCap = "round";
//    App.socket = io.connect('http://localhost:4000');
//    App.socket.on('draw', function(data) {
//      return App.draw(data.x, data.y, data.type);
//    });
//    App.draw = function(x, y, type) {
//      if (type === "dragstart") {
//        App.ctx.beginPath();
//        return App.ctx.moveTo(x, y);
//      } else if (type === "drag") {
//        App.ctx.lineTo(x, y);
//        return App.ctx.stroke();
//      } else {
//        return App.ctx.closePath();
//      }
//    };
//  };
//  /*
//  	Draw Events
//  */
//  $('canvas').live('drag dragstart dragend', function(e) {
//    var offset, type, x, y;
//    type = e.handleObj.type;
//    offset = $(this).offset();
//    e.offsetX = e.layerX;// - offset.left;
//    e.offsetY = e.layerY;// - offset.top;
//    x = e.offsetX;
//    y = e.offsetY;
//    App.draw(x, y, type);
//    App.socket.emit('drawClick', {
//      x: x,
//      y: y,
//      type: type
//    });
//  });
//  $(function() {
//    return App.init();
//  });
//}).call(this);


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
    $(".messageTool").show('slow','easeOutBounce');
});

$("#message").blur(function(){
    $(".messageTool").hide('slow','easeOutBounce');
});

function keyHandler(event) {
if(message.value != "") {
		if (event.keyCode == 13 && !event.shiftKey) {
		event.preventDefault();
		sendMessage();
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
    //msg = msg.replaceAll(".JPG",".jpg").replaceAll(".jpeg",".jpg").replaceAll(".GIF",".gif").replaceAll(".PNG",".png").replaceAll(".MP4",".mp4").replaceAll(".AVI",".avi").replaceAll(".MPG",".mpg");
if(msg.indexOf("!ding!") != -1)
{
msg = msg.replace('!ding!', '<input type=\'button\' onclick=\'sndding.play();\' value=\'Play Ding\'/><scri' + 'pt type=\'text/javas' + 'cript\'> if(notify.checked){ sndding.' + 'play(); }<' + '/sc' + 'ript>');
}
if(msg.indexOf("!easy!") != -1)
{
msg = msg.replace('!easy!', '<input type=\'button\' onclick=\'sndeasy.play();\' value=\'Play Easy\'/><scri' + 'pt type=\'text/javas' + 'cript\'> if(notify.checked){ sndeasy.' + 'play(); }<' + '/sc' + 'ript>');
}
if(((msg.indexOf(".png") != -1) || (msg.indexOf(".jpg") != -1) || (msg.indexOf(".gif") != -1) || (msg.indexOf("http") != -1)) && ((msg.indexOf("://youtube.com") == -1) || ((msg.indexOf("://youtu.be") == -1)) || ((msg.indexOf(".mp4") == -1)) || ((msg.indexOf(".avi") == -1)) || ((msg.indexOf(".mpg") == -1))))
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
								': </b><br><span class="timestamp">Preview</span><div class="innerbubble" style="background-color:' + $('#pbubblecolor').val() + ';color:' + $('#ptxtcolor').val() + 
								';font-family:' + $("#txtfont").val() + 
								';">' + 
								msg + 
								"</div></div>"
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
if((text.indexOf("<object") > 0) || (text.indexOf("grooveshark.com") > 0))
    return text;
//    var rawText = strip(text)
    var urlRegex =/(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;()]*[-A-Z0-9+&@#\/%=~_|])/ig;   

    return text.replace(urlRegex, function(url) {  
        url = url.toLowerCase();
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
        }
        else if ( ( url.indexOf(".mp4") > 0 )) {
			return "<video height='240' controls><source src='" + url + "' type='video/mp4'>Your browser does not support the video tag.</video>";
        } 
        else if ( ( url.indexOf(".avi") > 0 )) {
			return "<video height='240' controls><source src='" + url + "' type='video/avi'>Your browser does not support the video tag.</video>";
        } 
        else {
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
var mode = 1;
function toggleMode(){
if(mode == 1){
$('body').css('transition','all 1s').css('-webkit-transition','all 1s');//	transition: all 1s;	-webkit-transition: all 1s;
$('#chat').css('width','300px').css('left','10px').css('font-size','90%').css('bottom','50px').css('border-radius','10px').css('height','50%').css('background-color','rgba(0,0,0,0.5)').css('transition','all 1s').css('-webkit-transition','all 1s'); //border-top-left-radius: 10px;border-top-right-radius: 10px;
$('.bubble').css('padding','0px 3px 0px 10px'); //padding:0px 3px 0px 10px;
$('#messagesdiv').css('margin-left','10px').css('width','300px').css('padding','0px');
$('textarea').css('width','290px').css('transition','all 1s').css('-webkit-transition','all 1s');
$('#totagcontainer > div').css('left','303px').css('transition','all 1s').css('-webkit-transition','all 1s');
$('#totag').css('left','300px').css('transition','all 1s').css('-webkit-transition','all 1s');
$('.timestamp').hide('slow', function(){
//scrolldown();
});
$('body').css('transition','all 0s').css('-webkit-transition','all 0s');
mode = 2;
//$('#chat').hide();
$('#chat').show('slow',function(){
$("#chat").animate({ scrollTop: document.getElementById("chat").scrollHeight }, 2000);
});
}
else{
$('body').css('transition','all 1s').css('-webkit-transition','all 1s');//	transition: all 1s;	-webkit-transition: all 1s;
$('#chat').css('width','100%').css('left','0px').css('font-size','100%').css('bottom','60px').css('border-radius','0px').css('height','90%').css('background-color','rgba(0,0,0,0)').css('transition','all 1s').css('-webkit-transition','all 1s');
$('.bubble').css('padding','3px 3px 3px 30px');
$('#messagesdiv').css('margin-left','auto').css('width','510px').css('padding','5px 5px');
$('textarea').css('width','500px').css('transition','all 1s').css('-webkit-transition','all 1s');
$('#totagcontainer > div').css('left','513px').css('transition','all 1s').css('-webkit-transition','all 1s');
$('#totag').css('left','510px').css('transition','all 1s').css('-webkit-transition','all 1s');
$('.timestamp').show('slow', function(){
scrolldown();
});
$('body').css('transition','all 0s').css('-webkit-transition','all 0s');
mode = 1;
scrolldown();
}
$('textarea').css('transition','all 0s').css('-webkit-transition','all 0s');
}

function scrolldown(){
			var objDiv = document.getElementById("chat");
			var objWhisp = document.getElementById("whispers");
				if(autoscroll)
				{
					objDiv.scrollTop = objDiv.scrollHeight;
					objWhisp.scrollTop = objWhisp.scrollHeight;
				}
					message.focus();
			}




