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
    let calculateTotal = function(type) {
        let sum = 0;
        data.allItems[type].forEach((item) => {
            sum += item.value;
        });
        data.totals[type] = sum;
    };

    let data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
        
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
        deleteItem: function(type, id){
           let ids, index;
           ids = data.allItems[type].map(function(current) {
                return current.id;
            });
            index = ids.indexOf(id);
            if (index !== -1) {
                data.allItems[type].splice(index, 1);
            }
        },

        calculateBudget: function() {
            // calculate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');
            // calculate the budget: income - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // calculate the percentage of income spent
            if (data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1; // or any default value indicating no income
            }
        },
        
        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percentage: data.percentage
            };
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
        expensesContainer: '.expenses-list',
        budgetValue: '.budget-value',
        incomeValue: '.budget-income-value',
        expensesValue: '.budget-expenses-value',
        percentegeValue: '.budget-expenses-percentage',
        container: '.container'

    };
    return {
        getInput: function() {
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };  
        },
        addListItem: function(obj, type) {
            let html, newHtml, element;

            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="text-white item clearfix flex justify-between border p-2 mb-1.5" id="income-%id%"><div class="item-description">%description%</div><div class="right-0 clearfix flex ml-4"><div class="item-value">%value%</div><div class="item-delete"><button class="item-delete-btn"><ion-icon class="text-green-600 ml-3" name="trash-outline"></ion-icon></button></div></div></div>';
            } else if (type ===  'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="text-white item clearfix flex justify-between border p-2 mb-1.5" id="Expenses-%id%"><div class="item-description">%description%</div><div class="right-0 clearfix flex ml-4"><div class="item-value">%value%</div><div class="item-percentage px-2 ml-4 text-white bg-purple-500">21%</div><div class="item-delete"><button class="item-delete-btn"><ion-icon class="text-red-600 ml-3" name="trash-outline"></ion-icon></button></div></div></div>';
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
            fieldArray[0].focus();
        },

        displayBudget: function(obj) {
            document.querySelector(DOMstrings.budgetValue).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeValue).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesValue).textContent = obj.totalExp;
            if (obj.percentage > 0) {
                document.querySelector(DOMstrings.percentegeValue).textContent = obj.percentage + "%";
            } else {
                document.querySelector(DOMstrings.percentegeValue).textContent = "---";
            }
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

        document.querySelector(DOM.container).addEventListener('click',ctrlDeleteItem);
    };
    
    let updateBudget = function() {
        // calculate the budget
        budgetCtrl.calculateBudget();
        // Return budget the budget
        let budget = budgetCtrl.getBudget();
        //display budget on UI
        // console.log(budget);
        UICtrl.displayBudget(budget);
    };

    let ctrlAddItem = () => {
        let input, newItem;
        input = UICtrl.getInput(); // get field adata

        if (input.description !== "" && !isNaN(input.value) && input.value > 0) {
            newItem = budgetCtrl.addItem(input.type, input.description, input.value); // add item to budget controller
            UICtrl.addListItem(newItem, input.type); // add item to the UI
            UICtrl.clearFields(); // clear fields
            updateBudget(); // calculate and update budget
        }
    };

    let ctrlDeleteItem = function(event) {
        let itemID, splitID, type, ID;
        itemID =  event.target.parentNode.parentNode.parentNode.parentNode.id;
        if  (itemID) {
            splitID = itemID.split("-");
            type = splitID[0];
            ID = parseInt(splitID[1]);
            // delete from data structure
            budgetCtrl.deleteItem(type, ID);
            // Update budget and UI
            updateBudget();
        }
    };
    

    return {
        init: () => {
            console.log('Application has started....');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percentage: -1
            });
            setupEventListeners();
        }
    };
})(budgetController, UIcontroller);

controller.init();
 