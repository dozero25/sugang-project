window.onload = () => {

    StudentModifyService.getInstance().setUsername();
    StudentModifyService.getInstance().loadCategories();
    StudentModifyService.getInstance().loadUserAndImageData();

    ComponentEvent.getInstance().addClickEventModificationButton();
    ComponentEvent.getInstance().addClickEventImgAddButton();
    ComponentEvent.getInstance().addChangeEventImgFile();
    ComponentEvent.getInstance().addClickEventImgModificationButton();
    ComponentEvent.getInstance().addClickEventImgCancleButton();

}

const stuObj = {
    username : "",
    category : "",
    username : "",
    password : "",
    name : "",
    phone : "",
    email : "",
    address : "",
    grade : "",
    birthDate : "",
    departmentNumber : ""
}

const imgObj = {
    imageId: null,
    username : null,
    saveName : null,
    originName : null
}

const fileObj = {
    files: new Array(),
    formData : new FormData()
}

class StudentModifyApi{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new StudentModifyApi();
        }
        return this.#instance;
    }

    getUserAndImage() {
        let responeseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://127.0.0.1:8000/api/admin/user/${stuObj.username}`,
            dataType: "json",
            success: response => {
                console.log(response);
                responeseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return responeseData;
    }

    getMajorCategories(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/admin/usersearch",
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

    modifyStudent() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "put",
            url:`http://127.0.0.1:8000/api/admin/user/${stuObj.username}`,
            contentType: "application/json",
            data: JSON.stringify(stuObj),
            dataType: "json",
            success: response => {
                console.log(response);
                successFlag = true;
            },
            error: error => {
                console.log(error);
                StudentModifyService.getInstance().setErrors(error.responseJSON.data);
            }

        });

        return successFlag;
    }

    removeImg() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://127.0.0.1:8000/api/admin/user/${stuObj.username}/image/${imgObj.imageId}`,
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

    registerImg(){
        let successFlag = false;

        $.ajax({
            async:false,
            type:"post",
            url: `http://127.0.0.1:8000/api/admin/user/${stuObj.username}/images`,
            encType: "mulipart/form-data",
            contentType: false,
            processData: false,
            data: fileObj.formData,
            dataType: "json",
            success: response => {
                alert("학생 이미지 수정완료");
            },
            error: error=> {
                console.log(error);
            }
        })
    }
}



class StudentModifyService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new StudentModifyService();
        }
        return this.#instance;
    }

    loadCategories(){
        const responeseData = StudentModifyApi.getInstance().getMajorCategories();
        const categorySelect = document.querySelector(".category-select");

        categorySelect.innerHTML = ``;

        responeseData.forEach((data, index) => {
            categorySelect.innerHTML += `
                <option value = "${index+1}">${data}</option>
            `;
        });
    }

    setUsername(){
        const URLSearch = new URLSearchParams(location.search);
        stuObj.username = URLSearch.get("username");
    }

    setStuObjValues(){
        const modificationInputs = document.querySelectorAll(".modification-input");
        const categorySelect = document.querySelector(".category-select");
        

        stuObj.username = modificationInputs[0].value;
        stuObj.password = modificationInputs[1].value;
        stuObj.name = modificationInputs[2].value;
        stuObj.phone = modificationInputs[3].value;
        stuObj.birthDate = modificationInputs[4].value;
        stuObj.email = modificationInputs[5].value;
        stuObj.grade = modificationInputs[6].value;
        stuObj.address = modificationInputs[7].value;
        // stuObj.departmentNumber = modificationInputs[8].value;
        stuObj.departmentNumber = categorySelect.options[categorySelect.selectedIndex].value;
    }

    loadUserAndImageData(){
        const responeseData = StudentModifyApi.getInstance().getUserAndImage();

        console.log(responeseData);
        if(responeseData.username == null){
            alert("해당 유저는 등록되지 않은 유저입니다.");
            history.back();
            return;
        }

        const modificationInputs = document.querySelectorAll(".modification-input");
        modificationInputs[0].value = responeseData.username.username;
        modificationInputs[1].value = responeseData.username.password;
        modificationInputs[2].value = responeseData.username.name;
        modificationInputs[3].value = responeseData.username.phone;
        modificationInputs[4].value = responeseData.username.birthDate;
        modificationInputs[5].value = responeseData.username.email;
        modificationInputs[6].value = responeseData.username.grade;
        modificationInputs[7].value = responeseData.username.address;
        modificationInputs[8].value = responeseData.username.category;
        

        if(responeseData.userImage != null){
            imgObj.imageId = responeseData.userImage.imageId;
            imgObj.username = responeseData.userImage.username;
            imgObj.saveName = responeseData.userImage.saveName;
            imgObj.originName = responeseData.userImage.originName;

            const userImg = document.querySelector(".user-img");
            userImg.src = `http://127.0.0.1:8000/images/user/${responeseData.userImage.saveName}`;
        }

    }

    setErrors(errors){
        const errorMessages = document.querySelectorAll(".error-message");
        this.clearErrors();

        Object.keys(errors).forEach(key => {
            if(key == "useranme"){
                errorMessages[0].innerHTML = errors[key];
            }else if(key == "name"){
                errorMessages[2].innerHTML = errors[key];
            }else if(key == "departmentNumber"){
                errorMessages[8].innerHTML = errors[key];
            }
        })
    }

    clearErrors(){
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(error => {
            error.innerHTML = "";
        })
    }
}

class ImgFileService {
    static #instance = null;
    static getInstance() {
        if(this.instance == null){
            this.#instance = new ImgFileService();
        }
        return this.#instance;
    }

    getImgPreview(){
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
        if(this.#instance == null){
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventModificationButton() {
        const modifyButton = document.querySelector(".modify-button");

        modifyButton.onclick = () => {
            StudentModifyService.getInstance().setStuObjValues();
            const successFlag = StudentModifyApi.getInstance().modifyStudent();

            if(!successFlag){
                return;
            }

            StudentModifyService.getInstance().clearErrors();

            if(confirm("학생 이미지를 수정하시겠습니까?")){
                const imgAddButton = document.querySelector(".img-add-button");
                const imgCancelButton = document.querySelector(".img-cancel-button");

                imgAddButton.disabled = false;
                imgCancelButton.disabled = false;
            }else{
                location.reload();
            }
        }
    }

    addClickEventImgAddButton(){
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

            if(changeFlag){
                const imgModificationButton = document.querySelector(".img-modify-button");

                imgModificationButton.disabled = false;

                ImgFileService.getInstance().getImgPreview();
                imgFile.value = null;
            }
        }
    }

    addClickEventImgModificationButton(){
        const imgModificationButton = document.querySelector(".img-modify-button");

        imgModificationButton.onclick = () => {
            fileObj.formData.append("files", fileObj.files[0]);

            let successFlag = true;

            if(imgObj.imageId != null){
                successFlag = StudentModifyApi.getInstance().removeImg();
            }

            if(successFlag){
                StudentModifyApi.getInstance().registerImg();
                location.href="http://127.0.0.1:5501/templates/admin/user_information.html";
            }
        }
    }

    addClickEventImgCancleButton(){
        const imgCancelButton = document.querySelector(".img-cancel-button");
        
        imgCancelButton.onclick = () => {
            if(confirm("정말로 이미지 수정을 취소하시겠습니까?")){
                location.reload();
            }
        }
    }
}