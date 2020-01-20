var captchaValue;
function generateCaptcha() {
  document.getElementById('captchaCanvasContainer').innerHTML = "";

  var op = ['+', '-', '*', '/'];
  var opindex = Math.floor((Math.random() * 4));
  var operator = op[opindex];
  var x = Math.floor((Math.random() * 10));
  var y = Math.floor((Math.random() * 10));
  if (opindex == 3) {
    if (y == 0 || x % y != 0) {
      while (y == 0 || x % y != 0) {
        x = Math.floor((Math.random() * 10));
        y = Math.floor((Math.random() * 10));
      }
    }
  }
  switch (opindex) {
    case 0:
      res = x + y;
      break;
    case 1:
      res = x - y;
      break;
    case 2:
      res = x * y;
      break;
    case 3:
      res = x / y;
      break;
  }

  var string1 = ""+ x + operator + y + '=  ?';
  captchaValue = string1;

  var canv = document.createElement("canvas");
  canv.id = "captchaCanvas";
  canv.width = 70;
  canv.height = 50;
  var ctx = canv.getContext("2d");
  ctx.font = "20px Georgia";
  ctx.fillStyle = "white";
  ctx.fillText(string1, 0, 20);

  document.getElementById("captchaCanvasContainer").appendChild(canv);

  return false;
}

function displayOtherInterestCheckbox(){
    var checkBox = document.getElementById("checkboxOtherInterests");
    var txtOtherInterests = document.getElementById("txtOtherInterests");

    if (checkBox.checked == true){
        txtOtherInterests.style.display = "block";
    } else { 
        txtOtherInterests.style.display = "none";
    }
}























// var code;
// function createCaptcha() {
//   //clear the contents of captcha div first 
//   document.getElementById('captcha').innerHTML = "";
//   var charsArray =
//   "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
//   var lengthOtp = 6;
//   var captcha = [];
//   for (var i = 0; i < lengthOtp; i++) {
//     //below code will not allow Repetition of Characters
//     var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
//     if (captcha.indexOf(charsArray[index]) == -1)
//       captcha.push(charsArray[index]);
//     else i--;
//   }
//   var canv = document.createElement("canvas");
//   canv.id = "captcha";
//   canv.width = 100;
//   canv.height = 50;
//   var ctx = canv.getContext("2d");
//   ctx.font = "25px Georgia";
//   ctx.strokeText(captcha.join(""), 0, 30);
//   //storing captcha so that can validate you can save it somewhere else according to your specific requirements
//   code = captcha.join("");
//   document.getElementById("captcha").appendChild(canv); // adds the canvas to the body element
// }
// function validateCaptcha() {
//   event.preventDefault();
//   debugger
//   if (document.getElementById("cpatchaTextBox").value == code) {
//     alert("Valid Captcha")
//   }else{
//     alert("Invalid Captcha. try Again");
//     createCaptcha();
//   }
// }
