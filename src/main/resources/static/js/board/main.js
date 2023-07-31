window.onload = () => {
    HeaderService.getInstance().loadHeader();
    BoardMainService.getInstance().getLoadAllBoardList();
}

let searchObj = {
    page : 1,
    major : "",
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

    getAllBoardList(){
        let responeseData = null;

        $.ajax({
            async : false,
            type: "get",
            url: "http://localhost:8000/api/board/all/list",
            dataType : "json",
            success : response => {
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

    getLoadAllBoardList(){
        const responeseData = BoardMainApi.getInstance().getAllBoardList();
        const boardTable = document.querySelector(".board-table tbody");

        boardTable.innerHTML = ``;

        responeseData.forEach((data, index) => {
            
            boardTable.innerHTML += `
            <tr>
                <td>${data.boardId}</td>
                <td><a href="/board/view?boardId=${data.boardId}" value=${data.boardId}>${data.boardSubject}</a></td>
                <td>${data.name}</td>
                <td>${data.boardRegDate}</td>
                <td>${data.boardVisit}</td>
            </tr>
            `;
        });
    }
}