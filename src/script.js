// * Using Module pattern, to keep peaces of code that are related to one another
//      together inside of separate, independent organised unit and encapsulated.
//      This is  a way to hide the internal implementation details from other parts of your program.
// * Private and public data, encapsulation and separation of conserns (meaning each part of 
//    the application is seperated in doing one thing independently)
// * Set up event listeners for keypress events and use event object


// Budget Controller
let budgetController = (function() {
    
})()


// UI Controller
let  UIcontroller = (function(){
    return {
        getInput: function() {
            return {
             type: document.querySelector('.add-type').value, // will either be inc or exp
             description: document.querySelector('.add-description').value,
             value: parseFloat(document.querySelector('.add-value').value)
            }; 
        }
    }
})()

// Global APP Controller
let controller = (function(budgetCtrl, UICtrl) {
    let ctrlAddItem = function() {
        // get field input
        let input = UICtrl.getInput();
            console.log(input);
        // add item to  budget controller
        // add item to UI
        // calculate budget on UI
        
    }
    document.querySelector('.add-btn').addEventListener('click', ctrlAddItem);
    document.addEventListener( 'keypress', function(event){
        if( event.key === 'Enter' || event.key === 13 ) {
            ctrlAddItem();
        }
    })

    
})(budgetController, UIcontroller)
