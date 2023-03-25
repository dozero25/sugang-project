window.onload = () => {
    UserRegisterService.getInstance().loadCategories();
    ComponentEvent.getInstance().addClickEventRegisterButton();
    ComponentEvent.getInstance().addClickEventImgAddButton();
    ComponentEvent.getInstance().addChangeEventImgFile();
    ComponentEvent.getInstance().addClickEventImgRegisterButton();
    ComponentEvent.getInstance().addClickEventImgCancelButton();
}

const proObj = {
    username : "",
    password : "",
    name : "",
    phone : "",
    email : "",
    address : "",
    birthDate : "",
    departmentNumber: ""
}

const fileObj = {
    files: new Array(),
    formData: new FormData()
}

class UserRegisterApi{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserRegisterApi();
        }
        return this.#instance;
    }

    getMajorCategories(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/userregister",
            dataType: "json",
            success: responese => {
                console.log(responese);
                returnData = responese.data;
            }, 
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    registerProfessor(){
        let successFlag = null;

        $.ajax({
            async: false,
            type: "post",
            url: "http://127.0.0.1:8000/api/admin/professorRegister",
            contentType: "application/json",
            data: JSON.stringify(proObj),
            dataType: "json",
            success: response => {
                console.log(response);
                successFlag = true;
            },
            error: error => {
                console.log(error);
            }

        });

        return successFlag;
    }

    registerImg() {
        $.ajax({
            async: false,
            type: "post",
            url: `http://127.0.0.1:8000/api/admin/user/${proObj.username}/images`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,
            data: fileObj.formData,
            dataType: "json",
            success: response => {
                alert("이미지 등록 완료.");
                location.reload();
            },
            error: error => {
                console.log(error);
            }
        })
    }
}

class UserRegisterService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserRegisterService();
        }
        return this.#instance;
    }
    
    loadCategories() {
        const responeseData = UserRegisterApi.getInstance().getMajorCategories();

        const categorySelect = document.querySelector(".category-select");

        responeseData.forEach((data,index) => {
            categorySelect.innerHTML += `
                <option value="${index+1}">${data}</option>
            `;
        });
    }

    setProObjValues() {
        const registerInputs = document.querySelectorAll(".register-input");

        proObj.username = registerInputs[0].value;
        proObj.password = registerInputs[1].value;
        proObj.name = registerInputs[2].value;
        proObj.phone = registerInputs[3].value;
        proObj.birthDate = registerInputs[4].value;
        proObj.email = registerInputs[5].value;
        proObj.address = registerInputs[6].value;
        proObj.departmentNumber = registerInputs[7].value;
    }
}

class ImgFileService {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ImgFileService();
        }
        return this.#instance;
    }

    getImgPreview() {
        const userImg = document.querySelector(".user-img");

        const reader = new FileReader();

        reader.onload = (e) => {
            userImg.src = e.target.result;
        }

        reader.readAsDataURL(fileObj.files[0]);

    }
}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventRegisterButton() {
        const registerButton = document.querySelector(".register-button");

        registerButton.onclick = () => {
            UserRegisterService.getInstance().setProObjValues();

            const successFlag = UserRegisterApi.getInstance().registerProfessor();

            if(!successFlag){
                return;
            }

            if(confirm("교수 이미지를 등록하시겠습니까?")) {
                const imgAddButton = document.querySelector(".img-add-button");
                const imgCancelButton = document.querySelector(".img-cancel-button");
    
                imgAddButton.disabled = false;
                imgCancelButton.disabled = false;
            }else {
                location.reload();
            }
        }

    }

    addClickEventImgAddButton() {
        const imgFile = document.querySelector(".img-file");
        const addButton = document.querySelector(".img-add-button");

        addButton.onclick = () => {
            imgFile.click();
        }
    }

    addChangeEventImgFile() {
        const imgFile = document.querySelector(".img-file");

        imgFile.onchange = () => {
            const formData = new FormData(document.querySelector(".img-form"));
            let changeFlag = false;

            fileObj.files.pop();

            formData.forEach(value => {
                console.log(value);

                if(value.size != 0) {
                    fileObj.files.push(value);
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                const imgRegisterButton = document.querySelector(".img-register-button");
                imgRegisterButton.disabled = false;

                ImgFileService.getInstance().getImgPreview();
                imgFile.value = null;
            }

        }
    }

    addClickEventImgRegisterButton() {
        const imgRegisterButton = document.querySelector(".img-register-button");

        imgRegisterButton.onclick = () => {
            fileObj.formData.append("files", fileObj.files[0]);
            UserRegisterApi.getInstance().registerImg();
        }
    }

    addClickEventImgCancelButton() {
        const imgCancelButton = document.querySelector(".img-cancel-button");

        imgCancelButton.onclick = () => {
            if(confirm("정말로 이미지 등록을 취소하시겠습니까?")) {
                location.reload();
            }
        }
    }
}