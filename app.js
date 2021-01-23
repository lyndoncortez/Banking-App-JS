const clients = [];

const addBtn = document.getElementById('add');
const resetBtn = document.getElementById('reset');
const accntName = document.getElementById('accntName');
const accntNo = document.getElementById('accntNo');
const typeOfAccnt = document.querySelector('input[name="accountType"]:checked');
const initDep = document.getElementById('initDep');

var id = 0;

init();

addBtn.addEventListener('click', function(){
    addClient();
    resetField();
})

// resetBtn.addEventListener('click', function(){
//     document.getElementById('accntName').textContent = "";
//     document.getElementById('accntNo').textContent = "";
//     document.getElementById('initDep').textContent = "";
// })

function init(){
    let myTbl = document.getElementById("clientList");
    let tBody = document.createElement("tbody");
    let newClient = {};
    for(let i = 0; i < localStorage.length;i++){
        let lcItem = localStorage.getItem(i);
        let client = JSON.parse(lcItem);
        clients.push(client);
    }  
    id = localStorage.length;
    myTbl.appendChild(tBody);
    tBody.setAttribute("id","clientsList");
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

function addClient(){   
    // console.log("Hello World!")
    let newClient = {};
    
    try {
        if(accntName.value == "" ) throw "Account Name is requied!";
        if(accntNo.value == "") throw "Account Number is required";
        if(initDep.value == "") throw "Initial Balance is required";        
    } catch (err) {
        alert(err);
        return;
    }

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
    newClient.accountName = accntName.value;
    newClient.accountNumber = accntNo.value;
    // accntType = typeOfAccnt.value;
    newClient.typeOfAccount = typeOfAccnt.value;

    let bal = initDep.value;
    let formattedBal = bal.replace(/,/gi, "");
    let newBal = formattedBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
    newClient.balance = newBal;
    let today = new Date;
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0')
    let yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
    newClient.transactionLog = [{
        accountNumber:`${newClient.accountNumber}`,
        transaction:"Created " + `${newClient.accountName}` + " with initial deposit of " + `${newClient.balance}`,
        date: today
    }]
    clients.push(newClient);
    let client = JSON.stringify(newClient);
    localStorage.setItem(`${id}`, client);
    id++;
    
    
    let table = document.getElementById("clientList");
    let tbody = document.createElement("tbody");
    table.appendChild(tbody);
    let row = tbody.insertRow();
   
    let cName = row.insertCell(0);
    let cNo = row.insertCell(1);
    let cType = row.insertCell(2);
    let cBal = row.insertCell(3);
    let tLog = row.insertCell(4);

    cName.innerHTML = newClient.accountName;
    cNo.innerHTML = newClient.accountNumber;
    cType.innerHTML = newClient.typeOfAccount;
    cBal.innerHTML = '₱ ' + newClient.balance;
    
    let a = document.createElement("a");
    tLog.appendChild(a);
    a.innerHTML = "Transaction";
    a.href = "transaction-log.html";
}

function resetField(){
    accntName.value = ""
    accntNo.value = "";
    initDep.value = "";
}