window.onload = () => {
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();

    CreditInfoService.getInstance().loadAllCreditList();

    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteButton();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
}

let searchObj = {
    page : 1,
    major : "",
    searchValue : "",
    order : "username",
    limit : "Y",
    count : 10
}

let creditObj = {
    userId : "",
    username: "",
    pastCredit : "",
    pastAvg : "",
    maxCredit :  "",
    presentCredit : "",
    subCredit : ""
}

class InfoCreditApi{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new InfoCreditApi();
        }
        return this.#instance;
    }

    getAllCreditList(searchObj){
        let returnData = null;

        $.ajax({
            async: false,
            type: "post",
            url: "http://localhost:8000/api/admin/all/credit",
            data: searchObj,
            dataType: "json",
            success: response => {
                console.log(response);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }
    
    getUserCreditTotalCount(searchObj){
        let returnData = null;

        $.ajax({
            async : false,
            type: "get",
            url: "http://localhost:8000/api/admin/credit/totalCount",
            data: {
                "searchValue" : searchObj.searchValue
            },
            dataType : "json",
            success : response => {
                returnData= response.data;
            },
            error: error => {
                console.log(error);
            }
        });
        return returnData;
    }

    deleteCreditUsers(deleteArray){
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: "http://localhost:8000/api/admin/credit/deletes",
            contentType: "application/json",
            data: JSON.stringify(
                {userIds: deleteArray}
            ),
            dataType:"json",
            success: response => {
                returnFlag = true;
            },
            error: error => {
                console.log(error);
            }
        })

        return returnFlag;
    }
}

class CreditInfoService{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new CreditInfoService();
        }
        return this.#instance;
    }
    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalcount = InfoCreditApi.getInstance().getUserCreditTotalCount(searchObj);
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
                this.loadAllCreditList();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const preButton = pageController.querySelector(".next-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page++;
                this.loadAllCreditList();
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
                    this.loadAllCreditList();
                }
            }
        });
    }

    loadAllCreditList(){
        const responeseData = InfoCreditApi.getInstance().getAllCreditList(searchObj);

        const creditList = document.querySelector(".content-table tbody");
        creditList.innerHTML = ``;

        responeseData.forEach((data, index) => {
            creditList.innerHTML += `
            <tr>
                <td><input type="checkbox" class="delete-checkbox"></td>
                <td class="userId" style=display:none>${data.userId}</td>
                <td><a href="/admin/credit?userId=${data.userId}" value=${data.userId}>${data.username}</a></td>
                <td>${data.pastCredit}</td>
                <td>${data.pastAvg}</td>
                <td>${data.maxCredit}</td>
                <td>${data.presentCredit}</td>
                <td>${data.subCredit - data.maxCredit}</td>
            </tr>    
            `;
            
        });
        this.loadSearchNumberList();
        ComponentEvent.getInstance().addClickEventDeleteCheckbox();
    }

    removeCreditUsers(deleteArray){
        let successFlag = InfoCreditApi.getInstance().deleteCreditUsers(deleteArray);
        console.log(successFlag);
        if(successFlag) {
            searchObj.page = 1;
            this.loadAllCreditList();
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

    addClickEventSearchButton(){
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            CreditInfoService.getInstance().loadAllCreditList();
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
        }
    }

    addClickEventDeleteButton() {
        const deleteButton = document.querySelector(".delete-button");
        const checkAll = document.querySelector(".delete-checkall");

        deleteButton.onclick = () => {
            if(confirm("정말로 삭제하시겠습니까?")) {
                const deleteArray = new Array();
    
                const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");

                deleteCheckboxs.forEach((deleteCheckbox, index) => {
                    if(deleteCheckbox.checked) {
                        const userIds = document.querySelectorAll(".userId");
                        deleteArray.push(userIds[index].textContent);
                    }
                });
    
                CreditInfoService.getInstance().removeCreditUsers(deleteArray);
            }
        }
    }

    addClickEventDeleteCheckAll() {
        const checkAll = document.querySelector(".delete-checkall");
        checkAll.onclick = () => {
            const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");
            deleteCheckboxs.forEach(deleteCheckbox => {
                deleteCheckbox.checked = checkAll.checked;
            });
        }
    }

    addClickEventDeleteCheckbox() {
        const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");
        const checkAll = document.querySelector(".delete-checkall");

        deleteCheckboxs.forEach(deleteCheckbox => {
            deleteCheckbox.onclick = () => {
                const deleteCheckedCheckboxs = document.querySelectorAll(".delete-checkbox:checked");

                if(deleteCheckedCheckboxs.length == deleteCheckboxs.length) {
                    checkAll.checked = true;
                }else {
                    checkAll.checked = false;
                }
            }
        });
    }
}
