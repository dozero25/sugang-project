window.onload = () => {
    AdminMainService.getInstance().setCountDownSugangPocketDay();
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();
}

class AdminMainService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AdminMainService();
        }
        return this.#instance;
    }

    setCountDownSugangPocketDay(){
        const timeSet = document.querySelector(".timeSet");
        const start = document.querySelector(".start");
        const end = document.querySelector(".end");
        
        timeSet.onclick = () =>{
            start.value
            console.log(start.value);
            console.log(end.value);
        }
    }
}