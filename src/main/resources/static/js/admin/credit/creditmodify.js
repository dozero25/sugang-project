window.onload = () => {
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();

    ModifyCreditService.getInstance().setCreditUserId();
    ModifyCreditService.getInstance().loadCredit();

    ComponentEvent.getInstance().addClickEventModificationButton();
}
let creditObj = {
    userId : 0,
    username: "",
    pastCredit : 0,
    pastAvg : 0,
    maxCredit :  0,
    presentCredit : 0,
    subCredit : 0
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
            url: `http://localhost:8000/api/admin/credit/${Principal.getInstance().getPrincial().user.userId}`,
            dataType: "json",
            success: response => {
                responeseData = response.data;
                console.log(responeseData);
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
            type: "put",
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
        const responeseData = ModifyCreditApi.getInstance().getCreditUserId(creditObj);

        console.log(responeseData);

        // const modificationInput = document.querySelectorAll(".modification-input")
        // modificationInput[1].value = responeseData.creditMst.username;
        // modificationInput[2].value = responeseData.creditMst.pastCredit;
        // modificationInput[3].value = responeseData.creditMst.pastAvg;
        // modificationInput[4].value = responeseData.creditMst.maxCredit 
        // modificationInput[5].value = responeseData.creditMst.presentCredit 
        // modificationInput[6].value = responeseData.creditMst.subCredit 
    }

    setCreditObjValues() {
        const modificationInputs = document.querySelectorAll(".modification-input");

        creditObj.userId = modificationInputs[0].value;
        creditObj.username = modificationInputs[1].value;
        creditObj.pastCredit = modificationInputs[2].value;
        creditObj.pastAvg = modificationInputs[3].value;
        creditObj.maxCredit = modificationInputs[4].value;
        creditObj.presentCredit = modificationInputs[5].value;
        creditObj.subCredit = modificationInputs[6].value;
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
            
            ModifyCreditService.getInstance().setSubjectObjValues();

            const successFlag = ModifyCreditApi.getInstance().modifyCredit();
            if(successFlag) {
                alert("수정 완료되었습니다.");
                location.href="http://localhost:8000/admin/creditsearch";
            } else {
                location.reload();
            }
        }  
    }
    
}