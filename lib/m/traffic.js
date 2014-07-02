// traffic.js
var msgsnd = new Audio("sounds/himetal.wav");
var wspsnd = new Audio("sounds/whisper.wav");
var socket = io.connect();
// if (window.webkitNotifications.checkPermission() == 0) {
// var notification_test = window.webkitNotifications.createNotification("","","");
// }
	var msg = "";
	//document.domain = 'localhost';
			function startCAH(){
			$('#answer').html("");
			io.connect().emit('start game', $('#nickname').val(), function(data){
				});
			}
		jQuery(function($){
			var $nickForm = $('#setNick');
			var $nickError = $('#nickError');
			var $nickBox = $('#nickname');
			var $password = $('#password');
			var $users = $('#users');
			var $messageForm = $('#send-message');
			var $messageBox = $('#message');
			var $chat = $('#chat');
			var $question = $('#question');
			var $answers = $('#answer');
			var $emailform = $('#emailform');
			var $passwordform = $('#passwordform');
			var $lastWisper = "";

			$passwordform.submit(function(e){
				e.preventDefault();
				var newpassword = $("#newpassword").val();
				var confirmnewpassword = $("#confirmnewpassword").val();
				
				
				console.log('setting saved (email:' + password + ")");
				socket.emit('save password', password);
			});
			
			$emailform.submit(function(e){
				e.preventDefault();
				var email = $("#email").val();
				console.log('setting saved (email:' + email + ")");
				socket.emit('save email', email);
			});
			
			$nickForm.submit(function(e){
			// if(window.chrome) { window.webkitNotifications.requestPermission(); }
			$('#fish').show();
				e.preventDefault();
				socket.emit('new user', { nickname: $nickBox.val(),password: $password.val() }, function(data){
				$('#fish').hide();
					if(data.ok == true){
						$('#nickWrap').hide();
						$('#MOTD').hide();
						// $('#CAH').show();
						$('#contentWrap').show();
						$('.menu').show();
						$('#messagesdiv').show();
						$('.menudiv').hide();
						message.focus();
						$("#useravatar").attr('src',data.useravatar).attr('height','60');
						$("#username").html($nickBox.val());
						setInterval(keepalive, 1000*60*5);
					try {
							var pref = {};
							parse_str(data.prefs, pref); 
							$('#useravatarcont').css("background-image","url('" + data.barvatar + "')").css("background-repeat","no-repeat").css("background-position","center center");
							$('body').css("background-image","url('" + pref['wallpaper'] + "')").css("background-repeat","no-repeat").css("background-position","center center");
							$('#message').css("background-color",pref['bubble']).css("color",pref['txtcolor']);
							$('#messagesdiv').css("background-color",pref['panelcolor']);
							$('body').css("background-color",pref['bgcolor']).css("color",pref['txtcolor']);
							$('.username').css("background-color",pref['bgcolor']).css("color",pref['txtcolor']);
							$(".cssMenu li, input[type='checkbox']").css("background-color",pref['bubble']).css("color",pref['txtcolor']);
							$('.cssMenu a').css("color",pref['txtcolor']);
							$('.cssMenu ul').css("background-color",pref['panelcolor']);
							$('#history').val(pref['historyhours']);
							$('#result').html(pref['historyhours']);
							$('#avatarurl').val(data.useravatar);
							$('#barvatarurl').val(data.barvatar);
							$('#wallpaperurl').val(pref['wallpaper']);
							$('::-webkit-scrollbar-thumb:vertical').css('background-color',pref['barcolor']);
							
							$('#pbgcolor').val(pref['bgcolor']);
							$('#ppanelcolor').val(pref['panelcolor']);
							$('#pbubblecolor').val(pref['bubble']);
							$('#pbarcolor').val(pref['barcolor']);
							
							$('#ptxtcolor').val(pref['txtcolor']);
							
							iconsize.selectedIndex = pref['pic'];
							barsize.selectedIndex = pref['bar'];
							bubbletype.selectedIndex = pref['btype'];
							txtsize.selectedIndex = pref['txtsize'];
							txtfont.selectedIndex = pref['txtfont'];
							
							$('#email').val(data.email);
						}
						catch(err) {
							console.log("Failed to load prefs: " + err);
						}
					} else{
					if(data.error == 1)	{
						$nickError.html('You were already logged in somewhere else. Try again.');
						}
					if(data.error == 2)	{
						$nickError.html('You must enter a password');
						}
					if(data.error == 3)	{
						$nickError.html('Incorrect password');
						}
					if(data.error == 4)	{
						$nickError.html('That username does not exist <input type="button" value="Register" onclick="alert(\'Registration page is not finished yet\')">');
						}
					}
				});
				//$nickBox.val('');
			});
			
			socket.on('question', function(data){
				var html = '';
				$question.html(data);
				$answers.html("");
			});
			
			socket.on('answers', function(data){
				var html = '';
				//for(var i=0; i <= data.length-1; i++){
					$answers.append(data);
				//}
			});
			
			socket.on('usernames', function(data,avatars){
				var html = '';
				var inGuestList = false;
					for(var i=0; i < data.length; i++){
					if(data[i] == $nickBox.val()) {
							inGuestList = true;
						}
						html += "<div class='username' onclick=\"message.value = '/w " + data[i] + " " + "' + message.value; message.focus();\">" + data[i] + "</div>";
					}
				$users.html(html);
				if(!inGuestList){
					location.reload();
				}

			});
			
			$messageForm.submit(function(e){
				e.preventDefault();
				makeTags();
				if(msg.substr(0,3) === '/r '){
					if(($lastWhisper != '') && ($lastWhisper != document.getElementById('nickname').value))
						msg = msg.replace('/r ', '/w ' + $lastWhisper.replace("To ","") + ' ');
				}
				socket.emit('send message', msg, function(data){
					$chat.append('<span class="error">' + data + "</span><br/>");
					msgsnd.play();
					scrolldown();
				});
				$messageBox.val('');
			});
			
			socket.on('load old msgs', function(docs){
				for(var i=docs.length-1; i >= 0; i--){
					displayMsg(docs[i]);
				}
				scrolldown();
			});
			
			socket.on('new message', function(data){
				displayMsg(data);
				msgsnd.play();
				scrolldown();
			});
			
			socket.on('system', function(data){
				$chat.append('<span class="system">' + data.msg + "</span><br/>");
				scrolldown();
			});			

			socket.on('reload', function(data){
				$chat.append('<span class="error">' + data.err + "</span><br/>");
				scrolldown();
				location.reload();
			});	
			
			socket.on('keepalive', function(data){
				if(data){ console.log("keepalive recieved"); } else { location.reload(); }
			});	
			
			function displayMsg(data){
				var pref = {};
				parse_str(data.prefs, pref); 
				$chat.append('<div id="' + data.id + '"class="bubble" style="background-color:' + pref['barcolor'] + ';color:' + pref['panelcolor'] + ';">' + 
								'<img class="avataricon" src="' + 
								data.avatar + 
								'" height="30px" /><b onclick=\"message.value = \'/w ' + 
								data.nick + " " + 
								'\' + message.value; message.focus();\">' + 
								data.nick + 
								': </b><span class="innerbubble" style="background-color:' + pref['bubble'] + 
								';color:' + pref['txtcolor'] + 
								';font-family:' + $("#txtfont option").eq(pref['txtfont']).val() + 
								';">' + 
								data.msg + 
								"</span><br><span class='timestamp'>" + 
								data.timestamp.split(" ").join("@") + 
								"</span></div>"
								);
	            window.top.document.title = data.nick + " posted";
				setpageicon(data.avatar);
				scrolldown();
			}
			
			socket.on('whisper', function(data){
				$chat.append('<div class="whisper"><img src=\"' + data.avatar + '\" style=\"height:30px;\" /><b>' + data.nick + ': </b>' + data.msg + "</div><br/>");
				wspsnd.play();
				scrolldown();
				if(data.nick !== document.getElementById('nickname').value)
				{
				$lastWhisper = data.nick
				}
				// if (window.webkitNotifications) 
	            // {
	                // if (window.webkitNotifications.checkPermission() == 0) { // 0 is PERMISSION_ALLOWED
	                    // if(notification_test != undefined)
	                    // { notification_test.close(); }
						// notification_test = window.webkitNotifications.createNotification(data.avatar, data.nick + ' posted', data.msg);
						// if(data.nick.indexOf("To ") < 0){
						// notification_test.show();
						// }
					// }
				// }
			});
			
		    function setpageicon(icon) {
				$('#favicon').remove();
				$('head').append('<link href="' + icon + '" id="favicon" rel="shortcut icon">');
			};
			
			function scrolldown(){
			var objDiv = document.getElementById("chat");
		    //var scrollfrombottom = $(document).height() - $(window).height() - $(window).scrollTop();
				//if(scrollfrombottom  > 300) {
				if(autoscroll)
				{
					objDiv.scrollTop = objDiv.scrollHeight;
				}
					message.focus();
				//}
			}
		});

			function keepalive() {
				socket.emit('keepalive',$('#nickname').val(), function(data){
				if(data){ console.log("keepalive sent"); } else { location.reload(); }
				});
			}
