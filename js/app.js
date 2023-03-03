// Classes
class Budget{
    constructor (budget){
        this.budget = Number(budget);
        this.budgetLeft = this.budget;
    }

     // Substrack from the budget
     substractFromBudget(amount){
        return this.budgetLeft -= amount;
    }

}

// Everything related to HTML
class HTML{

    // Inserts the budget when user submits it
    insertBudget(amount){
        // Insert into HTML
        budgetTotal.innerHTML = `${amount}`;
        budgetLeft.innerHTML = `${amount}`;
    }

   


    //Displays a message (correct or invalid)
    printMessage(message, className){
        const messageWrapper = document.createElement('div');
        messageWrapper.classList.add('text-center', 'alert', className);
        messageWrapper.appendChild(document.createTextNode(message));

        // Insert into HTML
        document.querySelector('.primary').insertBefore(messageWrapper, addExpenseForm);

        // Clear the error
        setTimeout(function(){
            document.querySelector('.primary .alert').remove();
            //Reset Form
            addExpenseForm.reset();
        }, 3000);

    }

    addExpenseToList(name, amount){
        const expenseList = document.querySelector('#expenses ul');

        //create a li
        const li = document.createElement('li');
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        // create the template
        li.innerHTML = `
            ${name}
            <span class="badge bg-primary badge-pill">${amount}</span>
        `;

        // Insert into the HTML
        expenseList.appendChild(li);
    }

    // Subtract expense amount from budget
    trackBudget(amount){
        const budgetLeftDollars = budget.substractFromBudget(amount);
        budgetLeft.innerHTML = `${budgetLeftDollars}`;

        //Check when 50% is spent
        if(budget.budget / 4 > budgetLeftDollars){

            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');

            budgetLeft.parentElement.parentElement.classList.add('alert-danger');   
        }else if(budget.budget / 2 > budgetLeftDollars){

            budgetLeft.parentElement.parentElement.classList.remove('alert-success', 'alert-warning');

            budgetLeft.parentElement.parentElement.classList.add('alert-warning'); 
        }
    }

}


//Variables
const addExpenseForm = document.querySelector('#add-expense'),
    budgetTotal = document.querySelector('span#total'),
    budgetLeft = document.querySelector('span#left');

let budget, userBudget;

//Instanciate the HTML Class
html = new HTML();


//Event Listeners
eventListeners();
function eventListeners(){

    // App Init
    document.addEventListener('DOMContentLoaded', function(){
        // Ask the visitor weekly budget
        userBudget = prompt('Whats\'s your budget for this week? ');
        //validate the userBudget
        if(userBudget === null || userBudget === '' || userBudget === '0'){
            window.location.reload();
        }else{
            // Budget us valid instanciate the budget class
            budget = new Budget(userBudget);

           //Instanciate HTML class
           html.insertBudget(budget.budget);

        }
    });

    // When a new expense is added.
    addExpenseForm.addEventListener('submit', function(e){
        e.preventDefault();
        // Read the input va(lues
        const expenseName = document.querySelector('#expense').value;
        const amount = document.querySelector('#amount').value;

        if(expenseName === '' || amount === ''){
            html.printMessage('Insert empty Fields', 'alert-danger');
        }else{
            //Add expense into the list
            html.addExpenseToList(expenseName, amount);
            html.trackBudget(amount);
            html.printMessage('Added ....', 'alert-success');

        }

    });

}