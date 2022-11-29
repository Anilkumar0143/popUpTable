let firstname = document.getElementById('fname');
let lasttname = document.getElementById('lname');
let vf = document.getElementById("valuef")
let vl = document.getElementById("valuel")
let btn = document.querySelector('#button')

let details = [];
// console.log(locdata);

btn.addEventListener("click",
    () => {
        // creating obj
        let obj = {
            fname: firstname.value,
            lname: lasttname.value
        }
        //pushing to array
        details.push(obj);
        //sending data to local storage
        let local = localStorage.setItem("student", JSON.stringify(details))

        //geting data from local storage
        let locdata = localStorage.getItem('student');
        let data = JSON.parse(locdata);

        //table row
        let tbody = document.getElementById('tbody');
        tbody.innerHTML = ""
        data.forEach(ele => {
            let row = document.createElement('tr');

            tbody.setAttribute("data-toggle", "modal")
            tbody.setAttribute("data-target", "#exampleModalCenter")

            let cell1 = document.createElement("td")
            let cell2 = document.createElement("td")

            cell1.innerHTML = ele.fname
            cell2.innerHTML = ele.lname
 
            tbody.appendChild(row)
            row.appendChild(cell1);
            row.appendChild(cell2);

        });


        //geting row values
        if (tbody) {
            for (var i = 0; i < tbody.rows.length; i++) {
                tbody.rows[i].onclick = function () {
                    tableText(this);
                };
            }
        }

        //model box 

      
        function tableText(val) {
            let v = val.querySelectorAll('td');
            vl.innerHTML = v[1].innerHTML
            vf.innerHTML = v[0].innerHTML

        }



    })

