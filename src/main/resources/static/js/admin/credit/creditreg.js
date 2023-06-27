window.onload = () => {
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();

    RegCreditService.getInstance().loadUserIdList();

    ComponentEvent.getInstance().addClickEventRegisterButton();
}

const creditObj = {
    userId : "",
    pastCredit : "",
    pastAvg : "",
    maxCredit : "",
    presentCredit : "",
    subCredit : ""
}

class RegCreditApi{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new RegCreditApi();
        }
        return this.#instance;
    }

    registerCreditInfo(){
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://localhost:8000/api/admin/get/credit",
            contentType: "application/json",
            data: JSON.stringify(creditObj),
            dataType: "json",
            success : response => {
                console.log(response);
                successFlag = true;
            },
            error: error => {
                console.log(error);
            }
        });
        return successFlag;
    }

    getUserIdList(){
        let responeseData = null;

        $.ajax({
            async: false,
            type : "get",
            url: "http://localhost:8000/api/admin/get/userids",
            dataType: "json",
            success : response => {
                responeseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return responeseData;
    }
}

class RegCreditService{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new RegCreditService();
        }
        return this.#instance;
    }

    setCreditObjValues(){
        const registerInputs = document.querySelectorAll(".register-input");
        creditObj.userId = registerInputs[0].value;
        creditObj.pastCredit = registerInputs[1].value;
        creditObj.pastAvg = registerInputs[2].value;
        creditObj.maxCredit = registerInputs[3].value;
        creditObj.presentCredit = registerInputs[4].value;
        creditObj.subCredit = registerInputs[5].value;
    }

    loadUserIdList(){
        const responeseData = RegCreditApi.getInstance().getUserIdList();

        const userList = document.querySelector(".user-select");
        userList.innerHTML = `<option value="">전체 조회</option>`;
        responeseData.forEach((data) => {
            userList.innerHTML += `
                <option value="${data}">${data}</option>  
            `;
        });

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

    addClickEventRegisterButton(){
        const registerButton = document.querySelector(".reg-button");

        registerButton.onclick = () => {
            RegCreditService.getInstance().setCreditObjValues();
            const successFlag = RegCreditApi.getInstance().registerCreditInfo();
            
            if(successFlag) {
                alert("등록이 완료되었습니다.");
                location.href="http://localhost:8000/admin/creditsearch";
            } else {
                location.reload();
            }
        }
    } 
    
}