const balance = document.getElementById("balance");
const money_plus = document.getElementById('money-plus');
const money_minus= document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');


const localStorageTransaction = JSON.parse(localStorage.getItem("transactions"));
let transactions = localStorage.getItem("transactions") !== null ? localStorageTransaction: [];

//Add Transactions
function addTransaction(e) {
    e.preventDefault();
    if(text.value.trim() === "" || amount.value.trim() === ""){
        alert("Please enter text and value");
    }else{
        const transaciton={
            id:generateID(),
            text:text.value,
            amount: +amount.value
        };

        transactions.push(transaciton);
        addTransactionDOM(transaciton);
        saveData();
        updateValues();
        text.value="";
        amount.value="";

    }
}

//

function generateID() {
    return Math.floor(Math.random()*10000000000);
}

function addTransactionDOM(transaction) {
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(transaction.amount < 0 ? "minus" : "plus")

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span>
    <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

//Remove Transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaciton => transaciton.id !== id);
    Init();
    saveData();
}

//Update Values

function updateValues() {
    const amounts = transactions.map((transaction) => transaction.amount);
    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);
    const income = amounts.filter((item) => item > 0).reduce((acc,item) => (acc += item),0).toFixed(2);
    const expense = (amounts.filter((item) => item < 0).reduce((acc,item) => (acc += item),0)* -1).toFixed(2);

    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
}

//Init App
function Init() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

//Save Data
function saveData() {
       localStorage.setItem("transactions",JSON.stringify(transactions));
}



Init();

form.addEventListener("submit", addTransaction);
