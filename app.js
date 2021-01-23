// const clients = [
//     {
//         accountName: "JM",
//         accountNumber:"001",
//         typeOfAccount:"Savings",
//         balance:100
//     },
//     {
//         accountName: "test1",
//         accountNumber:"002",
//         typeOfAccount:"Savings",
//         balance:100
//     },
//     {
//         accountName: "test2",
//         accountNumber:"003",
//         typeOfAccount:"Savings",
//         balance:100
//     }
// ];

const addBtn = document.getElementById('add');
const resetBtn = document.getElementById('reset');
const accntName = document.getElementById('accntName');
const accntNo = document.getElementById('accntNo');
const typeOfAccnt = document.querySelector('input[name="accountType"]:checked');
const initDep = document.getElementById('initDep');

init();

addBtn.addEventListener('click', function(){
    addClient();

})

// resetBtn.addEventListener('click', function(){
//     document.getElementById('accntName').textContent = "";
//     document.getElementById('accntNo').textContent = "";
//     document.getElementById('initDep').textContent = "";
// })

function init(){
    let myTbl = document.getElementById("clientList");
    let tBody = document.getElementsByTagName("tbody");
    // myTbl.appendChild(tBody);
    // tBody.setAttribute("id","clientsList");
    // Object.keys(clients).forEach(function(row){
    //     let tr = tBody.insertRow();
    //     let td0 = tr.insertCell(0);
    //     let td1 = tr.insertCell(1);
    //     let td2 = tr.insertCell(2);
    //     let td3 = tr.insertCell(3);
    //     td0.innerHTML = clients[row].accountName;
    //     td1.innerHTML = clients[row].accountNumber;
    //     td2.innerHTML = clients[row].typeOfAccount;
    //     td3.innerHTML = clients[row].balance;
    // })
}

function addClient(){   
    // console.log("Hello World!")
    let newClient = {};

    
    newClient.accountName = accntName.value;
    newClient.accountNumber = accntNo.value;
    // accntType = typeOfAccnt.value;
    newClient.typeOfAccount = typeOfAccnt.value;

    let bal = initDep.value;
    let formattedBal = bal.replace(/,/gi, "");
    let newBal = formattedBal.replace(/\d(?=(?:\d{3})+$)/g, '$&,');
    newClient.balance = newBal;
    // clients.push(newClient);
    
    
    let table = document.getElementById("clientList");
    let row = table.insertRow();
   
    let cName = row.insertCell(0);
    let cNo = row.insertCell(1);
    let cType = row.insertCell(2);
    let cBal = row.insertCell(3);
    let tLog = row.insertCell(4);

    cName.innerHTML = newClient.accountName;
    cNo.innerHTML = newClient.accountNumber;
    cType.innerHTML = newClient.typeOfAccount;
    cBal.innerHTML = '₱ ' + newClient.balance;
    tLog.innerHTML = '<a href=http://example.com/ target="_blank">Transaction Log</a>';
}