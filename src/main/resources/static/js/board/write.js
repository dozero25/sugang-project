window.onload = () => {
    HeaderService.getInstance().loadHeader();

    ComponentEvent.getInstance().addClickEventRegisterButton();
}

const boardObj = {
    boardId: "",
    boardSubject: "",
    userId: "",
    boardContent: "",
    boardVisit: "",
    boardUploadName: "",
    boardUploadSize:"",
    boardUploadTrans:"",
    boardRegDate:"",
    boardGrp:""
}

class BoardWriteApi {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardWriteApi();
        }
        return this.#instance;
    }

    registerBoard(){
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://localhost:8000/api/board/write",
            contentType: "application/json",
            data: JSON.stringify(boardObj),
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

class BoardWriteService {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardWriteService();
        }
        return this.#instance;
    }

    setBoardObjValues(){
        const registerInput = document.querySelectorAll(".register-input");
        const principal = PrincipalApi.getInstance().getPrincipal();

        boardObj.boardSubject = registerInput[0].value;
        boardObj.boardContent = registerInput[1].value;
        boardObj.boardUploadName = registerInput[2].value;
        boardObj.userId = principal.user.userId;
    }
}

class ComponentEvent {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }
    
    addClickEventRegisterButton(){
        const registerButton = document.querySelector(".reg-btn");

        registerButton.onclick = () => {
            BoardWriteService.getInstance().setBoardObjValues();
            const successFlag = BoardWriteApi.getInstance().registerBoard();
            
            if(successFlag) {
                alert("등록이 완료되었습니다.");
                location.href="http://localhost:8000/board";
            } else {
                location.reload();
            }
        }
    }
}