
const clients = [];
const addBtn = document.getElementById('add');
const depositBtn = document.getElementById('deposit');
const withdrawBtn = document.getElementById('withdraw');
const transferBtn = document.getElementById('transfer');
const transLogBtn = document.getElementById('transLog');
const closeModal = document.getElementById('closeModal');
const accntName = document.getElementById('accntName');
const accntNo = document.getElementById('accntNo');
const initDep = document.getElementById('initDep');
const form = document.forms.bank;
const radios = form.elements.accountType;


var today = new Date,
    dd = String(today.getDate()).padStart(2, '0'),
    mm = String(today.getMonth() + 1).padStart(2, '0'),
    yyyy = today.getFullYear();

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

transLogBtn.addEventListener('click', () => {
    viewClientHistory();
})

closeModal.addEventListener('click', () => {
    closeTransLog();
})


function init(){
    let myTbl = document.getElementById("clientList");
    let tBody = document.createElement("tbody");

    // parse localStorage item and push to client
    for(let i = 0; i < localStorage.length;i++){
        let lsItem = localStorage.getItem(localStorage.key(i));
        let client = JSON.parse(lsItem);
        clients.push(client);
    }
    // on reload show client record on table
    myTbl.appendChild(tBody);
    tBody.setAttribute("id","clientsList");
    Object.keys(clients).forEach(function(row){
        let tr = tBody.insertRow();
        let td0 = tr.insertCell(0);
        let td1 = tr.insertCell(1);
        let td2 = tr.insertCell(2);
        let td3 = tr.insertCell(3);
        td0.innerHTML = clients[row].accountName;
        td1.innerHTML = clients[row].accountNumber;
        td2.innerHTML = clients[row].accountType;
        td3.setAttribute('id',`${clients[row].accountNumber}`)
        td3.innerHTML = '₱ ' + clients[row].balance;      

    })
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

    let newClient = {};
    let bal = initDep.value;
    let accType = radios.value;
    let formattedBal = bal.replace(/,/gi, "");
    let newBal = formattedBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
    today = dd + '/' + mm + '/' + yyyy;

    // verify that required field are not empty
    try {
        if(accntName.value == "" ) throw "Account Name is required!";
        if(accntNo.value == "") throw "Account Number is required";
        if(initDep.value == "") throw "Initial Balance is required";        
    } catch (err) {
        alert(err);
        return;
    }
    // verify if account name exist and if account is in use.
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
            alert("Account Number already in use.");
            return;
        }
    }

    let table = document.getElementById("clientList");
    let row = table.insertRow();
   
    let cName = row.insertCell(0);
    let cNo = row.insertCell(1);
    let cType = row.insertCell(2);
    let cBal = row.insertCell(3);
    // let tLog = row.insertCell(4);

    newClient.accountName = accntName.value.toUpperCase();
    newClient.accountNumber = accntNo.value;
    newClient.accountType = accType
    newClient.balance = newBal; 
    newClient.transLog = [{
        transaction: ` Created account for ${accntName.value}`,
        amount: `₱${newBal}`,
        date: today
    }]
    cName.innerHTML = newClient.accountName;
    cNo.innerHTML = newClient.accountNumber;
    cType.innerHTML = accType;
    cBal.setAttribute('id', `${accntNo.value}`)
    cBal.innerHTML = '₱ ' + newClient.balance;
    // tLog.innerHTML = '<a href="#logModal" data-toggle="modal" name="">Transaction Log</a>';

    clients.push(newClient);

    console.log(clients);
    console.log(table);

    // save to localStorage
    let client = JSON.stringify(newClient);
    localStorage.setItem(`${accntName.value.toUpperCase()}`,client);

    clearInputFields();
   

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
    let acctName = document.getElementById('depositAcctName').value;
    let amount = document.getElementById('depositAmt').value;
    let bal = document.getElementById(`${acctNum}`);
    let newBal;
    today = dd + '/' + mm + '/' + yyyy;
    
    let clientNameList = [];
    for(let j = 0; j < clients.length; j++){
        let clientsName = clients[j].accountName;
        clientNameList.push(clientsName);
    }
    let isClientInList = clientNameList.includes(acctName.toUpperCase());
    // console.log(isClientInList);
    if(isClientInList !== true){
        alert(`Please verify that Account Name: ${accntName.value} is enrolled and correct. `);
        return;
    }else{
        let client;
        for (let i = 0; i < clients.length; i++) {
            if (acctNum === clients[i].accountNumber && acctName.toUpperCase() === clients[i].accountName.toUpperCase()) {
                let clientBal = clients[i].balance;
                let formattedBal = clientBal.replace(/,/g, "");
                let intBal = parseInt(formattedBal);
                intBal += parseInt(amount);
                newBal = intBal.toString();
                newUserBal = newBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
                bal.innerHTML = `₱ ${newUserBal}`;
                clients[i].balance = newUserBal;
                clients[i].transLog.push({
                    transaction: `Deposit`,
                    amount: `₱${amount.replace(/\d(?=(?:\d{3})+$)/g, '$&,')}`,
                    date:today
                });
                client = clients[i];
                let lsItem = JSON.stringify(client);
                localStorage.setItem(`${acctName.toUpperCase()}`,lsItem);
            }
        }
    }  

    clearInputFields();
}


function createWithdraw() {
    let acctNum = document.getElementById('withdrawAcctNum').value;
    let acctName = document.getElementById('withdrawAcctName').value;
    let amount = document.getElementById('withdrawAmt').value;
    let bal = document.getElementById(`${acctNum}`);
    let newBal;
    today = dd + '/' + mm + '/' + yyyy;
    
    let clientNameList = [];
    for(let j = 0; j < clients.length; j++){
        let clientsName = clients[j].accountName;
        clientNameList.push(clientsName);
    }
    let isClientInList = clientNameList.includes(acctName.toUpperCase());
    if(isClientInList !== true){
        alert(`Please verify that Account Name: ${accntName.value} is enrolled and correct. `);
        return;
    }else{
        let client;
        for (let i = 0; i < clients.length; i++) {
            if (acctNum === clients[i].accountNumber && acctName.toUpperCase() === clients[i].accountName.toUpperCase()) {
                let clientBal = clients[i].balance;
                let formattedBal = clientBal.replace(/,/g, "");
                let intBal = parseInt(formattedBal);
                intBal -= parseInt(amount);
                newBal = intBal.toString();
                newUserBal = newBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
                bal.innerHTML = `₱ ${newUserBal}`;
                clients[i].balance = newUserBal;
                clients[i].transLog.push({
                    transaction: `Withdraw`,
                    amount: `₱${amount.replace(/\d(?=(?:\d{3})+$)/g, '$&,')}`,
                    date:today
                });
                client = clients[i];
                let lsItem = JSON.stringify(client);
                localStorage.setItem(`${acctName.toUpperCase()}`,lsItem);
            }
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
    today = dd + '/' + mm + '/' + yyyy;

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
                    clients[i].transLog.push({
                        transaction: `transfer to ${clients[j].accountName}`,
                        amount: `₱${amount.replace(/\d(?=(?:\d{3})+$)/g, '$&,')}`,
                        date:today
                    });
                    let frmAccntName = clients[i].accountName;
                    let fromClient = clients[i];
                    let lsItem = JSON.stringify(fromClient);
                    localStorage.setItem(`${frmAccntName.toUpperCase()}`,lsItem);
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
                    clients[j].transLog.push({
                        transaction: `recieved from ${clients[i].accountName}`,
                        amount: `₱${amount.replace(/\d(?=(?:\d{3})+$)/g, '$&,')}`,
                        date:today
                    });
                    let toAccntName = clients[j].accountName;
                    let toClient = clients[j];
                    let lsItem = JSON.stringify(toClient);
                    localStorage.setItem(`${toAccntName.toUpperCase()}`,lsItem);
                }
            }
        } 
    }

    clearInputFields();
}

function myFilter() {
    let input, filter, table, tr, td, i, textValue;
    input = document.getElementById("filterDir");
    filter = input.value.toUpperCase();
    table = document.getElementById("clientList");
    tr = table.getElementsByTagName("tr");
   if(isNaN(filter)){
        return;
   }else{
        for(i=0;i<tr.length;i++){
            td = tr[i].getElementsByTagName("td")[1];
            if(td){
                textValue = td.textContent || td.innerHTML;
                if(textValue.indexOf(filter) > -1){
                    tr[i].style.display = "";
                }else{
                    tr[i].style.display = "none";
                }
            }
        }
    }
}

function viewClientHistory() {
    let searchAccntNo = document.getElementById('filterDir');
    let modalAccntNo = document.getElementById('logAccntNum');
    let tblBodylog = document.getElementById("clientLogBody");
    let clAccntNo = [], 
        isAccntInList;
    modalAccntNo.value = searchAccntNo.value;
    for(let x = 0; x < clients.length; x++){
        let clAcNo = clients[x].accountNumber;
        clAccntNo.push(clAcNo);
    }
    isAccntInList = clAccntNo.includes(modalAccntNo.value);
    
    if(isAccntInList !== true || modalAccntNo.value == ""){
        let tr = tblBodylog.insertRow();
        return;
    } else {
        for(let i = 0; i < clients.length; i++){
            if(modalAccntNo.value === clients[i].accountNumber){
                let clientLog = clients[i].transLog;
                for(let j = 0; j < clientLog.length; j++){
                    
                    let transAmount = clients[i].transLog[j].amount;
                    let formattedBal = transAmount.replace(/,/gi, "");
                    let amount = formattedBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
                    
                    let tr = tblBodylog.insertRow();
        
                    let td0 = tr.insertCell(0);
                    let td1 = tr.insertCell(1);
                    let td2 = tr.insertCell(2);
                    
                    td0.innerHTML = clients[i].transLog[j].transaction;
                    td1.innerHTML = amount;
                    td2.innerHTML = clients[i].transLog[j].date;
                }        
            } 
        }
    }  
}

function closeTransLog(){
    let table = document.getElementById("clientLogBody");
    let tr = table.getElementsByTagName("tr");
    if(tr.length !== 0){
        // for(let i = 0; i <= tr.length; i++){    

        //     table.deleteRow(i);
        // }
        table.innerHTML = "";
    }else{
        return;
    }   
}

function submitform() {
    var f = document.getElementsByTagName('form')[0];
    if(f.reportValidity()) {
      f.submit();
    }
  }