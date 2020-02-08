$(function(){
   var alternatePhoneHtml = '<div class="after-add-more phone-number-position"><input type="number" class="phone-number" name="phoneNumber" placeholder="Alternative Phone Number" /><span class="emsg hidden">Phone no. should start with digit [4-9] and contain {10-12} digits</span><button type="button" class="remove">X</button></div>';      
   var alternateAddressHtml = '<div class="after-add-more-address address-container-border"><button type="button" class="remove-address">X</button>'+$('.js-clone-address-div').clone().html()+'</div>';
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
   var data, captchaString, captchaValue , addressContainer, country, state, city;
   var $regexname = /([a-zA-Z]{3,100})+(\s*)/;
   var $regexemail = /[\w-]+@([\w-]+\.)+[\w-]+/;
   var $regexphone = /^[4-9]{1}[0-9]{9,11}$/;
   var $regexnoemptyvalue = /^(?!\s*$).+/;
   var $regexaadhar = /^([0-9]{12})$/;
   var $regexpan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
   var $regexzipcode = /[0-9]{6}/;
   
   
   // Reset button removes the image and scroll the window 
    $("input[type=reset]").on('click',function(){
      $('#profile').css('background-image','none').removeClass('dragging hasImage');
      $('html, body').animate({scrollTop:0}, 600);
    });

    // Make all the fields required  :not(:first)
    $("input,textarea,select").prop("required",true);

    // Making sure no background is present
    $('#profile').addClass('dragging').removeClass('dragging');

    // If image is dropped on the region by draggin ,display it in the background
    $('#profile').on('dragover', function() {
        $('#profile').addClass('dragging');
    }).on('dragleave', function() {
        $('#profile').removeClass('dragging');
    }).on('drop', function(e) {
        $('#profile').removeClass('dragging hasImage');
    
        if (e.originalEvent) {
        var file = e.originalEvent.dataTransfer.files[0];
    
        var reader = new FileReader();
    
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            console.log(reader.result);
            $('#profile').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
            $('.profile-pic').attr('src',reader.result);
        };
        }
    });

    // Taking input if region for uploading image is inserted
    $('#profile').on('click', function(e) {
        $('#mediaFile').click();
    });

    // Adding event on the window to drop image
    window.addEventListener("dragover", function(e) {
        e = e || event;
        e.preventDefault();
    }, false);
    window.addEventListener("drop", function(e) {
        e = e || event;
        e.preventDefault();
    }, false);

    // Setting image background on click on the region
    $('#mediaFile').change(function(e) {   
        var input = e.target;
        if (input.files && input.files[0]) {
        var file = input.files[0];  
        var reader = new FileReader();  
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            console.log(reader.result);
            $('#profile').css('background-image', 'url(' + reader.result + ')').addClass('hasImage');
            $('.profile-pic').attr('src',reader.result);
        };
        }
    });

    // add option for another phone no.
    $("#phoneNumberContainer").on("click",".add-more",function(){ 
        $("#phoneNumberContainer").append(alternatePhoneHtml); 
    });

    // remove option for another phone no. by checking which remove button is clicked and also remove
    // it from the array phoneNumbers
    $("body").on("click",".remove",function(){ 
       $(this.parentElement).remove();
    });

    // add address card on clicking add more address button
    $("#addressContainer").on("click",".add-more-address",function(){ 
        $("#addressContainer").append(alternateAddressHtml);
    });

   // remove the address card on clicking remove address
   // and removing the address id from the array addresses
    $("#addressContainer").on("click",".remove-address",function(){ 
      $(this.parentElement).remove();
    });

   // Generate random values for solving the captcha 
   function captchaGenerator(){
      var op = ['+', '-', '*', '/'];
      var opindex = Math.floor((Math.random() * 4));
      var operator = op[opindex];
      var x = Math.floor((Math.random() * 10));    // '10' is set for one digit calculation
      var y = Math.floor((Math.random() * 10));    //  random function return a value between 0 to 1
      
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

      return {captchaString: captchaString, captchaValue: res};  // return captcha result and captcha string
   }

   // Generate a canvas to write captcha string so that user cannot copy the text
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

   // calling captchaGenerator function
   function generateCaptcha(){
   data = captchaGenerator();
   captchaString = data.captchaString;
   captchaValue = data.captchaValue;
   $('#captchaHiddenAnswer').val(captchaValue);
   generateCanvas(captchaString);
   }

   generateCaptcha();
   // Generate captcha again on clicking refresh icon
   $("#captchaRefresh").bind('click',generateCaptcha);

   // Link the country --> state --> city --> zipcode
   $('#addressContainer').on('change','.country',function(event){
   addressContainer =  $(this).parents('.after-add-more-address');
   country = addressContainer.find('.country');
   state = addressContainer.find('.state');
   city = addressContainer.find('.city');

   state.children('option:not(:first)').remove();
   city.children('option:not(:first)').remove();
   
    $.each(countryStateInfo[country.val()],function(key){
         var option = $("<option/>", {
            value: key,
            text: key
         });
         state.append(option);
      });
    });

    
    $('#addressContainer').on('change',".state",function(event){
      addressContainer = $(this).parents('.after-add-more-address');
      country = addressContainer.find('.country');
      state = addressContainer.find('.state');
      city = addressContainer.find('.city');

      city.children('option:not(:first)').remove();
      
      $.each(countryStateInfo[country.val()][state.val()],function(key){
         var option = $("<option/>",{
            value: key,
            text: key
         });
         city.append(option);
      });
     });

     // CHECKING EACH AND EVERY INPUT VALUE AND VALIDATING ACCORDING TO THE REGULAR EXPRESSION
     function validate(parent,label,events,condition){
        $(parent).on(events,label,function(){
         if (!$(this).val().match(condition)) {
            // there is a mismatch, hence show the error message
               $(this).addClass('input-err-border').next('.emsg').removeClass("hidden").show();
           }
         else{
              // else, do not display message
              $(this).removeClass('input-err-border').next('.emsg').addClass('hidden');
             }
         });
     }
     validate('#employeeForm','#firstName','keyup',$regexname);
     validate('#employeeForm','#lastName','keyup', $regexname);
     validate('#employeeForm','#email','keyup',$regexemail);
     validate('#phoneNumberContainer','.phone-number','keyup',$regexphone);
     validate('#employeeForm','#panNumber','keyup',$regexpan);
     validate('#employeeForm','#aadharNumber','keyup',$regexaadhar);
     validate('#employeeForm','.address','keyup',$regexnoemptyvalue);
     validate('#employeeForm','.country, .state, .city','change',$regexnoemptyvalue);
     validate('#employeeForm','.zipcode','keyup',$regexzipcode);

     $("#captchaAnswer").on('click keydown keypress keyup  ',function(){
         $(this).removeClass('input-err-border').next('.emsg').addClass('hidden');
      });

      function allRequiredFieldsFilled(){
         var temp = true;
         $('.js-required').each(function(){
            if ($.trim($(this).val()) == "")
            { temp = false;}
         });
         return temp;
      }
      // on submitting check whether the details entered are correct or not
      // validating captcha only on submittting the form
      $('form').on('click',':submit',function(){
         var captchaAnswerId = $("#captchaAnswer");
         if ($(captchaAnswerId).val() !== $('#captchaHiddenAnswer').val()){
            // there is a mismatch, hence show the error message
               captchaAnswerId.addClass('input-err-border').next('.emsg').removeClass("hidden").show();
               // Generate captcha again if wrong input is entered
               captchaAnswerId.val('');
               generateCaptcha();
            }
            if ( $('#employeeForm').find('.emsg.hidden').length > 11 && allRequiredFieldsFilled())
            {
                  alert("successfully submitted check the details");
                  // Displaying the details if form is succesfully submitted
                  displaydetails();
                  return false;
            }   
      });

      function displaydetails()
      {
         var dcountry, dstate, dcity, dzipcode,combineAddressDetails;
         var d = new Date();
         var month = d.getMonth()+1;
         var day = d.getDate();
         // Displaying current date on the details
         var output = d.getFullYear() + '/' +
            (month<10 ? '0' : '') + month + '/' +
            (day<10 ? '0' : '') + day;
         $('#dname').text($("#firstName").val() + " " + $("#lastName").val());
         $('#demail').text($("#email").val());
         //$('#dphone').text($("#phoneNumber").val());
         $('#dpan').text($("#panNumber").val());
         $('#daadhar').text($("#aadharNumber").val());
         combineAddressDetails = $('textarea[name=address]').val() + '<br/>' + dcity + ', ' + dstate +', ' + dzipcode + '<br/>' + dcountry;
         $('#daddress').html(combineAddressDetails);
         $('#ddate').text(output);

         // Setting value on display for dynamically added phone numbers
         $.each($('.phone-number'),function(index,val){
            $('.row #demail').parent().after('<div class="row"><div class="col">Phone no.</div><div class="col">'+val.value+'</div> </div>'); 
         });

         // Setting value on display for dynamically added addresses 
         $.each($('.after-add-more-address'),function(index,value){
            var $val = $(value);
            dcountry = $val.find('.country').val();
            dstate = $val.find('.state').val();
            dcity = $val.find('.city').val();
            dzipcode = $val.find('.zipcode').val();
            combineAddressDetails = $val.find('.address').val() + '<br />' + dcity + ', ' + dstate +', ' + dzipcode + '<br />' + dcountry;
            $('.row #daadhar').parent().after('<div class="row"><div class="col">Address</div><div class="col wrap-address">'+combineAddressDetails+'</div></div>'); 
         });

         // Display the details
         $('#details').removeClass('hidden');

         // Scroll on top of the page as form will be hidden and details will be on the top
         window.scrollTo(0,0);

         //hide the form
         $('form').addClass('hidden');
      }
});