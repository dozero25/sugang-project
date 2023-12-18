window.onload = () => {
    HeaderService.getInstance().loadHeader();

    BoardWriteService.getInstance().loadBoardCategoryList();
    
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

    getLoadBoardCategory(){
        let responeseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/board/get/category",
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
        boardObj.boardGrp = registerInput[1].value;
        boardObj.boardContent = registerInput[2].value;
        boardObj.boardUploadName = registerInput[3].value;
        boardObj.userId = principal.user.userId;
    }

    loadBoardCategoryList(){
        const responeseData = BoardWriteApi.getInstance().getLoadBoardCategory();
        const principal = PrincipalApi.getInstance().getPrincipal();

        const boardCategory = document.querySelector(".reg-option");
        boardCategory.innerHTML = `<option value="">목록을 선택하세요</option>`;
        

        if(principal.user.roleDtl[0].roleId == 3){
            responeseData.forEach((data) => {
                boardCategory.innerHTML += `
                <option value="${data.boardGrp}">${data.boardCategoryName}</option>
                `;
            });
        }

        if(principal.user.roleDtl[0].roleId == 2){
            responeseData.forEach((data) => {
                boardCategory.innerHTML += `
                <option value="${data.boardGrp}">${data.boardCategoryName}</option>
                `;
            });
        }

        if(principal.user.roleDtl[0].roleId == 1){
            boardCategory.innerHTML = `
            <option value="4">자유게시판</option>
            `;
        }
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