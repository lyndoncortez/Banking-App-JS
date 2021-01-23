
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
    let myTbl = document.getElementById("clientList");
    let tBody = document.getElementsByTagName("tbody");
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
}

function showDeposit() {
    document.getElementById('makeDeposit').style.display = "";
}