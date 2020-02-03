$.validator.addMethod(
   "regex",
   function(value, element, regexp) {
       var check = false;
       return this.optional(element) || regexp.test(value);
   }
);

$(function() {
   var data, captchaString, captchaValue;
   var countryStateInfo = {
      "USA": {
         "California": {
            "Los Angeles": ["90001", "90002", "90003", "90004"],
            "San Diego": ["92093", "92101"]
         },
         "Texas": {
            "Dallas": ["75201", "75202"],
            "Austin": ["73301", "73344"]
         }
      },
      "India": {
         "Assam": {
            "Dispur": ["781005"],
            "Guwahati" : ["781030", "781030"]
         },
         "Gujarat": {
            "Vadodara" : ["390011", "390020"],
            "Surat" : ["395006", "395002"]
         }
      }
   };

   function captchaGenerator(){
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

      var captchaString = ""+ x + operator + y + '=  ?';

      return {captchaString: captchaString, captchaValue: res};
   }

   function generateCanvas(captchaString){
      var canv = $('#captchaCanvas')[0];
      canv.width = 180;
      canv.height = 50;
      var ctx = canv.getContext("2d");
      ctx.textAlign = "left";
      ctx.font = "24px Georgia";
      ctx.fillStyle = "black";
      ctx.fillText(captchaString, 40, 30);
   }

   function generateCaptcha(){
   data = captchaGenerator();
   captchaString = data.captchaString;
   captchaValue = data.captchaValue;
   $('#captchaHiddenAnswer').val(captchaValue);
   generateCanvas(captchaString);
   }

   generateCaptcha();

   $("#captchaRefresh").bind('click',generateCaptcha);

   $("#currentCountry").on('change',function(){ 
      $("#currentState").children('option:not(:first)').remove();
		 
		 for (var state in countryStateInfo[this.value]) {
         $("#currentState").append(new Option(state,state));
		 }
   });

   $("#currentState").on('change',function(){
      $("#currentCity").children('option:not(:first)').remove();
      
      for (var city in countryStateInfo[$("#currentCountry")[0].value][this.value]){
         $("#currentCity").append(new Option(city,city));
      }
   });

   $("#currentCity").on('change',function(){
      $("#currentZipCode").children('option:not(:first)').remove();

      var zips = countryStateInfo[$("#currentCountry")[0].value][$("#currentState")[0].value][this.value];
      
      for (var i=0; i < zips.length; i++){
         $("#currentZipCode").append(new Option(zips[i],zips[i]));
      }
   });

   $("#country").on('change',function(){ 
      $("#state").children('option:not(:first)').remove();
		 
		 for (var state in countryStateInfo[this.value]) {
         $("#state").append(new Option(state,state));
		 }
   });

   $("#state").on('change',function(){
      $("#city").children('option:not(:first)').remove();
      
      for (var city in countryStateInfo[$("#country")[0].value][this.value]){
         $("#city").append(new Option(city,city));
      }
   });

   $("#city").on('change',function(){
      $("#zipcode").children('option:not(:first)').remove();

      var zips = countryStateInfo[$("#country")[0].value][$("#state")[0].value][this.value]
      
      for (var i=0; i < zips.length; i++){
         $("#zipcode").append(new Option(zips[i],zips[i]));
      }
   });

   $("input[id='copyCurrentAddress']").click(function(){
      if ($(this).is(':checked')){
         $("#permanentAddress").val($("#currentAddress").val());
         $("#country").val($("#currentCountry").val()).change();
         $("#state").val($("#currentState").val()).change();
         $("#city").val($("#currentCity").val()).change();
         $("#zipcode").val($("#currentZipCode").val());
      }
      else
      {
         $("#permanentAddress").val("");
         $("#country").val("");
         $("#state").val("");
         $("#city").val("");
         $("#zipcode").val("");
      }
   });

   $("#checkboxOtherInterests").on('change',function(){
      if ($(this).is(':checked')){
         $("#txtOtherInterests").show();
      }else{
         $("#txtOtherInterests").hide();
      }
   });
   // Initialize form validation on the registration form.
   $("form").validate({
     // Validation rules
     rules: {
       firstName: {
          required: true,
          regex: /^[a-zA-Z]+$/
       },
       middleName: {
          regex: /^[a-zA-Z]+$/
       },
       lastName: {
          required: true,
          regex: /^[a-zA-Z]+$/
       },
       email: {
         required: true,
         email: true
       },
       password: {
         required: true,
         minlength: 8,
         regex: /(?=.*?[0-9])(?=.*?[A-Za-z]).+/
       },
       confirmPassword: {
         required: true,
         equalTo: "#password"
       },
       currentAddress: "required",
       currentCountry: "required",
       currentState: "required",
       currentCity: "required",
       currentZipCode: "required",
       dob: {
          required: true,
          regex: /^([0-9]{4})-([0-9]{2})-([0-9]{2})$/
       },
       captchaAnswer: {
          required: true,
          equalTo: "#captchaHiddenAnswer"
       }
     },
     // Specify validation error messages
     messages: {
       firstName: {
          required: "Please enter your first name",
          regex: "Name should be in alphabets only"
       },
       middleName: {
          regex: "Name should be in alphabets only"
       },
       lastName: {
          required: "Please enter your lastname",
          regex: "Name should be in alphabets only"
         },
       email: {
         required: "Please enter a valid email address"
         },
       password: {
         required: "Please provide a password",
         minlength: "Your password must be at least 8 characters long",
         regex: "password must include atleast 1 character and 1 digit"
       },
      confirmPassword: {
         required: "Please re-type the password",
         equalTo: "Password did not match"
      },
      currentAddress: {
         required: "Please enter your current"
      },
       currentCountry: { 
         required: "Please select one of the options"
       },
       currentState: {
         required: "Please select one of the options"
      },
       currentCity:{
          required: "Please select one of the options"
       },
       currentZipCode: {
          required: "Please select one of the options"
       },
      dob: {
         required: "Please enter your date of birth",
         regex: "Please enter date of birth in mm/dd/yyyy format"
      },
      captchaAnswer: {
         required: "Please solve the captcha",
         equalTo: "Weak in maths. incorrect answer!!!"
      },       
     },
     submitHandler: function(form) {
         alert("Successfully submitted");
         window.location.reload();
     }
   });
 });
