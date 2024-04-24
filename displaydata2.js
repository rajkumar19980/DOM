
let studentdata = JSON.parse(localStorage.getItem('students')) || [];
console.log(studentdata)
//used or operator if nothing in local storage show empty array
Displaydata(studentdata);
let form = document.querySelector('#form')
form.addEventListener('submit', function (event) {
    event.preventDefault();
    let formdata = {
        name: form.name.value,
        course: form.course.value,
        program: form.program.value,
        code: form.code.value,
        batch: form.batch.value,
        score: form.score.value
    }
    if (formdata.name == "" || formdata.course == "" || formdata.program == "" || formdata.code == "" || formdata.batch == "" || formdata.score == "") {
        alert("fill all inputs!")
    }
    else {
        studentdata.push(formdata);
        localStorage.setItem('students', JSON.stringify(studentdata))
        console.log(studentdata)
        Displaydata(studentdata);
    }
})

function Displaydata(studentdata) {
    //created count to display total students count
    // here also updating counts using textContent
    // it is updating count value automatic with array studentdata value updating using index
    let count = document.getElementById('Studentcount')
    count.textContent = studentdata.length;
    let totalscore = 0;
    studentdata.forEach(function (el) {
        totalscore = totalscore + Number(el.score)//converting score value to integer and adding it to totalscore
    })
    let average = document.getElementById('Averagescore')
    if (count.textContent == 0) {
        average.textContent = 0;
    }
    else {
        average.textContent = totalscore / studentdata.length;//calculating average
    }

    let result = document.querySelector('#result');
    result.innerHTML = null;
    result.style.display = 'grid';
    result.style.gridTemplateColumns = 'repeat(4, 1fr)';

    studentdata.forEach(function (el, index) {
        let card = document.createElement('div');
        let name = document.createElement('h1');
        name.innerText = "name:" + el.name;
        let course = document.createElement('p');
        course.innerText = "course:" + el.course;
        let program = document.createElement('p');
        program.innerText = "program:" + el.prograe;
        let code = document.createElement('p');
        code.innerText = "code:" + el.code;
        let batch = document.createElement('p');
        batch.innerText = "batch:" + el.batch;
        let score = document.createElement('p');
        score.innerText = "score:" + el.score;
        let status = document.createElement('h2');
        if (el.score <= 3) {
            status.innerText = "status: fail"
            status.style.color = 'red'
        }
        else if (el.score > 3 && el.score <= 7) {
            status.innerText = "status: pass"
            status.style.color = 'yellow'
        }
        else {
            status.innerText = "status: excellent"
            status.style.color = 'green'
        }
        let del = document.createElement('button');
        del.innerText = 'delete'
        del.addEventListener('click', function () {
            Deletedata(index);
        })
        card.append(name, course, program, code, batch, score, status, del)
        result.append(card)
    })

}
// Adding event listener to the "Delete All Data" button
let deleteAllButton = document.getElementById('deleteall');
deleteAllButton.addEventListener('click', deleteAllData);

function Deletedata(index) {
    studentdata = studentdata.filter(function (el, i) {
        return i !== index;
    })
    localStorage.setItem('students', JSON.stringify(studentdata));
    console.log(studentdata)
    Displaydata(studentdata);
}

function deleteAllData() {
    localStorage.removeItem('students'); // Removing data from localstorage
    studentdata = []; // assigning empty array
    Displaydata(studentdata); // Updating DOM
    console.log(studentdata)
}


