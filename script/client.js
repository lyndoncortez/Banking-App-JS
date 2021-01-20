const clients = [];

const addBtn = document.getElementById('add');
const resetBtn = document.getElementById('reset');



addBtn.addEventListener('click', function(){
    addClient();
    addClientToList();

})

resetBtn.addEventListener('click', function(){
    document.getElementById('accntName').textContent = "";
    document.getElementById('accntNo').textContent = "";
    document.getElementById('initDep').textContent = "";
})

function addClient(){
    
    let accntName = document.getElementById('accntName');
    let accntNo = document.getElementById('accntNo');
    let typeOfAccnt = document.getElementById('accntType');
    let initDep = document.getElementById('initDep');
    let accntType,
    newClient = {}

    
    newClient.accountName = accntName.value;
    newClient.accountNumber = accntNo.value;
    // accntType = typeOfAccnt.value;
    newClient.typeOfAccount = typeOfAccnt.value;
    newClient.balance = initDep.value;
    clients.push(newClient);
    // console.log(clients);
}

function addClientToList(){
    let tbodyRef = document.getElementById('clientList').getElementsByTagName('tbody')[0];

    let newRow = tbodyRef.insertRow();

    let accntNameCell = newRow.insertCell(0);
    let accntNoCell = newRow.insertCell(1);
    let accntTypeCell = newRow.insertCell(2);
    let balanceCell = newRow.insertCell(3);

    for(let i = 0; i<clients.length; i++){
        // let client = clients[i];
        let cName = document.createTextNode(clients[0].accountName);
        let cNo = document.createTextNode(clients[0].accountNumber);
        let cToA = document.createTextNode(clients[0].typeOfAccount);
        let cBal = document.createTextNode(clients[0].balance);
        accntNameCell.appendChild(cName);
        accntNoCell.appendChild(cNo);
        accntTypeCell.appendChild(cToA);
        balanceCell.appendChild(cBal);
    }

}


