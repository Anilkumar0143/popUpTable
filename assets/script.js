let firstname = document.getElementById('fname');
let lasttname = document.getElementById('lname');
let vf = document.getElementById("valuef");
let vl = document.getElementById("valuel");
let tbody = document.getElementById('tbody');
let btn = document.querySelector('#button');
let clearBtn = document.querySelector('#clearData');

let empId;
let edtindex;
let details = [];

//geting data from local storage
if (localStorage.length > 0) {
    createTable();
}
// creating constructor
class Emp {
    constructor(id, fname, lname, edit) {
        this.id = id;
        this.fname = fname;
        this.lname = lname;
        this.edit = edit;
    }
}
//saving user or updating user in localStorage
btn.addEventListener('click', () => {

    if (empId) {
        // updating existing data
        let updatedval = new Emp(empId, firstname.value, lasttname.value, false);
        details[edtindex] = updatedval;
        localStorage.setItem("student", JSON.stringify(details));
        createTable();
        empId = "";
    } else {
        const iduser = Math.floor(Math.random() * 999);
        //new object
        let obj = new Emp(iduser, firstname.value, lasttname.value, false);
        //pushing obj to array
        details.push(obj);
        //storing in localStorage
        localStorage.setItem("student", JSON.stringify(details));
        createTable();
    }

})

//creating table with localStorage
function createTable() {
    //geting data from localStorage
    let locdata = localStorage.getItem('student');
    let data = JSON.parse(locdata);
    //pushing localStorage data to array
    details = [...data];
    //table  row cells with localstorage data
    tbody.innerHTML = "";
    data.map((ele, index) => {

        let row = tbody.insertRow(0);
        row.setAttribute('id', ele.id);
        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(3);

        cell1.innerHTML = ele.id;
        cell2.innerHTML = ele.fname;
        cell3.innerHTML = ele.lname;

        //activating model box
        cell1.setAttribute("data-toggle", "modal");
        cell1.setAttribute("data-target", "#exampleModalCenter");
        //creating delete button
        let delBtn = document.createElement('button');
        delBtn.setAttribute('type', 'button');
        delBtn.setAttribute('id', 'delete');
        delBtn.innerHTML = "del";
        delBtn.setAttribute('class', 'btn btn-danger mx-2');
        cell4.appendChild(delBtn);
        //creating edit button
        let editBtn = document.createElement('button');
        editBtn.setAttribute('type', 'button')
        editBtn.setAttribute('id', 'edit')
        editBtn.innerHTML = "edit";
        editBtn.setAttribute('class', 'btn btn-primary mx-2');
        cell5.appendChild(editBtn);

        let delUserBtn = document.getElementById('delete');
        let edtUserBtn = document.getElementById('edit');
        //action for delete btn
        delUserBtn.addEventListener('click', () => {
            details.splice(index, 1);
            row.innerHTML = "";
            localStorage.setItem("student", JSON.stringify(details));

        })
        //action for edit btn
        edtUserBtn.addEventListener('click', () => {
            row.innerHTML = "";
            firstname.value = ele.fname;
            lasttname.value = ele.lname;
            id = ele.id;
            ele.edit = true;
            edtindex = index;
            empId = id;
            details[index].edit = true;
            localStorage.setItem("student", JSON.stringify(details));
        })

    });


    // //geting row values
    if (tbody) {
        for (var i = 0; i < tbody.rows.length; i++) {
            tbody.rows[i].onclick = function () {
                tableText(this);
            };
        }
    }

    // //model box 


    function tableText(val) {
        let v = val.querySelectorAll('td');
        vl.innerHTML = v[1].innerHTML;
        vf.innerHTML = v[0].innerHTML;
    }

}
//clearing localStorage
clearBtn.addEventListener('click', () => {
    localStorage.clear();
    tbody.innerHTML = "Cleared Data";
})