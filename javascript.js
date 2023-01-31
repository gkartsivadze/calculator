var lastSymbol = false;
var pushableNum = 0,sumCounter = 0;
var lightMode = 1;
var pastNum;
var summed = false;
function picker(x) {
  focusOn(2);
  if($("#equalition").val() == 0 && isNum(x) && summed == false) {
    startFromNew(x);
  }  else if (isNum(x) && summed == true) {
    continueEqualition(x);
    focusOn(2);
    summed=false;
  } else if (!isNum(x) && summed == true) {
    continueFromSum(x);
    summed=false;
    pastNum = x;
    return;
  } else if ($("#equalition").val() != 0 && isNum(x)) {
    continueEqualition(x);
  } else if (!isNum(x) && isNum(pastNum)) {
    continueEqualition(x);
    pastNum = x;
    return;
  } else if (!isNum(x) && !isNum(pastNum)) {
    $("#equalition").val($("#equalition").val().slice(0, $("#equalition").val().length - 1));
    continueEqualition(x);
    pastNum = x;
    return;
  }
  pastNum = x;
  trackEqualition();
}

function continueFromSum(num) {
  $("#equalition").val($("#equalition2").val().slice(2, $("#equalition2").val().length));
  $("#equalition").val($("#equalition").val() + num);
}

function startFromNew(num) {
    $("#equalition2").addClass('underline');
    $("#equalition").removeClass('underline').val(num);
    trackEqualition();
    $("#ac").html('C');
    summed=false;
}

function continueEqualition(num) {
  $("#equalition").val($("#equalition").val() + num);
}

function trackEqualition() {
    $("#equalition2").val("= " + eval($('#equalition').val())).css('display', 'block');
}

function isNum(num) {
  if (num != '.' && num != '/' && num != '*' && num != '-' && num != '+' && num != '%') {
    return true;
  } else {
    return false;
  }
}

function summirize() {
  sumCounter += 1;
  if ($('#equalition').val() != 0 && summed == false) {
  focusOn(1);
  $('#equalition').before('<div class="history summed" onclick="recover(this.id)" id="sum' + sumCounter + '">' + $('#equalition').val() + '<br>' + $('#equalition2').val())
  summed = true;
  }
}

function clean() {
  if($("#equalition").val() == 0) {
    for(var i = 1; i <= sumCounter; i++) {
      $('#sum' + i).remove();
    }
  }
  $("#equalition").val("0").addClass('underline');
  $("#equalition2").css('display', 'none').val("0");
  $("#equalition").addClass('bigger-font').removeClass('less-font');
  $("#equalition2").addClass('less-font').removeClass('bigger-font');
  $("#ac").html('AC');
  summed = false;
}

function switchMode() {
  switch(lightMode)
  {
    case 1:
      $('body').css('background', 'black');
      $('.button:not(.outer)').css('color', 'white');
      $('input').css('color', 'white');
      $('#switchLight').html('<i class="fa-solid fa-sun"></i>');
      lightMode = 2;
      break;
    case 2:
      $('body').css('background', 'white');
      $('.button:not(.outer)').css('color', 'black');
      $('input').css('color', 'black');
      $('#switchLight').html('<i class="fa-solid fa-moon"></i>')
      lightMode = 1;
      break;
  }
}

function copyText() {
  // Get the text field
  var copyText = document.getElementById("equalition2");

  // Select the text field
  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

   // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);

  // Alert the copied text
  alert("Copied the text: " + copyText.value);
}

function focusOn(equalNum) {
  switch (equalNum) {
    case 1:
      $('#equalition').addClass('less-font').removeClass('bigger-font');
      $('#equalition2').addClass('bigger-font').removeClass('less-font');
      break;
    case 2:
      $('#equalition').addClass('bigger-font').removeClass('less-font');
      $('#equalition2').addClass('less-font').removeClass('bigger-font');
      break;
  }
}

function recover(click_id) {
  var elem = document.getElementById(click_id);
  var his = elem.innerText.slice(elem.innerText.indexOf("= ") + 2, elem.innerText.length);
  if ($("#equalition").val() == 0) {
    startFromNew(his);
  } else if ($("#equalition").val() != 0 && !isNum(pastNum) && summed == false) {
    continueEqualition(his);
  }  else if ($("#equalition").val() != 0 && summed == false) {
    startFromNew(his);
  } else if (summed == true) {
    startFromNew(his);
    focusOn(2);
  }
  trackEqualition();
}