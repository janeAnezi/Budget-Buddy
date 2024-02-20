// * Using Module pattern, to keep peaces of code that are related to one another
//      together inside of separate, independent organised unit and encapsulated.
//      This is  a way to hide the internal implementation details from other parts of your program.
// * Private and public data, encapsulation and separation of conserns (meaning each part of 
//    the application is seperated in doing one thing independently)
// * Set up event listeners for keypress events and use event object


// Budget Controller
var budgetController = (function() {
    
})();


// UI Controller
var  UIcontroller = (function(){
    //some code
})();

// Global Controller
var controller = (function(bgtCntrl, uiCntrl) {
    document.querySelector('.add-btn').addEventListener('click', function() {
        console.log('This button was clicked');
    })

})(budgetController, UIcontroller);
