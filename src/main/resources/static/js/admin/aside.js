window.onload = () => {
    AsideService.getInstance().loadAside();
    AsideService.getInstance().asideMenuEvent();
}


class AsideService{
    static #instance = null;
    static getInstance() {
        if(this.#instance == null) {
            this.#instance = new AsideService();
        }
        return this.#instance;
    }

    loadAside(){
        const asideContainer = document.querySelector(".left-aside");

        asideContainer.innerHTML += `
        <div class="aside-title">
            <h1 class="title-text-h1"> <a href="/admin/main">관리자 시스템</a></h1>
        </div>
        <nav class="main-menu">
            <div class="aaaa">
                <h3 class="title-text-sugang">수강정보관리</h3>
                <ul class="sub-menu1">
                    <a href="/admin/search"><li>강의정보 조회</li></a>
                    <a href="/admin/sugang"><li>강의정보 등록</li></a>
                </ul>
            </div>
            <h3 class="title-text-sp">학생/교수 정보관리</h3>
            <ul class="sub-menu2">
                <a href="/admin/usersearch"><li>학생/교수 정보 조회</li></a>
                <a href="/admin/userregister"><li>학생정보 등록</li></a>
                <a href="/admin/professorregister"><li>교수정보 등록</li></a>
            </ul>
            <h3 class="title-text-credit">학생학점관리</h3>
            <ul class="sub-menu3">
                <a href="/admin/"><li>학생 학점 조회</li></a>
                <a href="/admin/"><li>학생 학점 등록</li></a>
            </ul>
        </nav>
        <div class="title-backhome">
            <a href="/index" class="backhome-text">메인페이지</a>
        </div>
        `;
    }

    asideMenuEvent() {
        $('.main-menu .sub-menu1').hide();
        $('.main-menu .sub-menu2').hide();
        $('.main-menu .sub-menu3').hide();
    
        $('.title-text-sugang').mouseover(function(){
            $('.sub-menu1').slideDown().delay(3000);
        });

        $('.title-text-sugang').mouseout(function(){
            $('.sub-menu1').slideUp();
        });

        $('.title-text-sp').mouseover(function(){
            $('.sub-menu2').slideDown().delay(3000);
        });

        $('.title-text-sp').mouseout(function(){
            $('.sub-menu2').slideUp();
        });

        $('.title-text-credit').mouseover(function(){
            $('.sub-menu3').slideDown().delay(3000);
        });

        $('.title-text-credit').mouseout(function(){
            $('.sub-menu3').slideUp();
        });
    }

    
    
}