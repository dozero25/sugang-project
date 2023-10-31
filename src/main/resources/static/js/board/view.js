window.onload = () => {
    HeaderService.getInstance().loadHeader();
    
    BoardViewService.getInstance().setBoardViewBoardId();
    BoardViewService.getInstance().loadBoardView();
    BoardViewService.getInstance().getLoadBoardReply();
    BoardViewService.getInstance().openloadBoardReplyWrite();

    ComponentEvent.getInstance().addClickEventDeleteBoardButton();
    ComponentEvent.getInstance().addClickEventReplyRegisterButton();
    ComponentEvent.getInstance().addClickEventReplyFirButton();
    ComponentEvent.getInstance().addClickEventReplySecButton();
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

    writeBoardReplySec(){
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/board/view/rep/${replyObj.boardReplyFir}`,
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

    writeBoardReplyThi(){
        let successFlag = false;

        $.ajax({
            async: false,
            type: "post",
            url: `http://localhost:8000/api/board/view/rep/${replyObj.boardReplyFir}/${replyObj.boardReplySec}`,
            contentType: "application/json",
            data: JSON.stringify(replyObj),
            dataType: "json",
            success: response => {
                successFlag = true;
            },
            error: error => {
                if(error.msg = "error") {
                    console.log(msg);
                    alert("댓글창을 확인하십시오.");
                }
                console.log(error);
            }
        });
        return successFlag;
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
                <a href="/board/update?boardId=${responseData.boardId}" style="display:none;">
                <button type="button" class="btn">수정</button>
                </a>
                <a>
                    <button type="button" class="delete-btn" value="${responseData.boardId}" style="display:none;">삭제</button>
                </a>
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
        
        let num1 = 0;
        let num2 = 0;
        let num3 = 0;

        responeseData.forEach((data, index)=>{
            
            replyTable.innerHTML += `
            ${data.boardReplySec == 1 && data.boardReplyThi == 1
                ?`<table>
                <thead>
                <th>${data.name}</th>
                </thead>
                    <tbody>
                        <td>${data.boardReply}</td>
                    </tbody>
                <tfoot>
                    <td>
                        <button type="button" class="reply-fir-btn" value=${data.boardReplyFir}>답변</button>
                    </td>
                </tfoot>
            </table>
            <div class="reply-fir-btn-box" style="display:none;">
                <input class="reply-fir-input"></input>
                <button class="reg-fir-btn" value=${data.boardReplyFir}>등록</button>
            </div>`
                :``
            }

            ${data.boardReplyThi == 1 && data.boardReplySec != 1 && (data.boardReplySec == num2 || data.boardReplyFir == num1)
                ?`
                <table style="margin-left:30px;">
                    <thead>
                    <th>${data.name}</th>
                    </thead>
                        <tbody>
                            <td>${data.boardReply}</td>
                        </tbody>
                    <tfoot>
                        <td>
                            <button type="button" class="reply-sec-btn" value=${data.boardReplySec}>답변</button>
                        </td>
                    </tfoot>
                </table>
                <div class="reply-sec-btn-box" style="display:none; margin-left:30px;">
                    <input class="reply-sec-input"></input>
                    <input type="hidden" class="reply-fir-value" value="${data.boardReplyFir}"></input>
                    <button class="reg-sec-btn" value=${data.boardReplySec}>등록</button>
                </div>
                `:`
                `
            }

            ${data.boardReplyThi != 1 && (data.boardReplySec == num2 || data.boardReplyThi == num3)
                ?`
                <table style="margin-left:60px;">
                    <thead>
                    <th>${data.name}</th>
                    </thead>
                        <tbody>
                            <td>${data.boardReply}</td>
                        </tbody>
                </table>
                `:`
                `
            }
        `;
        
        if(data.boardReplySec != num2){
            num2 +=1;
        }
        if(data.boardReplyFir != num1) { 
            num1 += 1;
            return num2 = 1, num3 = 1;
        }

        if(data.boardReplySec != num2 && data.boardReplyThi != num3) {
            return num2=1, num3 = 1;
        }

        if(data.boardReplyThi != num3){ 
            num3 +=1;
        }

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

    setBoardReplyContent(){
        const writeInput = document.querySelector(".reply-textarea");
        const principal = PrincipalApi.getInstance().getPrincipal();

        replyObj.boardId = boardObj.boardId;
        replyObj.userId = principal.user.userId;

        replyObj.boardReply = writeInput.value;
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

    addClickEventReplyRegisterButton() {
        const repRegButton = document.querySelector(".rep-reg-btn");
        const boardRepContent = document.querySelector(".reply-textarea");

        repRegButton.onclick = () => {
            boardRepContent.focus();
            BoardViewService.getInstance().setBoardReplyContent();
            const successFlag = BoardViewApi.getInstance().writeBoardReply();

            if(successFlag) {
                location.reload();
            }
        }
    }

    addClickEventReplyFirButton(){
        const repFirButton = document.querySelectorAll(".reply-fir-btn");
        const repFirBox = document.querySelectorAll(".reply-fir-btn-box");
        const regFirBtn = document.querySelectorAll(".reg-fir-btn");

        repFirButton.forEach((button, index) => {
            button.onclick = () => {
                if(repFirBox[index].style.display !== "none") {
                    repFirBox[index].style.display = "none";
                }
                else {
                    repFirBox[index].style.display = "block"; 
                }
                
            }
        });

        const writeInput = document.querySelectorAll(".reply-fir-input");
        const responeseData = document.querySelectorAll(".reply-fir-btn");
        const principal = PrincipalApi.getInstance().getPrincipal();

        regFirBtn.forEach((button, index)=>{
            button.onclick = () => {
                
                replyObj.boardId = boardObj.boardId;
                replyObj.userId = principal.user.userId;

                replyObj.boardReply = writeInput[index].value;
                replyObj.boardReplyFir = responeseData[index].value;
                replyObj.boardReplySec = replyObj.boardReplySec;
                
                const successFlag = BoardViewApi.getInstance().writeBoardReplySec();
                
                if(successFlag) {
                    location.reload();
                }
            }
        });
    }

    addClickEventReplySecButton(){
        const repSecButton = document.querySelectorAll(".reply-sec-btn");
        const repSecBox = document.querySelectorAll(".reply-sec-btn-box");
        const regSecBtn = document.querySelectorAll(".reg-sec-btn");

        repSecButton.forEach((button, index) => {
            button.onclick = () => {
                console.log(index)
                if(repSecBox[index].style.display !== "none") {
                    repSecBox[index].style.display = "none";
                }
                else {
                    repSecBox[index].style.display = "block"; 
                }
            }
        });

        const writeInput = document.querySelectorAll(".reply-sec-input");
        const responeseData = document.querySelectorAll(".reply-sec-btn");
        const boardReplyFirValue = document.querySelectorAll(".reply-fir-value");
        const principal = PrincipalApi.getInstance().getPrincipal();

        regSecBtn.forEach((button, index)=>{
            button.onclick = () => {
                replyObj.boardId = boardObj.boardId;
                replyObj.userId = principal.user.userId;

                replyObj.boardReply = writeInput[index].value;
                replyObj.boardReplyFir = boardReplyFirValue[index].value;
                replyObj.boardReplySec = responeseData[index].value;
                replyObj.boardReplyThi = replyObj.boardReplyThi;

                const successFlag = BoardViewApi.getInstance().writeBoardReplyThi();
                
                if(successFlag) {
                    location.reload();
                }
            }
        });
    }
}