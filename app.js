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
            },
            budget: 0,
            percentage: -1
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

        const calculateToatal = (type) => {
            let sum = 0;

            data.allItems[type].forEach((cur) => {
                sum += cur.value;
            });

            data.totals[type] = sum;
        }
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
                data.allItems[type].push(newItem);
                
                //return the new item
                return newItem;
            },
            calculateBudget() {
                //Calculate total income and expenses
                calculateToatal('inc');
                calculateToatal('exp');

                //Calculate the Budget: income - expense
                data.budget = data.totals.inc - data.totals.exp;

                //Calculate the percentage of income spent
                if (data.totals.inc > 0) {
                    data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100); 
                } else {
                    data.percentage = -1;
                }
            },
            getBudget() {
                return {
                    budget: data.budget,
                    totalInc: data.totals.inc,
                    totalExp: data.totals.exp,
                    percentage: data.percentage
                };
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
            inputBtn: '.add__btn',
            incomeContainer: '.income__list',
            expensesContainer: '.expenses__list',
            budgetLabel: '.budget__value',
            incomeLabel: '.budget__income--value',
            expensesLable: '.budget__expenses--value',
            percentageLable: '.budget__expenses--percentage'
            
        };

        return {
            getInput() {
                return {
                    type: document.querySelector(DOMStrings.inputType).value,
                    description: document.querySelector(DOMStrings.inputDecription).value,
                    value: parseFloat(document.querySelector(DOMStrings.inputValue).value)
                };
            },
            addListItem(obj, type) {
                let html = '', newHTML = '', container;
                //Create HTMl string with placeholder value
                if (type === 'inc') {
                    container = DOMStrings.incomeContainer;
                    html = `<div class="item clearfix" id="income-%id%">
                                <div class="item__description">%description%</div>
                                <div class="right clearfix">
                                    <div class="item__value">%value%</div>
                                    <div class="item__delete">
                                        <button class="item__delete--btn">
                                            <i class="ion-ios-close-outline"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>`;
                } else if (type === 'exp') {
                    container = DOMStrings.expensesContainer;
                    html = `<div class="item clearfix" id="expense-%id%">
                                <div class="item__description">%description%</div>
                                <div class="right clearfix">
                                    <div class="item__value">%value%</div>
                                    <div class="item__percentage">21%</div>
                                    <div class="item__delete">
                                        <button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button>
                                    </div>
                                </div>
                            </div>`;
                }

                //Replace the placeholder text with some actual data
                newHTML = html.replace('%id%', obj.id);
                newHTML = newHTML.replace('%description%', obj.description);
                newHTML = newHTML.replace('%value%', obj.value);

                //Insert HTML into the DOM
                document.querySelector(container).insertAdjacentHTML('beforeend', newHTML);
            },
            clearFields() {
                //Select all the input fields
                const inputFields = document.querySelectorAll(`${DOMStrings.inputDecription}, ${DOMStrings.inputValue}`);
                //Convert the NodeList returned by querySelectorAll to an array
                const inputFieldsArray = Array.from(inputFields);

                //Set the value of all input fields to blank i.e clear the input fields
                inputFieldsArray.forEach((current, index, array) => current.value = '');
                //Set the focus back to the first input field i.e the Description field
                inputFieldsArray[0].focus();
            },
            displayBudget(obj) {
                document.querySelector(DOMStrings.budgetLabel).textContent = obj.budget;
                document.querySelector(DOMStrings.incomeLabel).textContent = obj.totalInc;
                document.querySelector(DOMStrings.expensesLable).textContent = obj.totalExp;
                
                if (obj.percentage > 0) {
                    document.querySelector(DOMStrings.percentageLable).textContent = `${obj.percentage}%`;
                } else {
                    document.querySelector(DOMStrings.percentageLable).textContent = '---';
                }
            },
            getDOMStrings() {
                return DOMStrings;
            }
        };
    })();


    //------------------------------CONTROLLER------------------------------//
    const budgetController = ((budMod, budVw) => {

        const updateBudget = () => {
            //1. Calculate the budget
            budMod.calculateBudget();

            //2. Return the budget
            const budget = budMod.getBudget();

            //3. Display the budget on the UI
            console.log(budget); //testing
            budVw.displayBudget(budget);
        }

        const ctrlAddItem = () => {
            //1. Get the field input data
            const input = budVw.getInput();
            console.log(input);//test code

            if (input.description !== '' && !isNaN(input.value) && input.value > 0) {
                //2. Add the data to budgetModel
                let newItem = budMod.addItem(input.type, input.description, input.value);
                budMod.testing();//testing if the data is added in data structure or not

                //3. Add the item to the UI
                budVw.addListItem(newItem, input.type);

                //4. Clear the nput fields
                budVw.clearFields();

                //5. Calculate and update the budget
                updateBudget();
            }
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
                budVw.displayBudget({
                    budget: 0,
                    totalInc: 0,
                    totalExp: 0,
                    percentage: -1
                });
                setupEventListeners();
            }
        }

    })(budgetModel, budgetView);

    budgetController.init();

}