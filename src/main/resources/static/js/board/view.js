window.onload = () => {
    HeaderService.getInstance().loadHeader();
    
    BoardViewService.getInstance().setBoardViewBoardId();
    BoardViewService.getInstance().loadBoardView();

    ComponentEvent.getInstance().addClickEventDeleteBoardButton();
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

class BoardViewApi {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardViewApi();
        }
        return this.#instance;
    }

    getBoardView(){
        let responseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/board/view/${boardObj.userId}`,
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

    
    deleteBoard(){
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: `http://localhost:8000/api/board/delete/${boardObj.boardId}`,
            dataType:"json",
            success: response => {
                returnFlag = true;
            },
            error: error => {
                console.log(error);
            }
        });
        return returnFlag;
    }

}

class BoardViewService {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardViewService();
        }
        return this.#instance;
    }

    setBoardViewBoardId() {
        const URLSearch = new URLSearchParams(location.search);
        boardObj.userId = URLSearch.get("boardId");
    }


    loadBoardView(){
        const responseData = BoardViewApi.getInstance().getBoardView();
        const viewDetail = document.querySelector(".view-detail");

        viewDetail.innerHTML = `
            <label>제목</label>
            <div>
                <input type="text" class="boardSubject" autocomplete="off" value="${responseData.boardSubject}" readonly>
            </div>
            <label>작성자</label>
            <span>
                <input type="text" class="name" autocomplete="off" value="${responseData.name}" readonly>
            </span>
            <label>작성일</label>
            <span>
                <input type="datetime" class="regdate" autocomplete="off" value="${responseData.boardRegDate}" readonly>
            </span>
            <br>
            <label>내용</label>
            <div>
                <textarea class="boardContent" id="boardContent" cols="100" rows="30" readonly>${responseData.boardContent}</textarea>
            </div>
            <input type="file" class="boardUploadName" value="${responseData.boardUploadName}">
            <input type="hidden" value="${responseData.boardId}">       
        `;

        const btnBox = document.querySelector(".btn-box");
        const principal = PrincipalApi.getInstance().getPrincipal();

        btnBox.innerHTML += `
            <a href="">
                <button type="button" class="btn">답글달기</button>
            </a>
            ${principal.user.name == responseData.name
                ?`<a href="/board/update?boardId=${responseData.boardId}">
                <button type="button" class="btn">수정</button>
                </a>
                <a>
                    <button type="button" class="delete-btn" value="${responseData.boardId}">삭제</button>
                </a>
                `:`
                `
            }
            <a href="/board">
                <button type="button" class="btn">목록으로</button>
            </a>
        `; 
    }
}
class ComponentEvent{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventDeleteBoardButton(){
        const deleteBtn = document.querySelector(".delete-btn");

        deleteBtn.onclick = () => {
            if(confirm("정말 삭제하시겠습니까?")) {
                boardObj.boardId = deleteBtn.value;
                BoardViewApi.getInstance().deleteBoard(boardObj);

                location.href="/board";
            }
            
        } 
    }
}