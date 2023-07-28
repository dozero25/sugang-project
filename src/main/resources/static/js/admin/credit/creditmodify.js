window.onload = () => {
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();

    ModifyCreditService.getInstance().setCreditUserId();
    ModifyCreditService.getInstance().loadCredit();

    ComponentEvent.getInstance().addClickEventModificationButton();
}
const creditObj = {
    userId : "",
    username: "",
    pastCredit : "",
    pastAvg : "",
    maxCredit :  "",
    presentCredit : "",
    subCredit : ""
}

const fileObj = {
    files: new Array(),
    formData: new FormData()
} 

class ModifyCreditApi{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new ModifyCreditApi();
        }
        return this.#instance;
    }

    getCreditUserId(){
        let responeseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/admin/credit/${creditObj.userId}`,
            dataType: "json",
            success: response => {
                responeseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responeseData;
    }

    modifyCredit(){
        let successFlag = false;

        $.ajax({
            async: false,
            type: "patch",
            url: `http://localhost:8000/api/admin/credit/${creditObj.userId}`,
            contentType: "application/json",
            data: JSON.stringify(creditObj),
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
}

class ModifyCreditService{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new ModifyCreditService();
        }
        return this.#instance;
    }

    setCreditUserId() {
        const URLSearch = new URLSearchParams(location.search);
        creditObj.userId = URLSearch.get("userId");
    }

    loadCredit(){
        const responeseData = ModifyCreditApi.getInstance().getCreditUserId();
        
        const modifiyLoad = document.querySelector(".content-table tbody");

        modifiyLoad.innerHTML = `
            <tr>
                <td><input type="text" class="modification-input" value="${responeseData.username}"></td>
                <td><input type="text" class="modification-input" value="${responeseData.pastCredit}"></td>
                <td><input type="text" class="modification-input" value="${responeseData.pastAvg}"></td>
                <td><input type="text" class="modification-input" value="${responeseData.maxCredit}"></td>
                <td><input type="text" class="modification-input" value="${responeseData.presentCredit}"></td>
                <td><input type="text" class="modification-input" value="${responeseData.subCredit}"></td>
            <tr>
        `;
    }

    setCreditObjValues() {
        const modificationInputs = document.querySelectorAll(".modification-input");

        creditObj.username = modificationInputs[0].value;
        creditObj.pastCredit = modificationInputs[1].value;
        creditObj.pastAvg = modificationInputs[2].value;
        creditObj.maxCredit = modificationInputs[3].value;
        creditObj.presentCredit = modificationInputs[4].value;
        creditObj.subCredit = modificationInputs[5].value;
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
        const modificationButton = document.querySelector(".reg-button");

        modificationButton.onclick = () => {
            
            ModifyCreditService.getInstance().setCreditObjValues();
            fileObj.formData.append("files", fileObj.files[0]);
            const successFlag = ModifyCreditApi.getInstance().modifyCredit();
            
            console.log(successFlag);

            if(successFlag) {
                alert("수정 완료되었습니다.");
                location.href="http://localhost:8000/admin/creditsearch";
            } else {
                location.reload();
            }
        }  
    }
    
}