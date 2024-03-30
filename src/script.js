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
    
    return {
        getInput: function() {
            return {
             type: document.querySelector('.add-type').value, // will either be inc or exp
             description: document.querySelector('.add-description').value,
             value: document.querySelector('.add-value').value
            }
        }
    }
})();

// Global APP Controller
var controller = (function(budgetCtrl, UICtrl) {
    var ctrlAddItem = function() {
        // get field input
        var input = UICtrl.getInput()
        console.log(input);

        // add item to  budget controller
        // add item to UI
        // calculate budget on UI

    }
    document.querySelector('.add-btn').addEventListener('click', ctrlAddItem);
    document.addEventListener( 'keypress', function(event){
        if( event.key == 'Enter' ) {
            ctrlAddItem();
        }
    })

    
})(budgetController, UIcontroller);
