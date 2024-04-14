var form = document.getElementById("myForm"),
    userName = document.getElementById("name"),
    age = document.getElementById("age"),
    city = document.getElementById("city"),
    phone = document.getElementById("phone"),
    submitBtn = document.querySelector(".submit"),
    userInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser")


let getData = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : []

let isEdit = false, editId
showInfo()

newUserBtn.addEventListener('click', ()=> {
    submitBtn.innerText = 'Submit',
    modalTitle.innerText = "Fill the Form"
    isEdit = false
    imgInput.src = "./img/Profile Icon.png"
    form.reset()
})


function showInfo(){
    document.querySelectorAll('.employeeDetails').forEach(info => info.remove())
    getData.forEach((element, index) => {
        let createElement = `<tr class="employeeDetails">
            <td>${index+1}</td>
            <td>${element.employeeName}</td>
            <td>${element.employeeAge}</td>
            <td>${element.employeeCity}</td>
            <td>${element.employeePhone}</td>


            <td>
                <button class="btn btn-outline-dark" onclick="readInfo('${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeePhone}')" data-bs-toggle="modal" data-bs-target="#readData"><i class="bi bi-eye"></i></button>

                <button class="btn btn-outline-info" onclick="editInfo(${index}, '${element.employeeName}', '${element.employeeAge}', '${element.employeeCity}', '${element.employeePhone}')" data-bs-toggle="modal" data-bs-target="#userForm"><i class="bi bi-pencil-square"></i></button>

                <button class="btn btn-outline-danger" onclick="deleteInfo(${index})"><i class="bi bi-trash"></i></button>
                            
            </td>
        </tr>`

        userInfo.innerHTML += createElement
    })
}
showInfo()


function readInfo(name, age, city, phone){
    document.querySelector('#showName').value = name,
    document.querySelector("#showAge").value = age,
    document.querySelector("#showCity").value = city,
    document.querySelector("#showPhone").value = phone
}


function editInfo(index, name, Age, City, Phone){
    isEdit = true
    editId = index
    userName.value = name
    age.value = Age
    city.value =City
    phone.value = Phone

    submitBtn.innerText = "Update"
    modalTitle.innerText = "Update The Form"
}


function deleteInfo(index){
    if(confirm("Are you sure want to delete?")){
        getData.splice(index, 1)
        localStorage.setItem("userProfile", JSON.stringify(getData))
        showInfo()
    }
}


form.addEventListener('submit', (e)=> {
    e.preventDefault()

    const information = {
        employeeName: userName.value,
        employeeAge: age.value,
        employeeCity: city.value,
        employeePhone: phone.value
    }

    if(!isEdit){
        getData.push(information)
    }
    else{
        isEdit = false
        getData[editId] = information
    }

    localStorage.setItem('userProfile', JSON.stringify(getData))

    submitBtn.innerText = "Submit"
    modalTitle.innerHTML = "Fill The Form"

    showInfo()

    form.reset() 

    // modal.style.display = "none"
    // document.querySelector(".modal-backdrop").remove()
})