window.onload = () => {
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();

    
}

class AdminMainApi{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AdminMainApi();
        }
        return this.#instance;
    }
    

    
    
}