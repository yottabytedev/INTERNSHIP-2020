$(function(){
   // Reset button removes the image and scroll the window 
    $("input[type=reset]").on('click',function(){
      $('#profile').css('background-image','none').removeClass('dragging hasImage');
      $('html, body').animate({scrollTop:0}, 600);
    });

    // Make all the fields required
    $("input:not(:first),textarea,select").prop("required",true);

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

    // Function to generate random id for dynamically added parameters
    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    var phoneNumbers = [];       // Store id of newly added another phone no.
    var temp;
    // add option for another phone no.
    $("body").on("click",".add-more",function(){ 
        temp = makeid(5);
        var html = '<div class="after-add-more phone-number-position"><input type="number" id="'+temp+'" name="'+temp+'" placeholder="Alternative Phone Number" /><span class="emsg hidden">Phone no. should start with digit [4-9] and contain {10-12} digits</span><button type="button" class="remove">X</button></div>';      
        $(".after-add-more").last().after(html); 
        phoneNumbers.push(temp);
    });

    // remove option for another phone no. by checking which remove button is clicked and also remove
    // it from the array phoneNumbers
    $("body").on("click",".remove",function(){ 
        phoneNumbers.splice( $.inArray($(this).prevAll('input')[0].id, phoneNumbers), 1 );
        $(this).parents(".after-add-more").remove();
    });

    var addresses = [];       // array to store id names of dynamically added address

    // add address card on clicking add more address button
    $("body").on("click",".add-more-address",function(){ 
        temp = makeid(6);
        var html = '<div class="after-add-more-address address-container-border">'+
                           '<button type="button" class="remove-address">X</button>'+
                           '<div class="emsg-input-container" id='+temp+'>'+
                              '<textarea name="'+temp+'" placeholder="Address"></textarea>'+
                              '<span class="emsg hidden">please enter your address</span>'+
                           '</div>'+

                           '<div class="emsg-input-container">'+
                              '<select id="'+temp+'Country" size="1" name="'+temp+'Country">'+
                                    '<option value="" selected="selected">-- Select Country --</option>'+
                                    '<option value="India" >India</option>'+
                                    '<option value="USA" >USA</option>'+
                              '</select>'+
                              '<span class="emsg hidden">select one of the options</span>'+
                           '</div>'+

                           '<div class="emsg-input-container">'+
                              '<select id="'+temp+'State" size="1" name="'+temp+'State">'+
                                    '<option value="" selected="selected">-- Select State --</option>'+
                              '</select>'+
                              '<span class="emsg hidden">select one of the options</span>'+
                           '</div>'+

                           '<div class="emsg-input-container">'+
                              '<select id="'+temp+'City" size="1" name="'+temp+'City">'+
                                    '<option value="" selected="selected">-- Select City --</option>'+
                              '</select>'+
                              '<span class="emsg hidden">select one of the options</span>'+
                           '</div>'+

                           '<div class="emsg-input-container">'+
                              '<select id="'+temp+'Zipcode" size="1" name="'+temp+'Zipcode">'+
                                    '<option value="" selected="selected">-- Select zipcode --</option>'+
                              '</select>'+
                              '<span class="emsg hidden">select one of the options</span>'+
                           '</div>'+
                     '</div>';
        $(".after-add-more-address").last().after(html); 
        addresses.push(temp);
    });

   // remove the address card on clicking remove address
   // and removing the address id from the array addresses
    $("body").on("click",".remove-address",function(){ 
        addresses.splice( $.inArray($(this).next()[0].id, addresses),1);
        $(this).parents(".after-add-more-address").remove();
    });

    // Object for making country --> state --> city --> zipcode dropdown list 
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

   var data, captchaString, captchaValue;
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
   var myString,myStringCity,myStringZip;
   $('body').on('change',"[id $='Country']",function(event){ 
    myString = $(this)[0].id.replace('Country','');
    myString += 'State';

    $("#"+myString).children('option:not(:first)').remove();
       
       for (var state in countryStateInfo[this.value]) {
       $("#"+myString).append(new Option(state,state));
       }
    });

    
    $('body').on('change',"[id $= 'State']",function(event){
        event.preventDefault();
    myString = $(this)[0].id.replace('State','');
    myStringCity = myString + 'City';

        $("#"+myStringCity).children('option:not(:first)').remove();
        
        for (var city in countryStateInfo[$("#"+myString+"Country")[0].value][this.value]){
           $("#"+myStringCity).append(new Option(city,city));
        }
     });

     $('body').on('change',"[id $= 'City']",function(event){
        event.preventDefault();
        myString = $(this)[0].id.replace('City','');
        myStringZip = myString + 'Zipcode';
        $("#"+myStringZip).children('option:not(:first)').remove();
  
        var zips = countryStateInfo[$("#"+myString+"Country")[0].value][$("#"+myString+"State")[0].value][this.value];
        
        if (zips !== undefined){
           for (var i=0; i < zips.length; i++){
           $("#"+myStringZip).append(new Option(zips[i],zips[i]));
         }}
     });


     // CHECKING EACH AND EVERY INPUT VALUE AND VALIDATING ACCORDING TO THE REGULAR EXPRESSION
     var $regexname = /^([a-zA-Z]{3,100})$/,
         $regexemail = /[\w-]+@([\w-]+\.)+[\w-]+/,
         $regexphone = /^[4-9]{1}[0-9]{9,11}$/,
         $regexaadhar = /^([0-9]{12})$/,
         $regexpan = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;

     $('#firstName').on('click keydown keypress keyup',function(){
      if (!($(this).val()).replace(/\s+/g, '').match($regexname)) {
       // there is a mismatch, hence show the error message
          $(this).addClass('input-err-border');
          $(this).next('.emsg').removeClass("hidden");
          $(this).next('.emsg').show();
      }
    else{
         // else, do not display message
         $(this).removeClass('input-err-border');
         $(this).next('.emsg').addClass('hidden');
        }
      });
      $('#lastName').on('click keydown keypress keyup ',function(){
         if (!($(this).val()).replace(/\s+/g, '').match($regexname)) {
          // there is a mismatch, hence show the error message
             $(this).addClass('input-err-border');
             $(this).next('.emsg').removeClass("hidden");
             $(this).next('.emsg').show();
         }
       else{
            // else, do not display message
            $(this).removeClass('input-err-border');
            $(this).next('.emsg').addClass('hidden');
           }
         });

      $('#email').on('click keydown keypress keyup  ',function(){
         if (!$(this).val().match($regexemail)) {
          // there is a mismatch, hence show the error message
             $(this).addClass('input-err-border');
             $(this).next('.emsg').removeClass("hidden");
             $(this).next('.emsg').show();
         }
       else{
            // else, do not display message
            $(this).removeClass('input-err-border');
            $(this).next('.emsg').addClass('hidden');
           }
     });
     $('body').on('click keydown keypress keyup ','#phoneNumberContainer input',function(){
      if (!$(this).val().match($regexphone)) {
       // there is a mismatch, hence show the error message
          $(this).addClass('input-err-border');
          $(this).next('.emsg').removeClass("hidden");
          $(this).next('.emsg').show();
      }
    else{
         // else, do not display message
         $(this).removeClass('input-err-border');
         $(this).next('.emsg').addClass('hidden');
        }
      });

      $('#panNumber').on('click keydown keypress keyup  ',function(){
         if (!$(this).val().match($regexpan)) {
          // there is a mismatch, hence show the error message
             $(this).addClass('input-err-border');
             $(this).next('.emsg').removeClass("hidden");
             $(this).next('.emsg').show();
         }
       else{
            // else, do not display message
            $(this).removeClass('input-err-border');
            $(this).next('.emsg').addClass('hidden');
           }
     });
     $('#aadharNumber').on('click keydown keypress keyup  ',function(){
      if (!$(this).val().match($regexaadhar)) {
       // there is a mismatch, hence show the error message
          $(this).addClass('input-err-border');
          $(this).next('.emsg').removeClass("hidden");
          $(this).next('.emsg').show();
      }
    else{
         // else, do not display message
         $(this).removeClass('input-err-border');
         $(this).next('.emsg').addClass('hidden');
        }
  });
      $('body').on('click keydown keypress keyup  ','#addressContainer textarea',function(){
         if ($(this).val().trim() === '') {
         // there is a mismatch, hence show the error message
            $(this).addClass('input-err-border');
            $(this).next('.emsg').removeClass("hidden");
            $(this).next('.emsg').show();
         }
      else{
            // else, do not display message
            $(this).removeClass('input-err-border');
            $(this).next('.emsg').addClass('hidden');
         }
      });
      $('body').on('change click keydown keypress keyup  ','#addressContainer select',function(){
         if ($(this).val() === '') {
            // there is a mismatch, hence show the error message
               $(this).addClass('input-err-border');
               $(this).next('.emsg').removeClass("hidden");
               $(this).next('.emsg').show();
            }
         else{
               // else, do not display message
               $(this).removeClass('input-err-border');
               $(this).next('.emsg').addClass('hidden');
            }
      });

      $("#captchaAnswer").on('click keydown keypress keyup  ',function(){
         $(this).removeClass('input-err-border');
         $(this).next('.emsg').addClass('hidden');
      });

      // on submitting check whether the details entered are correct or not
      // validating captcha only on submittting the form
      $('form').on('click',':submit',function(){
         var captchaAnswerId = $("#captchaAnswer");
         if ($(captchaAnswerId).val() !== $('#captchaHiddenAnswer').val()){
            // there is a mismatch, hence show the error message
               captchaAnswerId.addClass('input-err-border');
               captchaAnswerId.next('.emsg').removeClass("hidden");
               captchaAnswerId.next('.emsg').show();
               // Generate captcha again if wrong input is entered
               captchaAnswerId.val('');
               generateCaptcha();
               return false;
            }
         else{
               // else, do not display message
               captchaAnswerId.removeClass('input-err-border');
               captchaAnswerId.next('.emsg').addClass('hidden');
               if ($('#firstName').val().match($regexname) || ($('#lastName').val()).replace(/\s+/g, '').match($regexname) || $('#email').val().match($regexemail) || $('#phoneNumberContainer input').val().match($regexphone)|| $('#panNumber').val().match($regexpan) || $('#aadharNumber').val().match($regexaadhar) || $('#profile').css('background-image') != 'none')
               {alert("successfully submitted check the details");
               // Displaying the details if form is succesfully submitted
               displaydetails();
               return false;
               }
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
         $('#dphone').text($("#phoneNumber").val());
         $('#dpan').text($("#panNumber").val());
         $('#daadhar').text($("#aadharNumber").val());
         dcountry = $('#currentCountry').val();
         dstate = $('#currentState').val();
         dcity = $('#currentCity').val();
         dzipcode = $('#currentZipcode').val();
         combineAddressDetails = $('textarea[name=address]').val() + '<br/>' + dcity + ', ' + dstate +', ' + dzipcode + '<br/>' + dcountry;
         $('#daddress').html(combineAddressDetails);
         $('#ddate').text(output);

         // Setting value on display for dynamically added phone numbers
         $.each(phoneNumbers,function(index,value){
            $('.row #dphone').parent().after('<div class="row"><div class="col">Alternative phone no.</div><div class="col">'+$("#"+value).val()+'</div> </div>'); 
         });

         // Setting value on display for dynamically added addresses 
         $.each(addresses,function(index,value){
            dcountry = $('#'+value+'Country').val();
            dstate = $('#'+value+'State').val();
            dcity = $('#'+value+'City').val();
            dzipcode = $('#'+value+'Zipcode').val();
            combineAddressDetails = $("textarea[name="+value+"]").val() + '<br />' + dcity + ', ' + dstate +', ' + dzipcode + '<br />' + dcountry;
            $('.row #daddress').parent().after('<div class="row"><div class="col">Alternative address</div><div class="col wrap-address">'+combineAddressDetails+'</div></div>'); 
         });

         // Display the details
         $('#details').removeClass('hidden');

         // Scroll on top of the page as form will be hidden and details will be on the top
         window.scrollTo(0,0);

         //hide the form
         $('form').addClass('hidden');
         return false;
      }
});