window.onload = () => {
    HeaderService.getInstance().loadHeader();

    BoardMainService.getInstance().getLoadAllBoardList();
    BoardMainService.getInstance().getWriteButtonRequirement();

    ComponentEvent.getInstance().addClickEventSearchButton();
}

let searchObj = {
    page : 1,
    major : "",
    searchValue : "",
    limit : "Y",
    count : 10
}


let visitCount= {
    boardVisit: ""
}

class BoardMainApi {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardMainApi();
        }
        return this.#instance;
    }

    getAllBoardList(searchObj){
        let returnData = null;

        $.ajax({
            async : false,
            type: "post",
            url: "http://localhost:8000/api/board/all/list",
            data: searchObj,
            dataType: "json",
            success : response => {
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }

    getSearchBoardTotalCount(searchObj){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/board/totalCount",
            dataType: "json",
            success: response => {
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }

    getBoardVisit(){
        let responeseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/board/visit",
            dataType: "json",
            success: response => {
                responeseData = response.data;
                console.log(response);
            },
            error: error => {
                console.log(error);
            }
        });
        return responeseData;
    }
    
}

class BoardMainService {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardMainService();
        }
        return this.#instance;
    }
    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalcount = BoardMainApi.getInstance().getSearchBoardTotalCount(searchObj);
        const maxPageNumber = totalcount % searchObj.count == 0 
                            ? Math.floor(totalcount / searchObj.count) 
                            : Math.floor(totalcount / searchObj.count) + 1;
        
        pageController.innerHTML = `
            <a href="javascript:void(0)" class="pre-button disabled">이전</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">다음</a>
        `;

        if(searchObj.page != 1) {
            const preButton = pageController.querySelector(".pre-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page--;
                this.getLoadAllBoardList();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const preButton = pageController.querySelector(".next-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page++;
                this.getLoadAllBoardList();
            }
        }
        const startIndex = searchObj.page % 5 == 0 
                        ? searchObj.page - 4 
                        : searchObj.page - (searchObj.page % 5) + 1;
        
        const endIndex = startIndex + 4 <= maxPageNumber ? startIndex + 4 : maxPageNumber;

        const pageNumbers = document.querySelector(".page-numbers");

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.innerHTML += ` 
                <a href="javascript:void(0)"class ="page-button ${i == searchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {
            const pageNumber = button.textContent;
            if(pageNumber != searchObj.page) {
                button.onclick = () => {
                    searchObj.page = pageNumber;
                    this.getLoadAllBoardList();
                }
            }
        });
    }

    getLoadAllBoardList(){
        const responeseData = BoardMainApi.getInstance().getAllBoardList(searchObj);
        const boardTable = document.querySelector(".board-table tbody");
        const visitData = BoardMainApi.getInstance().getBoardVisit();
        
        boardTable.innerHTML = ``;
        
        let num = 0;
        
        responeseData.forEach((data, index) => {
            boardTable.innerHTML = `
            <tr>
                <td>${data.boardId}</td>
                <td><a href="/board/view?boardId=${data.boardId}" value=${data.boardId}>${data.boardSubject}</a></td>
                <td>${data.name}</td>
                <td>${data.boardRegDate}</td>
                <td>
                ${visitData[num].boardId == data.boardId
                    ?
                    `${visitData[num].boardVisit}`
                    :
                    `${data.boardVisit}`
                }
                </td>
                
            </tr>
            `;
            num++;
        });
        this.loadSearchNumberList();
    }

    getWriteButtonRequirement(){
        const principal = PrincipalApi.getInstance().getPrincipal();
        const writeBox = document.querySelector(".left-items");

        writeBox.innerHTML = `
        ${principal.user.roleDtl[0].roleId == 3 
            ?`
            <a href="/board/write"><button type="button" class="write-btn">글쓰기</button></a>
            `:`
            <a href="/board/write"><button type="button" class="write-btn" style="display: none">글쓰기</button></a>
        `}
        ${principal.user.roleDtl[0].roleId == 2 
            ?`
            <a href="/board/write"><button type="button" class="write-btn">글쓰기</button></a>
            `:`
            <a href="/board/write"><button type="button" class="write-btn" style="display: none">글쓰기</button></a>
        `}
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

    addClickEventSearchButton(){
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            BoardMainService.getInstance().getLoadAllBoardList();
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }
}