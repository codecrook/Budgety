{
    'use strict';

    //------------------------------MODEL------------------------------//
    const budgetModel = (() => {

        const budgetData = {
            allItems: {
                expenses: [],
                income: [],
            },
            totals: {
                expenses: 0,
                income: 0
            }
        }

        class Expense{
            constructor(id, description, value) {
                this.id = id;
                this.description = description;
                this.value = value;
            }
        };

        class Income{
            constructor(id, description, value) {
                this.id = id;
                this.description = description;
                this.value = value;
            }
        };
        
    })();


    //------------------------------VIEW------------------------------//
    const budgetView = (() => {

        const DOMStrings = {
            inputType: '.add__type',
            inputDecription: '.add__description',
            inputValue: '.add__value',
            inputBtn: '.add__btn'
        };

        return {
            getInput() {
                return {
                    type: document.querySelector(DOMStrings.inputType).value,
                    description: document.querySelector(DOMStrings.inputDecription).value,
                    value: document.querySelector(DOMStrings.inputValue).value
                };
            },
            getDOMStrings() {
                return DOMStrings;
            }
        };
    })();


    //------------------------------CONTROLLER------------------------------//
    const budgetController = ((budMod, budVw) => {

        const ctrlAddItem = () => {
            //1. Get the field input data
            const input = budVw.getInput();
            console.log(input);
            //2. Add the data to budgetModel
 
            //3. Add the item to the UI
 
            //4. Calculate the budget
 
            //5. Display the budget on the UI
        };

        //function to setup EventListeners
        const setupEventListeners = () => {
            const controllerDOMStrings = budVw.getDOMStrings();
            const addButton = document.querySelector(controllerDOMStrings.inputBtn);
            
            addButton.addEventListener('click', ctrlAddItem);
            document.addEventListener('keypress', (e) => {
                if (e.keyCode === 13 || e.which === 13) addButton.click();
            });
        };

        
        return {
            init() {
                console.log('application started!');
                setupEventListeners();
            }
        }

    })(budgetModel, budgetView);

    budgetController.init();

}