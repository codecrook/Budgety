{
    'use strict';
    let budgetModel = (function () {
        
    })();

    let budgetView = (function () {
        
    })();

    let controller = (function (budMod, budVw) {
        let addButton = document.querySelector('.add__btn');
        
        addButton.addEventListener('click', (e) => {
            //1. Get the field input data
            alert('clicked!!');
            //2. Add the data to budgetModel

            //3. Add the item to the UI

            //4. Calculate the budget

            //5. Display the budget on the UI


        });

        document.addEventListener('keypress', (e) => {
            if (e.keyCode === 13 || e.which === 13) addButton.click(); 
        });

    })(budgetModel, budgetView);
}