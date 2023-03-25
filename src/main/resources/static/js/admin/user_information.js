window.onload = () => {
    UserInformatinService.getInstance().loadCategories();
    UserInformatinService.getInstance().loadUserList();
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

class UserInformatinApi{

    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new UserInformatinApi();
        }
        return this.#instance;
    }

    getMajorCategories(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/usersearch",
            dataType: "json",
            success: responese => {
                console.log(responese);
                returnData = responese.data;
            }, 
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    
    getUserTotalCount(searchObj){
        let returnData = null;

        $.ajax({
            async:false,
            type:"get",
            url:"http://localhost:8000/api/admin/totalcount",
            data:{
                "category" : searchObj.category,
                "searchValue" : searchObj.searchValue
            },
            dataType:"json",
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

    getUserList(searchObj){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://127.0.0.1:8000/api/admin/users",
            data: searchObj,
            dataType: "json",
            success: response => {
                console.log(response);
                console.log(response.username);
                returnData = response.data;
            },
            error: error => {
                console.log(error);
            }
        });

        return returnData;
    }

    deleteUsers(deleteArray){
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: "http://127.0.0.1:8000/api/admin/users",
            contentType: "application/json",
            data: JSON.stringify(
                {
                    usernames: deleteArray
                }
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

class UserInformatinService {
    static #instance = null;

    static getInstance() {
        if (this.#instance == null) {
            this.#instance = new UserInformatinService();
        }
        return this.#instance;
    }
    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");

        const totalCount = UserInformatinApi.getInstance().getUserTotalCount(searchObj);
        const maxPageNumber = totalCount % searchObj.count == 0 
                            ? Math.floor(totalCount / searchObj.count) 
                            : Math.floor(totalCount / searchObj.count) + 1;

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
                this.loadUserList();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const nextButton = pageController.querySelector(".next-button");
            nextButton.classList.remove("disabled");

            nextButton.onclick = () => {
                searchObj.page++;
                this.loadUserList();
            }
        }

        const startIndex = searchObj.page % 5 == 0 
                        ? searchObj.page - 4 
                        : searchObj.page - (searchObj.page % 5) + 1;
        const endIndex = startIndex + 4 <= maxPageNumber ? startIndex + 4 : maxPageNumber;
        const pageNumbers = document.querySelector(".page-numbers");

        for(let i = startIndex; i <= endIndex; i++) {
            pageNumbers.innerHTML += `
                <a href="javascript:void(0)"class="page-button ${i == searchObj.page ? "disabled" : ""}"><li>${i}</li></a>
            `;
        }

        const pageButtons = document.querySelectorAll(".page-button");
        pageButtons.forEach(button => {

            const pageNumber = button.textContent;
            if(pageNumber != searchObj.page) {
                button.onclick = () => {
                    searchObj.page = pageNumber;
                    this.loadUserList();
                }
            }
        });
    }

    loadCategories() {
        const responeseData = UserInformatinApi.getInstance().getMajorCategories();

        const categorySelect = document.querySelector(".category-select");
        categorySelect.innerHTML = `<option value="전체조회">전체조회</option>`;

        responeseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data}">${data}</option>
            `;
        });
    }

    loadUserList() {
        const responseData = UserInformatinApi.getInstance().getUserList(searchObj);

        const userListBody = document.querySelector(".content-table tbody");
        userListBody.innerHTML = ``;

        responseData.forEach((data, index) => {
            userListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="category-select">${data.category}</td>
                    <td class="username">${data.username}</td>
                    <td>${data.name}</td>
                    <td>${data.password}</td>
                    <td><a href="/templates/admin/user_modify.html?username=${data.username}"><button class="modifybutton">수정</button></a></td>
                </tr>
            `;
        });

        this.loadSearchNumberList();

    }

    removeUsers(deleteArray){
        let successFlag = UserInformatinApi.getInstance().deleteUsers(deleteArray);
        if(successFlag) {
            searchObj.page = 1;
            this.loadUserList();
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
        const categorySelect = document.querySelector(".category-select");
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {
            searchObj.category = categorySelect.value;
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;
            UserInformatinService.getInstance().loadUserList();
        }
    }

    addClickEventDeleteButton() {
        const deleteButton = document.querySelector(".delete-button");
        deleteButton.onclick = () => {
            if(confirm("정말로 삭제하시겠습니까?")) {
                const deleteArray = new Array();
    
                const deleteCheckboxs = document.querySelectorAll(".delete-checkbox");

                deleteCheckboxs.forEach((deleteCheckbox, index) => {
                    if(deleteCheckbox.checked) {
                        const usernames = document.querySelectorAll(".username");
                        deleteArray.push(usernames[index].textContent);
                    }
                });
    
                UserInformatinService.getInstance().removeUsers(deleteArray);
                UserInformatinService.getInstance().loadUserList();
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
