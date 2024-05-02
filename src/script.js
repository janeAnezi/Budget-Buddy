// Budget Controller
let budgetController = (function() {
    let Expenses = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
        
    };

    return {
        addItem: function(type, des, val) {
            let newItem, ID;
            let dataType = data.allItems[type];

            if(dataType.length > 0) {
                ID = dataType[dataType.length - 1].id + 1;
            } else {
                ID = 0;
            }
            if(type === 'exp') {
                newItem = new Expenses(ID, des, val);
            } else if(type === 'inc') {
                newItem = new Income(ID, des, val);
            }
            dataType.push(newItem);

            return newItem;
        },
        testing: () => {
            console.log(data);
        }
    };
})();


// UI Controller
let UIcontroller = (function(){
    let DOMstrings = {
        inputType: '.add-type',
        inputDescription: '.add-description',
        inputValue: '.add-value',
        inputBtn: '.add-btn',
        incomeContainer: '.income-list',
        expensesContainer: '.expenses-list'

    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            }; 
        },
        addListItem: function(obj, type) {
            let html, newHtml, element;

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix flex" id="income-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-delete"><button class="item-delete-btn"><ion-icon name="trash-outline"></ion-icon></button></div></div></div>';
            } else if (type ===  'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix flex" id="Expenses-%id%"><div class="item-description">%description%</div><div class="right clearfix"><div class="item-value">%value%</div><div class="item-percentage">21%</div><div class="item-delete"><button class="item-delete-btn"><ion-icon name="trash-outline"></ion-icon></button></div></div></div>';
            }

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml);
        },

        clearFields: function() {
            let fields, fieldArray;

            fields = document.querySelectorAll(DOMstrings.inputDescription + ',' + DOMstrings.inputValue);
            fieldArray = Array.prototype.slice.call(fields);

            fieldArray.forEach(function(current, index, array) {
                current.value = "";
            });
        },

        getDOMstrings:  () => {
            return DOMstrings;
        }
    };
})()

// Global APP Controller
let controller = (function(budgetCtrl, UICtrl) {
    let setupEventListeners = () => {
        let DOM = UICtrl.getDOMstrings();
        document.querySelector(DOM.inputBtn).addEventListener('click', ctrlAddItem);
        document.addEventListener( 'keypress', function(event) {
            if( event.key === 'Enter' || event.key === 13 ) {
                ctrlAddItem();
            }
        });
    };
    
    let ctrlAddItem = () => {
        let input, newItem;
        input = UICtrl.getInput();
        newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        UICtrl.addListItem(newItem, input.type);
        UICtrl.clearFields();
    };

    return {
        init: () => {
            console.log('Application has started....');
            setupEventListeners();
        }
    };
})(budgetController, UIcontroller);

controller.init();
