
const clients = [];
const addBtn = document.getElementById('add');
const accntName = document.getElementById('accntName');
const accntNo = document.getElementById('accntNo');
const initDep = document.getElementById('initDep');
const form = document.forms.bank;
const radios = form.elements.accountType;

init();

addBtn.addEventListener('click', () => {
    addClient();
})


function init(){
    let tBody = document.getElementsByTagName("tbody");

    for(let i = 0; i < localStorage.length;i++){
        let lcItem = localStorage.getItem(i);
        let client = JSON.parse(lcItem);
        clients.push(client);
    }  

    id = localStorage.length;

    Object.keys(clients).forEach(function(row){
        let tr = tBody.insertRow();
        let td0 = tr.insertCell(0);
        let td1 = tr.insertCell(1);
        let td2 = tr.insertCell(2);
        let td3 = tr.insertCell(3);
        let td4 = tr.insertCell(4);
        td0.innerHTML = clients[row].accountName;
        td1.innerHTML = clients[row].accountNumber;
        td2.innerHTML = clients[row].typeOfAccount;
        td3.innerHTML = '₱ ' + clients[row].balance;
        let a = document.createElement("a");
        td4.append(a);
        a.innerHTML = "Transaction";
        a.href = "#";

    })
}

function clearInputFields() {
    document.getElementById('accntName').value = "";
    document.getElementById('accntNo').value = "";
    document.getElementById('initDep').value = "";
}

function addClient(){   

    let newClient = {};
    let bal = initDep.value;
    let accType = radios.value;
    let formattedBal = bal.replace(/,/gi, "");
    let newBal = formattedBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');

    try {
        if(accntName.value == "" ) throw "Account Name is required!";
        if(accntNo.value == "") throw "Account Number is required";
        if(initDep.value == "") throw "Initial Balance is required";        
    } catch (err) {
        alert(err);
        return;
    }

    let table = document.getElementById("clientList");
    let row = table.insertRow();
   
    let cName = row.insertCell(0);
    let cNo = row.insertCell(1);
    let cType = row.insertCell(2);
    let cBal = row.insertCell(3);
    let tLog = row.insertCell(4);

    newClient.accountName = accntName.value;
    newClient.accountNumber = accntNo.value;
    newClient.balance = newBal; 

    cName.innerHTML = newClient.accountName;
    cNo.innerHTML = newClient.accountNumber;
    cType.innerHTML = accType;
    cBal.innerHTML = '₱ ' + newClient.balance;
    tLog.innerHTML = '<a href=http://example.com/ target="_blank">Transaction Log</a>';

    clearInputFields();

    let x = Object.keys(clients);
    for(let i = 0; i < x.length; i++){
        let accName = clients[i].accountName;
        let accNo = clients[i].accountNumber;
        let strAccName = accName.toUpperCase();
        let strAccntName = accntName.value.toUpperCase();
        if(strAccName === strAccntName){
            alert("Client Already Exist.");
            return;
        }
        if(accNo === accntNo.value){
            alert("Account Number not available.");
            return;
        }
    }
}

function showDeposit() {
    document.getElementById('makeDeposit').style.display = "";
    document.getElementById('addUser').style.display = "none";
    document.getElementById('makeWithdraw').style.display = "none";
    document.getElementById('makeTransfer').style.display = "none";
}

function showWithdraw() {
    document.getElementById('makeDeposit').style.display = "none";
    document.getElementById('addUser').style.display = "none";
    document.getElementById('makeWithdraw').style.display = "";
    document.getElementById('makeTransfer').style.display = "none";
}

function showTransfer() {
    document.getElementById('makeDeposit').style.display = "none";
    document.getElementById('addUser').style.display = "none";
    document.getElementById('makeWithdraw').style.display = "none";
    document.getElementById('makeTransfer').style.display = "";
}