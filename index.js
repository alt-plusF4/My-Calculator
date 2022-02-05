var userValue = "";
var userInput = "";

var output = "0";

var validKeys = ["Escape", "Enter", "m", "+", "-", "/", "*", "0","1","2","3", "4","5","6", "7", "8", "9", "."];
var operands = ["m", "percent", "add", "−", "÷", "x"];

var num1, num2;

var operation = "";

var clickFlag = 0;

var txt = 'Hello';
var txt1 = '';

var i = 0;                  


//Manipulation...

$(document).ready(function(){
    welcome();
});

$(".buttons button").click(function(evt){
    userValue = evt.target.id;

    buttonAnimation(userValue);
    logic(userValue);
    
});


$(document).keydown(function(evt){
    userValue = evt.key;

    if(validKeys.includes(userValue)){

        if (userValue == "*")
            userValue = "x";
        
        else if (userValue == "/")
            userValue = "÷";
        
        else if (userValue == "Enter")
            userValue = "equal";
        
        else if (userValue == "+")
            userValue = "add";
        
        else if (userValue == "Escape")
            userValue = "AC"
    
        else if(userValue == "-")
            userValue = "−";

        buttonAnimation(userValue);
    
        logic(userValue);
    }
    
});


$(document).ready(function(){

    $("#help-btn").addClass("pop");
    
    setTimeout( function() {
        $("#help-btn").removeClass("pop");
    }, 200);
    
});


$("#help-btn").click(function(){
    buttonAnimation("help-btn");
    if(clickFlag == 0){
        $(".help-list").removeClass("disappear");
        clickFlag = 1;
    }
    else { 
        $(".help-list").addClass("disappear");
        clickFlag = 0;
    }
});



//Functions....

function welcome() {         
    setTimeout(function() {
      txt1 += txt[i];
      $(".input-box").attr("value", txt1)   
      i++;                    
      if (i < txt.length) {           
        welcome();             
      }                      
    }, 90)
}


function buttonAnimation(userValue){
    $("button#"+userValue).addClass("button-pressed");

    setTimeout( function() {
        $("button").removeClass("button-pressed");
    }, 100);
}


function calculator(num1, num2, operation){
    switch (operation) {
        
        case "mod":
        case "m":
            output = num1 % num2;    
            break;
    
        case "percent":
            output = (num1/100) * num2;
            break;
        
        case "add":
            output = num1 + num2;
            break;
        
        case "−":
            output = num1 - num2;
            break;
        
        case "÷":
        case "/":
            output = num1/num2;
            break;
        
        case "x":
        case "*":
            output = num1 * num2;
            break;

        default:
            output = "Invalid";
            break;
    }

    return output.toString();
}


function reset(){
    num1 = 0;
    num2 = 0;
    userInput = "";
    userValue = "";
    operation = "";
}


function logic(userValue){
    
    if(userValue == "AC") {
        $("input").attr( "value", "0");
        reset();
    }

    else if(userValue == "equal") {
        $("input").attr( "value", calculator(num1, num2, operation));
        reset();
    }
    
    else if(operands.includes(userValue)) {

        if(userValue == "percent")
            $("input").attr( "value", "%");    
        else if(userValue == "add")
            $("input").attr( "value", "+");
        
        else if(userValue == "m")
            $("input").attr( "value", "mod");
        
        else    
        $("input").attr( "value", userValue);

        operation = userValue;
        
        if (output == "Invalid" || output == "0")
            num1 = parseFloat(userInput);
        
        else
            num1 = parseFloat(output);
        
        
        userInput = "";
    }
    

    else{
        userInput += userValue;
        num2 = parseFloat(userInput);

        output = calculator(num1, num2, operation);
        
        $("input").attr( "value", userInput);
    }
}

