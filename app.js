{
    'use strict';

    //------------------------------MODEL------------------------------//
    const budgetModel = (() => {

        const data = {
            allItems: {
                exp: [],
                inc: [],
            },
            totals: {
                exp: 0,
                inc: 0
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

        return {
            addItem(type, desc, val) {
                let newItem, ID;

                //create new ID
                if (data.allItems[type].length > 0) {
                    ID = data.allItems[type][data.allItems[type].length - 1].id + 1;
                } else {
                    ID = 0;
                }

                //create new item based on 'exp' or 'inc'
                if (type === 'exp') {
                    newItem = new Expense(ID, desc, val);
                } else if (type === 'inc') {
                    newItem = new Income(ID, desc, val);
                }

                //add the item to our data structure

                //return the new item
                data.allItems[type].push(newItem);
                return newItem;
            },

            //just a testing function--to be deleted at project complletion
            testing() {
                console.log(data);
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
            console.log(input);//test code

            //2. Add the data to budgetModel
            let newItem = budMod.addItem(input.type, input.description, input.value);
            budMod.testing();//testing if the data is added in data structure or not
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