var captchaValue;
function generateCaptcha() {
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
  captchaValue = res;

  document.getElementById('captchaCanvasContainer').innerHTML = "";
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

function validateForm() {
  var firstName = document.forms.registrationForm.firstName.value ,
      middleName = document.forms.registrationForm.middleName.value,
      lastName = document.forms.registrationForm.lastName.value,
      email = document.forms.registrationForm.email.value,
      password= document.forms.registrationForm.password.value,
      confirmPassword=document.forms.registrationForm.confirmPassword.value,
      currentAddress = document.forms.registrationForm.currentAddress.value,
      // currentCity = document.forms.registrationForm.currentCity.value,
      // currentState = document.forms.registrationForm.currentState.value,
      currentZipCode = document.forms.registrationForm.currentZipCode.value,
      // permanentAddress = document.forms.registrationForm.permanentAddress.value,
      // city = document.forms.registrationForm.city.value,
      // state = document.forms.registrationForm.state.value,
      // country = document.forms.registrationForm.country.value,
      // zipcode = document.forms.registrationForm.curzipcode.value,
      dob = document.forms.registrationForm.dob.value,
      gender = document.forms.registrationForm.gender.value,
      subscription = document.forms.registrationForm.subscription.value,
      captchaAnswer = document.forms.registrationForm.captchaAnswer.value;
      
  var vaildEmailRegExpression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  var letter = /[a-zA-Z]/;
  var number = /[0-9]/;
  var allLetters = /^[a-zA-Z]+$/;
  var dobPattern = /^([0-9]{2})-([0-9]{2})-([0-9]{4})$/;
  var scrollToElement = "";
  
  if (!firstName.match(allLetters) || firstName == "") {
    document.getElementById("errFirstName").innerHTML = "invalid name";
    scrollToElement = "firstName";
  }else{
    document.getElementById("errFirstName").innerHTML = "";
    scrollToElement = '';
  }

  if (!middleName.match(allLetters)){
    document.getElementById("errMiddleName").innerHTML = "invalid middle name";
    if (scrollToElement === ''){
        scrollToElement = "middleName";
    }

  }else{
    document.getElementById("errMiddleName").innerHTML = "";
    scrollToElement = '';
  }

  if (!lastName.match(allLetters) || lastName == "") {
    document.getElementById("errLastName").innerHTML = "invalid last name";
    if (scrollToElement === ''){
      scrollToElement = "lastName";
    }
  }else{
    document.getElementById("errLastName").innerHTML = "";
    scrollToElement = '';
  }

  if (vaildEmailRegExpression.test(email) == false) {
    document.getElementById("errEmail").innerHTML = "invalid email";
    if (scrollToElement === ''){
      scrollToElement = email;
  }
  }else{
    document.getElementById("errEmail").innerHTML = "";
    scrollToElement = '';
  }

  if (password.length < 8 || !letter.test(password) || !number.test(password)) {
    document.getElementById("errPassword").innerHTML = "invalid password";
    if (scrollToElement === ''){
      scrollToElement = "password";
  }
  }else{
    document.getElementById("errPassword").innerHTML = "";
    scrollToElement = '';
  }

  if(password !== confirmPassword){
    document.getElementById("errConfirmPassword").innerHTML = "password did not match";
    if (scrollToElement === ''){
      scrollToElement = "password";
  }
  }else{
    document.getElementById("errConfirmPassword").innerHTML = "";
  }

  if (currentAddress === ""){
    document.getElementById("errCurrentAddress").innerHTML = "please enter your current address";
    if (scrollToElement === ''){
      scrollToElement = "currentAddress";
  }
  }else{
    document.getElementById("errCurrentAddress").innerHTML = "";
    scrollToElement = '';
  }

  if (!currentZipCode.match(number)){
    document.getElementById("errCurrentZipCode").innerHTML = "invalid zipcode";
    if (scrollToElement === ''){
      scrollToElement = "currentZipCode";
  }
  }else{
    document.getElementById("errCurrentZipCode").innerHTML = "";
    scrollToElement = '';
  }

  if (dob == null || dob == "" || !dobPattern.test(dob)) {
    document.getElementById("errdob").innerHTML = "invalid dob";
    if (scrollToElement === ''){
      scrollToElement = "dob";
  }
  } else{
    document.getElementById("errdob").innerHTML = "";
    scrollToElement = '';
  }

  if (true){
    var formValid = false;

    var i = 0;
    while (!formValid && i < subscription.length) {
        if (subscription[i].checked) formValid = true;
        i++;        
    }

    if (!formValid) 
      document.getElementById("errSubscription").innerHTML = "choose one of the options";
      else{
        document.getElementById("errSubscription").innerHTML = "";
      }
  }
  if (parseInt(captchaAnswer) !== captchaValue){
    document.getElementById("errCaptcha").innerHTML = "Invalid captcha";
  }else{
    document.getElementById("errCaptcha").innerHTML = "";
  }

  if (scrollToElement != '')
    {
      document.getElementById(scrollToElement).scrollIntoView();
    }
  return false;
}


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


function selector() {
	
	//Get html elements
	var countySel = document.getElementById("country");
	var stateSel = document.getElementById("state");	
	var citySel = document.getElementById("city");
  var zipSel = document.getElementById("zipcode");
  
	
	//Load countries
	for (var country in countryStateInfo) {
		countySel.options[countySel.options.length] = new Option(country, country);
	}
	
	//County Changed
	countySel.onchange = function () {
		 
		 stateSel.length = 1; // remove all options bar first
		 citySel.length = 1; // remove all options bar first
		 zipSel.length = 1; // remove all options bar first
		 
		 if (this.selectedIndex < 1)
			 return; // done
		 
		 for (var state in countryStateInfo[this.value]) {
			 stateSel.options[stateSel.options.length] = new Option(state, state);
		 }
	};
	
	//State Changed
	stateSel.onchange = function () {		 
		 
		 citySel.length = 1; // remove all options bar first
		 zipSel.length = 1; // remove all options bar first
		 
		 if (this.selectedIndex < 1)
			 return; // done
		 
		 for (var city in countryStateInfo[countySel.value][this.value]) {
			 citySel.options[citySel.options.length] = new Option(city, city);
		 }
	};
	
	//City Changed
	citySel.onchange = function () {
		zipSel.length = 1; // remove all options bar first
		
		if (this.selectedIndex < 1)
			return; // done
		
		var zips = countryStateInfo[countySel.value][stateSel.value][this.value];
		for (var i = 0; i < zips.length; i++) {
			zipSel.options[zipSel.options.length] = new Option(zips[i], zips[i]);
		}
	};	
};


function currentAddressSelector() {
	
	//Get html elements
	var countySel = document.getElementById("currentCountry");
	var stateSel = document.getElementById("currentState");	
	var citySel = document.getElementById("currentCity");
  var zipSel = document.getElementById("currentZipcode");
  
	
	//Load countries
	for (var country in countryStateInfo) {
		countySel.options[countySel.options.length] = new Option(country, country);
	}
	
	//County Changed
	countySel.onchange = function () {
		 
		 stateSel.length = 1; // remove all options bar first
		 citySel.length = 1; // remove all options bar first
		 zipSel.length = 1; // remove all options bar first
		 
		 if (this.selectedIndex < 1)
			 return; // done
		 
		 for (var state in countryStateInfo[this.value]) {
			 stateSel.options[stateSel.options.length] = new Option(state, state);
		 }
	};
	
	//State Changed
	stateSel.onchange = function () {		 
		 
		 citySel.length = 1; // remove all options bar first
		 zipSel.length = 1; // remove all options bar first
		 
		 if (this.selectedIndex < 1)
			 return; // done
		 
		 for (var city in countryStateInfo[countySel.value][this.value]) {
			 citySel.options[citySel.options.length] = new Option(city, city);
		 }
	};
	
	//City Changed
	citySel.onchange = function () {
		zipSel.length = 1; // remove all options bar first
		
		if (this.selectedIndex < 1)
			return; // done
		
		var zips = countryStateInfo[countySel.value][stateSel.value][this.value];
		for (var i = 0; i < zips.length; i++) {
			zipSel.options[zipSel.options.length] = new Option(zips[i], zips[i]);
		}
	};	
};

