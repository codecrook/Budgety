{
    'use strict';

    //MODEL
    let budgetModel = (() => {
        
    })();


    //VIEW
    let budgetView = (() => {
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


    //CONTROLLER
    let controller = ((budMod, budVw) => {

        const controllerDOMStrings = budVw.getDOMStrings();
        const addButton = document.querySelector(controllerDOMStrings.inputBtn);


        let ctrlAddItem = () => {
            //1. Get the field input data
            const input = budVw.getInput();
            console.log(input);
            //2. Add the data to budgetModel
 
            //3. Add the item to the UI
 
            //4. Calculate the budget
 
            //5. Display the budget on the UI
        };
        
        addButton.addEventListener('click', ctrlAddItem);
        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) addButton.click(); 
        });

    })(budgetModel, budgetView);
}