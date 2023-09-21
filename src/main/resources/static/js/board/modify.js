window.onload = () => {
    HeaderService.getInstance().loadHeader();
    
    BoardModifyService.getInstance().setBoardViewBoardId();
    BoardModifyService .getInstance().getLoadBoard();

    ComponentEvent.getInstance().addClickEventModifyButton();
    
}

const boardObj = {
    boardId: "",
    boardSubject : "",
    userId: "",
    name : "",
    boardContent: "",
    boardVisit: "",
    boardRegDate: "",
    boardGrp: ""
}

class BoardModifyApi {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardModifyApi();
        }
        return this.#instance;
    }

    getBoardUpdateView(){
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/board/update/view/${boardObj.userId}`,
            dataType: "json",
            success: response => {
                responseData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return responseData;
    }

    modifyBoard(){
        let successFlag = false;

        $.ajax({
            async: false,
            type: "patch",
            url: `http://localhost:8000/api/board/update/${boardObj.userId}`,
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

class BoardModifyService {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardModifyService();
        }
        return this.#instance;
    }

    setBoardViewBoardId() {
        const URLSearch = new URLSearchParams(location.search);
        boardObj.userId = URLSearch.get("boardId");
    }

    getLoadBoard(){
        const responseData = BoardModifyApi.getInstance().getBoardUpdateView();

        const viewDetail = document.querySelector(".modify-detail");

        viewDetail.innerHTML = `
            <label>제목</label>
            <div>
                <input type="text" class="modification-input" autocomplete="off" value="${responseData.boardSubject}">
            </div>
            <label>작성자</label>
            <span>
                <input type="text" class="name" autocomplete="off" value="${responseData.name}" readonly>
            </span>
            <label>작성일</label>
            <span>
                <input type="datetime" class="modification-input" autocomplete="off" value="${responseData.boardRegDate}" readonly>
            </span>
            <br>
            <label>내용</label>
            <div>
                <textarea class="modification-input" id="boardContent" cols="100" rows="30">${responseData.boardContent}</textarea>
            </div>
            <input type="file" class="modification-input" value="${responseData.boardUploadName}">
            <input type="hidden" value="${responseData.boardId}"> 
        `;
    }

    setBoardObjValues(){
        const modifyInput = document.querySelectorAll(".modification-input");
        const responseData = BoardModifyApi.getInstance().getBoardUpdateView();

        boardObj.boardSubject = modifyInput[0].value;
        boardObj.boardContent = modifyInput[2].value;
        boardObj.boardRegDate = modifyInput[3].value;
        boardObj.boardId = responseData.boardId;
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
    
    addClickEventModifyButton(){
        const modifyButton = document.querySelector(".btn2");

        modifyButton.onclick = () => {

            BoardModifyService.getInstance().setBoardObjValues();
            const successFlag = BoardModifyApi.getInstance().modifyBoard();
        
            if(successFlag) {
                alert("수정이 완료되었습니다.");
                location.href="/board"
            } else {
                location.reload();
            }
        }
    }
}