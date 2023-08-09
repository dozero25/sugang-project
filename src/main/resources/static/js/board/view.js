window.onload = () => {
    HeaderService.getInstance().loadHeader();
    
    BoardViewService.getInstance().setBoardViewBoardId();
    BoardViewService.getInstance().loadBoardView();
    BoardViewService.getInstance().getLoadBoardReply();
    BoardViewService.getInstance().openloadBoardReplyWrite();

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

const replyObj = {
    boardId: "",
    userId: "",
    name: "",
    boardReply: "",
    boardReplyFir: "",
    boardReplySec: "",
    boardReplyThi: ""
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
            url: `http://localhost:8000/api/board/view/${boardObj.boardId}`,
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

    writeBoardReply(){
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: "http://localhost:8000/api/board/view",
            contentType: "application/json",
            data: JSON.stringify(replyObj),
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

    getBoardReply(){
        let responeseData = null;

        $.ajax({
            async: false,
            tyep:"get",
            url: `http://localhost:8000/api/board/view/reply/${boardObj.boardId}`,
            dataType:"json",
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
        boardObj.boardId = URLSearch.get("boardId");
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

            <button type="button" class="reply-btn">댓글 쓰기</button>

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

    getLoadBoardReply(){
        const responeseData = BoardViewApi.getInstance().getBoardReply();
        const replyTable = document.querySelector(".reply-table");


        console.log(responeseData);

        responeseData.forEach((data, index)=>{
            replyTable.innerHTML += `
                <tr>
                    <td>${data.name}</td>
                    <td>${data.boardReply}</td>
                </tr>
                <br>
            `;
        });
    }

    openloadBoardReplyWrite(){
        const replyView = document.querySelector(".reply-btn");
        const replybox = document.querySelector(".reply-box");

        replyView.onclick = () => {
            if(replybox.style.display !== "none") {
                replybox.style.display = "none";
            }
            else {
                replybox.style.display = "block";
            }
        }
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