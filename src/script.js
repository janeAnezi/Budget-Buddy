// * Using Module pattern, to keep peaces of code that are related to one another
//      together inside of separate, independent organised unit and encapsulated.
//      This is  a way to hide the internal implementation details from other parts of your program.
// * Private and public data, encapsulation and separation of conserns (meaning each part of 
//    the application is seperated in doing one thing independently)
// * Set up event listeners for keypress events and use event object


// Budget Controller
let budgetController = (function() {
    let Expenses = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }
    let Income = function (id, description, value) {
        this.id = id
        this.description = description
        this.value = value
    }
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
        
    }

    return {
        addItem: function(type, des, val){
            let newItem, ID;
            //data.allItems[type] is an array where we will store our objects either income or expense
            let dataType = data.allItems[type]

            // create new id
            ID = dataType[dataType.length - 1].id + 1

            //  Create new item based on inc or exp
            if(type === 'exp') {
                newItem = new  Expenses(ID, des, val);
            } else if( type === 'inc'){
                newItem = new  Expenses(ID, des, val);
            }
            dataType.push(newItem)

            // return  the new element
            return newItem
        }
    }
})()


// UI Controller
let  UIcontroller = (function(){
    let  DOMstrings = {
        selectType: '.add-type',
        description: '.add-description',
        inputValue: '.add-value',
        addButton: '.add-btn'
    }
    return {
        getInput: function() {
            return {
             type: document.querySelector(DOMstrings.selectType).value, // will either be inc or exp
             description: document.querySelector(DOMstrings.description).value,
             value: document.querySelector(DOMstrings.inputValue).value
            }; 
        },
        getDOMstrings:  () => {
            return DOMstrings;
        }
    }
})()

// Global APP Controller
let controller = (function(budgetCtrl, UICtrl) {
    var setupEventListeners = () => {
        let DOM = UICtrl.getDOMstrings()
        document.querySelector(DOM.addButton).addEventListener('click', ctrlAddItem);
        document.addEventListener( 'keypress', function(event){
            if( event.key === 'Enter' || event.key === 13 ) {
                ctrlAddItem();
            }
        })
    }
    
    let ctrlAddItem = () => {
        // get field input
        let input = UICtrl.getInput();
        // add item to  budget controller
        // add item to UI
        // calculate budget on UI
        
    }

    return {
        init: () => {
            console.log('Application has started....')
            setupEventListeners()
        }
    }
})(budgetController, UIcontroller)

controller.init()
