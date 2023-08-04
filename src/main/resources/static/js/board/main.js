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
    searchValue : "",
    limit : "Y",
    count : 10
}

let searchObj1 = {
    page : 1,
    boardGrp: "",
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
    boardGrp: ""
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

    getLoadBoardListByBoardGrp(){
        let responeseData = null;

        $.ajax({
            async: false,
            type: "get",
            url: `http://localhost:8000/api/board/list/${boardObj.boardGrp}`,
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
                "searchValue" : searchObj1.searchValue,
                "searchValue" : searchObj1.searchValue
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

        boardTable.innerHTML = "";

        responeseData.forEach((data, index) => {
            boardTable.innerHTML += `
            <tr>
                <td>${data.boardId}</td>
                <td>
                <a href="/board/view?boardId=${data.boardId}" value=${data.boardId} id="go-writepage">${data.boardSubject}</a>
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

    getLoadBoardCategoryButton(){
        const boardList = document.querySelector(".board-list");
        const boardCategory = BoardMainApi.getInstance().getLoadBoardCategory();
        
        boardCategory.forEach((data) => {
            boardList.innerHTML += `
            <div>
                <button class="category-btn" value="${data.boardGrp}">${data.boardCategoryName}</button>
            </div>
            `;
        });

        
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
        const boardTable = document.querySelector(".board-table tbody");
        const boardCategory = BoardMainApi.getInstance().getLoadBoardCategory();
        
        categoryBtn.forEach((button, index) => {
            button.onclick= () => {
                boardObj.boardGrp = boardCategory[index].boardGrp;
                
                const boardList = BoardMainApi.getInstance().getLoadBoardListByBoardGrp(boardObj);
                const totalcount = BoardMainApi.getInstance().getSearchBoardTotalCount(searchObj);
                alert(totalcount);
                boardTable.innerHTML = ``;

                for(let i = 0; i < boardList.length; i++) {
                    
                    boardTable.innerHTML += `
                        <tr>
                            <td>${boardList[i].boardId}</td>
                            <td>
                            <a href="/board/view?boardId=${boardList[i].boardId}" value=${boardList[i].boardId} id="go-writepage">${boardList[i].boardSubject}</a>
                            </td>
                            <td>${boardList[i].name}</td>
                            <td>${boardList[i].boardRegDate}</td>
                            <td>${boardList[i].boardVisit}</td>
                        </tr> 
                        `
                }
                BoardMainService.getInstance().loadPageController();
            }
        });
    }
}