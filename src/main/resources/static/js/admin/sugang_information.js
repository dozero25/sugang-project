window.onload = () => {
    SugangInformationService.getInstance().loadSugangList();
    SugangInformationService.getInstance().loadCategories();
    ComponentEvent.getInstance().addClickEventSearchButton();
    ComponentEvent.getInstance().addClickEventDeleteButton();
    ComponentEvent.getInstance().addClickEventDeleteCheckAll();
}

let searchObj = {
    page: 1,
    category: "",
    searchValue: "",
    order: "subjectCode",
    limit: "Y",
    count: 10
}

class SugangInformationApi{

    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SugangInformationApi();
        }
        return this.#instance;
    }

    getSugangList(searchObj){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/search",
            data: searchObj,
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

    getMajorCategories(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin",
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

    getSubjectTotalCount(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/sugangs/totalcount",
            data: {
                "category" : searchObj.category,
                "searchValue" : searchObj.searchValue
            },
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

    deleteSubjects(deleteArray) {
        let returnFlag = false;

        $.ajax({
            async: false,
            type: "delete",
            url: "http://localhost:8000/api/admin/sugangs",
            contentType: "application/json",
            data: JSON.stringify(
                {subjectCodes: deleteArray}
            ),
            dataType: "json",
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

class SugangInformationService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new SugangInformationService();
        }
        return this.#instance;
    }

    loadSugangList() {
        const responeseData = SugangInformationApi.getInstance().getSugangList(searchObj);

        const sugangListBody = document.querySelector(".content-table tbody");
        sugangListBody.innerHTML = "";
        
        responeseData.forEach((data, index) => {
            sugangListBody.innerHTML += `
                <tr>
                    <td><input type="checkbox" class="delete-checkbox"></td>
                    <td class="category"><a href="/templates/admin/sugang_modification.html?subjectCode=${data.subjectCode}">${data.category}</td></a>
                    <td>${data.classification}</td>
                    <td class="subject-code">${data.subjectCode}</td>
                    <td>${data.subjectName}</td>
                    <td>${data.credit}</td>
                    <td>${data.professorName}</td>
                    <td>${data.building}</td>
                    <td>${data.lectureTime}</td>
                </tr>
            `;
        });
        this.loadSearchNumberList();
        ComponentEvent.getInstance().addClickEventDeleteCheckbox();
    }

    loadCategories() {
        const responeseData = SugangInformationApi.getInstance().getMajorCategories();

        const categorySelect = document.querySelector(".category-select");
        categorySelect.innerHTML = `<option value="">전체조회</option>`;

        responeseData.forEach(data => {
            categorySelect.innerHTML += `
                <option value="${data}">${data}</option>
            `;
        }); 
    }

    loadSearchNumberList() {
        const pageController = document.querySelector(".page-controller");
        pageController.innerHTML = "";

        const totalcount = SugangInformationApi.getInstance().getSubjectTotalCount(searchObj);
        const maxPageNumber = totalcount % searchObj.count == 0 ? Math.floor(totalcount / searchObj.count) : Math.floor(totalcount / searchObj.count) + 1;
        
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
                this.loadSugangList();
            }
        }

        if(searchObj.page != maxPageNumber) {
            const preButton = pageController.querySelector(".next-button");
            preButton.classList.remove("disabled");

            preButton.onclick = () => {
                searchObj.page++;
                this.loadSugangList();
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
                    this.loadSugangList();
                }
            }
        });
    }

    removeSubjects(deleteArray) {
        let successFlag = SugangInformationApi.getInstance().deleteSubjects(deleteArray);
        console.log(successFlag)
        if(successFlag) {
            searchObj.page = 1;
            this.loadSugangList();
        }
    }
}

class ComponentEvent {
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new ComponentEvent();
        }
        return this.#instance;
    }

    addClickEventSearchButton() {
        const categorySelect = document.querySelector(".category-select");
        const searchInput = document.querySelector(".search-input");
        const searchButton = document.querySelector(".search-button");

        searchButton.onclick = () => {
            searchObj.category = categorySelect.value;
            searchObj.searchValue = searchInput.value;
            searchObj.page = 1;

            SugangInformationService.getInstance().loadSugangList();
        }

        searchInput.onkeyup = () => {
            if(window.event.keyCode == 13) {
                searchButton.click();
            }
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
                        const subjectCodes = document.querySelectorAll(".subject-code");
                        deleteArray.push(subjectCodes[index].textContent);
                    }   
                });
                SugangInformationService.getInstance().removeSubjects(deleteArray);
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
