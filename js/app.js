window.onload = function() {
   var c =document.getElementById("canvas");
   var ctx = c.getContext("2d");
   var img = document.getElementById("bb");
   ctx.drawImage(img, 0, 0);
};
