// function paste(event) {
  // // use event.originalEvent.clipboard for newer chrome versions
  // var clipboardData = event.clipboardData  ||  event.originalEvent.clipboardData;
  // var items = clipboardData.items;
  // console.log(JSON.stringify(items)); // will give you the mime types
  // // find pasted image among pasted items
  // var blob;
  // for (var i = 0; i < items.length; i++) {
    // if (items[i].type.indexOf("image") === 0) {
      // blob = items[i].getAsFile();
    // }
  // }
  // // load image if there is a pasted image
  // if (blob !== null) {
    // var reader = new FileReader();
    // reader.onload = function(event) {
      // //console.log(event.target.result); // data url!
      // document.getElementById("pastedImage").src = event.target.result;
	  // $('#thumbnail').show();
      // var un = $("#nickname").val();
      // var img = event.target.result; //.replace("data:image/png;base64,","");
      // console.log(img);
	  // // socket.emit("upload image",{username: un, image: img}, function(data){
	  // // $("#message").val(data);
	  // // });
	  
	   // $.ajax({
	 // type: "POST",
	 // url: "http://bakechat.com/uploader.php",
	 // data: { 'username': un, 'img': img },
	 // cache: false,
	 // success: function(html)
         // {
             // message.value += html;
         // }
// });
    // };
    // reader.readAsDataURL(blob);
  // }
// };


function paste(event) {
  // use event.originalEvent.clipboard for newer chrome versions
  var clipboardData = event.clipboardData  ||  event.originalEvent.clipboardData;
  var items = clipboardData.items;
  console.log(JSON.stringify(items)); // will give you the mime types
  // find pasted image among pasted items
  var blob;
  for (var i = 0; i < items.length; i++) {
    if (items[i].type.indexOf("image") === 0) {
      blob = items[i].getAsFile();
    }
  }
  // load image if there is a pasted image
  if (blob !== null) {
    var reader = new FileReader();
    reader.onload = function(event) {
      console.log(event.target.result); // data url!
      document.getElementById("pastedImage").src = event.target.result;
	  $('#thumbnail').show();
      var un = $("#nickname").val();
      var img = event.target.result.replace("data:image/png;base64,","");
//uploadcanvas();
      // $.ajax({
	// type: "POST",
	// url: "http://bakechat.com/uploader.php",
	// data: { 'username': un, 'img': img },
	// cache: false,
	// success: function(html)
        // {
            // message.value += html;
        // }
//});
    };
    reader.readAsDataURL(blob);
  }
};

function uploadcanvas(){
      $.ajax({
	type: "POST",
	url: "http://bakechat.com/uploader.php",
	data: { 'username': $("#nickname").val(), 'img': document.getElementById("pastedImage").src.replace("data:image/png;base64,","") },
	cache: false,
	success: function(html)
        {
            message.value += html;
			makeTags();
        }
});
}