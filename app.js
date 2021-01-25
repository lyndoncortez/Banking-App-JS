
const clients = [];
const addBtn = document.getElementById('add');
const depositBtn = document.getElementById('deposit');
const withdrawBtn = document.getElementById('withdraw');
const transferBtn = document.getElementById('transfer');
const accntName = document.getElementById('accntName');
const accntNo = document.getElementById('accntNo');
const initDep = document.getElementById('initDep');
const form = document.forms.bank;
const radios = form.elements.accountType;

init();

addBtn.addEventListener('click', () => {
    addClient();
})

depositBtn.addEventListener('click', () => {
    createDeposit();
})

withdrawBtn.addEventListener('click', () => {
    createWithdraw();
})

transferBtn.addEventListener('click', () => {
    createTransfer();
})




function init(){
    let tBody = document.getElementsByTagName("tbody");

    // for(let i = 0; i < localStorage.length;i++){
    //     let lcItem = localStorage.getItem(i);
    //     let client = JSON.parse(lcItem);
    //     clients.push(client);
    // }  

    // id = localStorage.length;

    // Object.keys(clients).forEach(function(row){
    //     let tr = tBody.insertRow();
    //     let td0 = tr.insertCell(0);
    //     let td1 = tr.insertCell(1);
    //     let td2 = tr.insertCell(2);
    //     let td3 = tr.insertCell(3);
    //     let td4 = tr.insertCell(4);
    //     td0.innerHTML = clients[row].accountName;
    //     td1.innerHTML = clients[row].accountNumber;
    //     td2.innerHTML = clients[row].typeOfAccount;
    //     td3.innerHTML = '₱ ' + clients[row].balance;
    //     let a = document.createElement("a");
    //     td4.append(a);
    //     a.innerHTML = "Transaction";
    //     a.href = "#";

    // })
}

function clearInputFields() {
    document.getElementById('accntName').value = "";
    document.getElementById('accntNo').value = "";
    document.getElementById('initDep').value = "";

    document.getElementById('depositAcctName').value= "";
    document.getElementById('depositAcctNum').value= "";
    document.getElementById('depositAmt').value= "";

    document.getElementById('withdrawAcctName').value= "";
    document.getElementById('withdrawAcctNum').value= "";
    document.getElementById('withdrawAmt').value= "";

    document.getElementById('fromAcctNum').value= "";
    document.getElementById('toAcctNum').value= "";
    document.getElementById('transferAmt').value= "";
}

function addClient(){   

    let newClient = [];
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
    newClient.accountType = accType
    newClient.balance = newBal; 
    newClient.transaction = [` Created account for ${accntName.value} with initial deposit of ₱${newBal}`]

    cName.innerHTML = newClient.accountName;
    cNo.innerHTML = newClient.accountNumber;
    cType.innerHTML = accType;
    cBal.setAttribute('id', `${accntNo.value}`)
    cBal.innerHTML = '₱ ' + newClient.balance;
    tLog.innerHTML = '<a href="#logModal" data-toggle="modal" name="">Transaction Log</a>';

    clients.push(newClient);

    console.log(clients);
    console.log(table);

    clearInputFields();

    // let x = Object.keys(clients);
    // for(let i = 0; i < x.length; i++){
    //     let accName = clients[i].accountName;
    //     let accNo = clients[i].accountNumber;
    //     let strAccName = accName.toUpperCase();
    //     let strAccntName = accntName.value.toUpperCase();
    //     if(strAccName === strAccntName){
    //         alert("Client Already Exist.");
    //         return;
    //     }
    //     if(accNo === accntNo.value){
    //         alert("Account Number not available.");
    //         return;
    //     }
    // }

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


function createDeposit() {
    let acctNum = document.getElementById('depositAcctNum').value;
    let amount = document.getElementById('depositAmt').value;
    let bal = document.getElementById(`${acctNum}`);
    let newBal;

    for (let i = 0; i < clients.length; i++) {
        if (acctNum === clients[i].accountNumber) {
            let clientBal = clients[i].balance;
            let formattedBal = clientBal.replace(/,/g, "");
            let intBal = parseInt(formattedBal);
            intBal += parseInt(amount);
            newBal = intBal.toString();
            newUserBal = newBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
            bal.innerHTML = `₱ ${newUserBal}`;
            clients[i].balance = newUserBal;
            clients[i].transaction.push(`Account Number: ${acctNum} deposited ₱${amount.replace(/\d(?=(?:\d{3})+$)/g, '$&,')}`);
        }
    }

    clearInputFields();
}


function createWithdraw() {
    let acctNum = document.getElementById('withdrawAcctNum').value;
    let amount = document.getElementById('withdrawAmt').value;
    let bal = document.getElementById(`${acctNum}`);
    let newBal;

    for (let i = 0; i < clients.length; i++) {
        if (acctNum === clients[i].accountNumber) {
            let clientBal = clients[i].balance;
            let formattedBal = clientBal.replace(/,/g, "");
            let intBal = parseInt(formattedBal);
            intBal -= parseInt(amount);
            newBal = intBal.toString();
            newUserBal = newBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
            bal.innerHTML = `₱ ${newUserBal}`;
            clients[i].balance = newUserBal;
            clients[i].transaction.push(`Account Number:${acctNum} withdrew ₱${amount.replace(/\d(?=(?:\d{3})+$)/g, '$&,')}`)
        }
    }

    clearInputFields();
}


function createTransfer() {
    let frAccntNum = document.getElementById('fromAcctNum').value;
    let toAccntNum = document.getElementById('toAcctNum').value;
    let amount = document.getElementById('transferAmt').value;
    let fromBal = document.getElementById(`${frAccntNum}`);
    let toBal = document.getElementById(`${toAccntNum}`);
    

    for (let i = 0; i < clients.length; i++) {
        if (frAccntNum === clients[i].accountNumber) {
            for (let j = 0;j < clients.length; j++) {
                if (toAccntNum === clients[j].accountNumber) {
                    let clientBal = clients[i].balance;
                    let formattedBal = clientBal.replace(/,/g, "");
                    let intBal = parseInt(formattedBal);
                    intBal -= parseInt(amount);
                    let newBal = intBal.toString();
                    newUserBal = newBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
                    fromBal.innerHTML = `₱ ${newUserBal}`;
                    clients[i].balance = newUserBal;
                }

                if (toAccntNum === clients[j].accountNumber) {
                    let toClientBal = clients[j].balance;
                    let toFormattedBal = toClientBal.replace(/,/g, "");
                    let toIntBal = parseInt(toFormattedBal);
                    toIntBal += parseInt(amount);
                    let toNewBal = toIntBal.toString();
                    toNewUserBal = toNewBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
                    toBal.innerHTML = `₱ ${toNewUserBal}`;
                    clients[j].balance = toNewUserBal;
                }
            }
        } 
    }

    clearInputFields();
}

