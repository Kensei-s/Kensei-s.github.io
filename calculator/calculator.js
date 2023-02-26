/*var today = new Date();

const year = today.toLocaleString(
    'fr-FR', {year: 'numeric'}
);
const nameOfMonth = today.toLocaleString(
    'fr-FR', {month: 'long'}
);
const nameOfDay = today.toLocaleString(
    'fr-FR', {day: 'numeric'}
);

displayDate = nameOfDay + ' ' + nameOfMonth + ' ' + year;

console.log(displayDate);


document.getElementById('p1').innerHTML = nameOfDay;
document.getElementById('p2').innerHTML = nameOfMonth;
document.getElementById('p3').innerHTML = year;*/


(function() {
  
    var el = function(element) {
      if (element.charAt(0) === "#") {
        return document.querySelector(element); 
      }
  
      return document.querySelectorAll(element);
    };
  
    // Variables
    var viewer = el("#viewer"),
      equals = el("#equals"),
      nums = el(".num"),
      ops = el(".ops"),
      oper = "",
      theNum = "",
      secondNum = "", 
      operExist = false,
      operEsc = false,
      signNeg = false,
      oldNum = "",
      brack_neg = false,
      brack_neg_first = false,
      resultNum, // Result
      operator;
  
    // When: Number is clicked. Get the current number selected
    var setNum = function() {
      if (signNeg) {
        
        theNum = '-' + this.getAttribute("data-num");
        viewer.innerHTML = theNum;
        signNeg = false
      }else if (operExist) { 
        if (brack_neg_first) {
          secondNum += '-'+this.getAttribute("data-num");
          brack_neg_first = false;
        } else {
          secondNum += this.getAttribute("data-num");
        }
        theNum = this.getAttribute("data-num");
        if (operEsc) {
          viewer.innerHTML += ' ';
          operEsc = false;
        }

        if (brack_neg) {
          if (viewer.innerHTML.substring(viewer.innerHTML.length - 1) == ')') {
            viewer.innerHTML = viewer.innerHTML.slice(0, -1);
            viewer.innerHTML += theNum + ')';
          }else{
            viewer.innerHTML += theNum + ')';
          }
        } else {
          viewer.innerHTML += theNum;
        }
      }else if(resultNum) { 
        theNum = this.getAttribute("data-num");
        resultNum = "";
        viewer.innerHTML = theNum;
      } else { 
        theNum += this.getAttribute("data-num");
        viewer.innerHTML = theNum;
      }
  
      
  
    };
  
    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function() {
      window.navigator.vibrate(200);
        if (!operExist) {
            if (this.getAttribute("data-oper") == '-' && ( theNum == '' || theNum == 0)) {
              operator = this.getAttribute("data-ops");
              oper = this.getAttribute("data-oper");
              signNeg = true;
              viewer.innerHTML = oper;
            } else {
              oldNum = theNum;
              theNum = "";
              operator = this.getAttribute("data-ops");
              oper = this.getAttribute("data-oper");
          
              equals.setAttribute("data-result", ""); 

              operExist = true;
              operEsc = true;
              viewer.innerHTML += ' ' + oper;
            }
        }else if(operExist && this.getAttribute("data-oper") == '-' && oper != '-'){
          viewer.innerHTML += ' (-';
          brack_neg = true;
          brack_neg_first = true;
        }
    };

    // When: Equals is clicked. Calculate result
    var displayNum = function() {
  
      // Convert string input to numbers
      oldNum = parseFloat(oldNum);
      secondNum = parseFloat(secondNum);
      // Perform operation
      switch (operator) {
        case "plus":
          resultNum = oldNum + secondNum;
          break;
  
        case "minus":
          resultNum = oldNum - secondNum;
          break;
  
        case "times":
          resultNum = oldNum * secondNum;
          break;
  
        case "divided by":
          resultNum = oldNum / secondNum;
          break;
  
          // If equal is pressed without an operator, keep number and continue
        default:
          resultNum = viewer.innerHTML;
      }
  
      // If NaN or Infinity returned
      if (!isFinite(resultNum)) {
        if (isNaN(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
          resultNum = "You broke it!";
        } else { // If result is infinity, set off by dividing by zero
          resultNum = "Error !!!";
          
        }
      }
  
      // Display result, finally!
      viewer.innerHTML = resultNum;
      equals.setAttribute("data-result", resultNum);
  
      // Now reset oldNum & keep result
      oldNum = '';
      secondNum = '';
      operExist = false;
      theNum = resultNum;
      brack_neg = false;
      operator = "";
      oper = "";
  
    };

    // When: Clear button is pressed. Clear everything
    var clearAll = function() {
      oldNum = "";
      theNum = "";
      resultNum = "";
      secondNum ="";
      operator = "";
      oper = "";
      operator = "";
      oper = "";
      brack_neg = false;
      brack_neg_first = false;
      viewer.innerHTML = "0";
      operExist = false;
      equals.setAttribute("data-result", resultNum);
    };

    var deleteChar = function() {
      if (viewer.innerHTML.substring(viewer.innerHTML.length - 1) == oper && !signNeg) {
        viewer.innerHTML = viewer.innerHTML.slice(0, -2);
        operExist = false;
        theNum =  viewer.innerHTML;
        oldNum = "";
        brack_neg = false;
        brack_neg_first = false;
      }else if(viewer.innerHTML.substring(viewer.innerHTML.length - 1) == ' ' && viewer.innerHTML.substring(viewer.innerHTML.length - 2, viewer.innerHTML.length - 1) == oper){
        viewer.innerHTML = viewer.innerHTML.slice(0, -3);
        operExist = false;
        theNum =  viewer.innerHTML;
        oldNum = "";
        secondNum = "";
        brack_neg = false;
        brack_neg_first = false;
      }else if(viewer.innerHTML.length == 1){
        viewer.innerHTML = '0';
        theNum = "";
        oldNum = "";
        secondNum = "";
      }else if(secondNum != "" && secondNum.length > 1){
        if (brack_neg) {
          secondNum = secondNum.slice(0, -1);
          viewer.innerHTML = viewer.innerHTML.slice(0, -2) + ')';
        }else{
          secondNum = secondNum.slice(0, -1);
          viewer.innerHTML = viewer.innerHTML.slice(0, -1);
        }
      }else{
        if (resultNum != '' || resultNum != 0) {
          theNum = theNum.toString();
        }
        viewer.innerHTML = viewer.innerHTML.slice(0, -1);
        theNum = theNum.slice(0, -1);
      }
    };

     // Add click event to numbers
     for (var i = 0, l = nums.length; i < l; i++) {
        nums[i].onclick = setNum;
      }
    
      // Add click event to operators
      for (var i = 0, l = ops.length; i < l; i++) {
        ops[i].onclick = moveNum;
      }

        // Add click event to equal sign
      equals.onclick = displayNum;

      // Add click event to clear button
      el("#clear").onclick = clearAll;

      el("#del").onclick = deleteChar;
    
      
  }());