window.onload = () => {
    HeaderService.getInstance().loadHeader();
    MypageLoadService.getInstance().loadMypage();
    
    ComponentEvent.getInstance().addClickEventModificationButton();
    ComponentEvent.getInstance().addClickEventImgAddButton();
    ComponentEvent.getInstance().addChangeEventImgFile();
}

const mypageObj = {
    userId: "",
    username: "",
    name: "",
    collegeName: "",
    category: "",
    birthDate: "",
    phone: "",
    email: "",
    address: ""
}

const imgObj = {
    userId: "",
    imageId: null,
    username: null,
    saveName: null,
    originName: null
}

const fileObj = {
    files: new Array(),
    formData: new FormData()
} 

class MypageLoadApi {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MypageLoadApi();
        }
        return this.#instance;
    }

    getMypageUser(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/account/mypage/${PrincipalApi.getInstance().getPrincipal().user.userId}`,
            dataType: "json",
            success: responese => {
                returnData = responese.data;
            }, 
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }

    modifyUser() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "patch",
            url: `http://localhost:8000/api/account/mypage/${PrincipalApi.getInstance().getPrincipal().user.username}`,
            contentType: "application/json",
            data: JSON.stringify(mypageObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                console.log(error);
            }
        });

        return successFlag;
    }

    removeImg() {
        let successFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/account/user/${mypageObj.username}/image/${imgObj.imageId}`,
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
        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/account/user/${mypageObj.username}/images`,
            encType: "multipart/form-data",
            contentType: false,
            processData: false,   
            data: fileObj.formData,
            dataType: "json",
            success: response => {
                
            },
            error: error => {
                console.log(error);
            }
        });
    }
}

class MypageLoadService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new MypageLoadService();
        }
        return this.#instance;
    }

    setMypageObjValues() {
        const modificationInputs = document.querySelectorAll(".modification-input");
        mypageObj.username = modificationInputs[0].value;
        mypageObj.name = modificationInputs[1].value;
        mypageObj.collegeName = modificationInputs[2].value;
        mypageObj.category = modificationInputs[3].value;
        mypageObj.birthDate = modificationInputs[4].value;
        mypageObj.phone = modificationInputs[5].value;
        mypageObj.email = modificationInputs[6].value;
        mypageObj.address = modificationInputs[7].value;
    }

    loadMypage() {
        const responseData = MypageLoadApi.getInstance().getMypageUser();
        
        
        const modificationInputs = document.querySelector(".user-modify");
            modificationInputs.innerHTML = `
                <div class="item-group">
                    <label class="modification-label">학번</label>
                    <input type="text" class="modification-input" value="${responseData.mypageMst.username}" disabled>
                </div>
                <div class="item-group">
                    <label class="modification-label">성명</label>
                    <input type="text" class="modification-input" value="${responseData.mypageMst.name}" disabled>
                </div>
                <div class="item-group">
                    <label class="modification-label">단과대학</label>
                    <input type="text" class="modification-input" value="${responseData.mypageMst.collegeName}" disabled>
                </div>
                <div class="item-group">
                    <label class="modification-label">학부(과)</label>
                    <input type="text" class="modification-input" value="${responseData.mypageMst.category}" disabled>
                </div>
                <div class="item-group">
                    <label class="modification-label">생년월일</label>
                    <input type="text" class="modification-input" value="${responseData.mypageMst.birthDate}">
                </div>
                <div class="item-group">
                    <label class="modification-label">휴대전화</label>
                    <input type="text" class="modification-input" value="${responseData.mypageMst.phone}">
                </div>
                <div class="item-group">
                    <label class="modification-label">E-MAIL</label>
                    <input type="text" class="modification-input" value="${responseData.mypageMst.email}">
                </div>
                <div class="item-group">
                    <label class="modification-label">주소</label>
                    <input type="text" class="modification-input" value="${responseData.mypageMst.address}">
                </div>
            `;
        
        if(responseData.userImage != null) {
            imgObj.imageId = responseData.userImage.imageId;
            imgObj.username = responseData.userImage.username;
            imgObj.saveName = responseData.userImage.saveName;
            imgObj.originName = responseData.userImage.originName;

            const userImg = document.querySelector(".person-img");
            userImg.src = `http://localhost:8000/images/user/${responseData.userImage.saveName}`;
        }
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
        const userImg = document.querySelector(".person-img");
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

    addClickEventModificationButton() {
        const modificationButton = document.querySelector(".modification-button");

        modificationButton.onclick = () => {

            MypageLoadService.getInstance().setMypageObjValues();
            fileObj.formData.append("files", fileObj.files[0]);
            let successFlag = MypageLoadApi.getInstance().modifyUser();
            
            if(imgObj.imageId != null) {
                successFlag = MypageLoadApi.getInstance().removeImg();
            }

            if(successFlag = true) {
                MypageLoadApi.getInstance().registerImg();
                alert("수정 완료되었습니다.")        
            } else {
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
                if(value.size != 0) {
                    fileObj.files.push(value);
                    changeFlag = true;
                }
            });

            if(changeFlag) {
                ImgFileService.getInstance().getImgPreview();
                imgFile.value = null;
            }
        }
    }

    // addClickEventImgModificationButton() {
    //     const imgModificationButton = document.querySelector(".modification-button");

    //     imgModificationButton.onclick = () => {
    //         fileObj.formData.append("files", fileObj.files[0]);

    //         let successFlag = true;

    //         if(imgObj.imageId != null) {
    //             successFlag = MypageLoadApi.getInstance().removeImg();
    //         }

    //         if(successFlag = true) {
    //             MypageLoadApi.getInstance().registerImg();        
    //         }
    //     }
    // }
}