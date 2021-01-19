const client = [];
const addBnt = document.getElementById('add');
const accntName = document.getElementById('accntName');
const accntNo = document.getElementById('accntNo');
const accntType = document.getElementById('accntType');
const bal = document.getElementById('initDep');
var accountType = $("input:radio[name=accntType]:checked").val()



addBnt.addEventListener('click', function(){
    addClient();
})

function addClient(){
    let newClient = {}
    newClient.accountName = accntName.textContent;
    newClient.accountNumber = accntNo.textContent;
    newClient.accountType = accountType;
    newClient.balance = parseFloat(bal.textContent);
    console.log(newClient.accountName + newClient.accountNumber + newClient.accountType + newClient.balance);
}