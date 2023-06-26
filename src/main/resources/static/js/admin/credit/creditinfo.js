window.onload = () => {
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();

    creditInfoService.getInstance().loadAllCreditList();
}

class creditApi{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new creditApi();
        }
        return this.#instance;
    }

    getAllCreditList(){
        let returnData = null;

        $.ajax({
            async: false,
            type: "get",
            url: "http://localhost:8000/api/admin/all/credit",
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
    
}

class creditInfoService{
    static #instance = null;
    static getInstance(){
        if(this.#instance == null) {
            this.#instance = new creditInfoService();
        }
        return this.#instance;
    }

    loadAllCreditList(){
        const responeseData = creditApi.getInstance().getAllCreditList();

        const creditList = document.querySelector(".content-table tbody");
        creditList.innerHTML = "";

        responeseData.forEach((data, index) => {
            creditList.innerHTML += `
                <tr>
                    <th><input type="checkbox" class="delete-checkall"></th>
                    <td>${data.username}</td>
                    <td>${data.pastCredit}</td>
                    <td>${data.pastAvg}</td>
                    <td>${data.maxCredit}</td>
                    <td>${data.presentCredit}</td>
                    <td>${data.subCredit - data.maxCredit}</td>
                </tr>        
            `
        });
    }
}

