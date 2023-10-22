window.onload = () => {
    HeaderService.getInstance().loadHeader();

    BoardMainService.getInstance().getLoadAllBoardList();
    BoardMainService.getInstance().getWriteButtonRequirement();
    BoardMainService.getInstance().getLoadBoardCategoryButton();

    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventBoardListByBoardGrp();
}

let searchObj = {
    page : 1,
    boardId: "",
    boardSubject : "",
    userId: "",
    searchValue : "",
    limit : "Y",
    count : 10
}

const boardObj = {
    boardId: "",
    boardSubject : "",
    userId: "",
    name : "",
    boardContent: "",
    boardVisit: "",
    boardRegDate: "",
    boardGrp: "",
    page : 1,
    searchValue : "",
    limit : "Y",
    count : 10
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
            type: "get",
            url: `http://localhost:8000/api/board/all/list`,
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

    getSearchBoardTotalCount(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/board/totalCount",
            data: {
                "searchValue" : searchObj.searchValue
            },
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

    getLoadBoardListByBoardGrp(boardObj){
        let responeseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/board/list/${boardObj.boardGrp}`,
            data: boardObj,
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

    getSearchBoardCountByBoardGrp(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/board/count/${boardObj.boardGrp}`,
            data: {
                "searchValue" : boardObj.searchValue,
                "boardGrp" : boardObj.boardGrp,

            },
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
}

class BoardMainService {
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new BoardMainService();
        }
        return this.#instance;
    }

    loadPageController() {
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

    loadPageControllerByBoardGrp() {
        const pageController = document.querySelector(".page-controller");

        const totalcount = BoardMainApi.getInstance().getSearchBoardCountByBoardGrp(boardObj);

        const maxPageNumber = totalcount % boardObj.count == 0 
                            ? Math.floor(totalcount / boardObj.count) 
                            : Math.floor(totalcount / boardObj.count) + 1;
        
        pageController.innerHTML = `
            <a href="javascript:void(0)" class="pre-button disabled">이전</a>
            <ul class="page-numbers">
            </ul>
            <a href="javascript:void(0)" class="next-button disabled">다음</a>
        `;

        if(boardObj.page != 1) {
            const preButton = pageController.querySelector(".pre-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                boardObj.page--;
                this.getLoadButtonClickBoardList();
            }
        }

        if(boardObj.page != maxPageNumber) {
            const preButton = pageController.querySelector(".next-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                boardObj.page++;
                this.getLoadButtonClickBoardList();
            }
        }
        const startIndex = boardObj.page % 5 == 0 
                        ? boardObj.page - 4 
                        : boardObj.page - (boardObj.page % 5) + 1;
        
        const endIndex = startIndex + 4 <= maxPageNumber ? startIndex + 4 : maxPageNumber;

        const pageNumbers = document.querySelector(".page-numbers");

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.innerHTML += ` 
                <a href="javascript:void(0)"class ="page-button ${i == boardObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {
            const pageNumber = button.textContent;
            if(pageNumber != boardObj.page) {
                button.onclick = () => {
                    boardObj.page = pageNumber;
                    this.getLoadButtonClickBoardList();
                }
            }
        });
    }

    getLoadAllBoardList(){
        const responeseData = BoardMainApi.getInstance().getAllBoardList(searchObj);
        const boardTable = document.querySelector(".board-table tbody");

        boardTable.innerHTML = "";

        responeseData.forEach((data, index) => {
            boardTable.innerHTML += `
            <tr>
                <td>${data.boardIdByRowNum}</td>
                <td>
                <a href="/board/view?boardId=${data.boardId}" value=${data.boardId}>${data.boardSubject}</a>
                </td>
                <td>${data.name}</td>
                <td>${data.boardRegDate}</td>
                <td>${data.boardVisit}</td>
            </tr>
            `;
        });
        this.loadPageController();
    }

    getWriteButtonRequirement(){
        const writeBox = document.querySelector(".left-items");
        
        writeBox.innerHTML = `
        <a href="/board/write"><button type="button" class="write-btn">글쓰기</button></a>
    `;
    }

    getLoadBoardCategoryButton(){
        const boardList = document.querySelector(".board-list");
        const boardCategory = BoardMainApi.getInstance().getLoadBoardCategory();
        
        boardList.innerHTML += `
            <div>
                <a href="/board"><button>전체 게시판</button></a>
            </div>
            `;

        boardCategory.forEach((data) => {
            boardList.innerHTML += `
            <div>
                <button class="category-btn" value="${data.boardGrp}">${data.boardCategoryName}</button>
            </div>
            `;
        });
    }

    getLoadButtonClickBoardList(){
        const boardTable = document.querySelector(".board-table tbody");
        const responeseData = BoardMainApi.getInstance().getLoadBoardListByBoardGrp(boardObj);
                
        boardTable.innerHTML = ``

        responeseData.forEach((data, index)=> {
            boardTable.innerHTML += `
            <tr>
                <td>${data.boardIdByRowNum}</td>
                <td>
                <a href="/board/view?boardId=${data.boardId}" value=${data.boardId}>${data.boardSubject}</a>
                </td>
                <td>${data.name}</td>
                <td>${data.boardRegDate}</td>
                <td>${data.boardVisit}</td>
            </tr> 
            `;
        });
        this.loadPageControllerByBoardGrp();
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

    addClickEventBoardListByBoardGrp(){
        const categoryBtn = document.querySelectorAll(".category-btn");
        const boardCategory = BoardMainApi.getInstance().getLoadBoardCategory();

        categoryBtn.forEach((button, index) => {
           button.onclick= () => {
                boardObj.boardGrp = boardCategory[index].boardGrp;
                boardObj.page=1;
                BoardMainService.getInstance().getLoadButtonClickBoardList();
            }
        });
    }
}