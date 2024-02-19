// * Using Module pattern, to keep peaces of code that are related to one another
//      together inside of separate, independent organised unit and encapsulated.
//      This is  a way to hide the internal implementation details from other parts of your program.
// * Private and public data, encapsulation and separation of conserns (meaning each part of 
//    the application is seperated in doing one thing independently)

var budgetController = (function() {
    var x = 23;
    var add = function(a) {
        return x + a;
    }

    return {
        publicTest: function(g) {
            return(add(g)); 
        }
    }
})();

//budgetController.publicTest(10);

var  UIcontroller = (function(){
    //some code
})();

var controller = (function(bgtCntrl, uiCntrl) {
    var cntrl = bgtCntrl.publicTest(2);

    return {
        publicControl: function() {
            console.log(cntrl)
        }
    }

})(budgetController, UIcontroller);
controller.publicControl();