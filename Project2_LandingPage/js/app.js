/**
 * 
 * Manipulating the DOM exercise.操作DOM练习。
 * Exercise programmatically builds navigation,练习以编程方式构建导航，
 * scrolls to anchors from navigation,从卷轴到导航
 * and highlights section in viewport upon scrolling.并在滚动时突出显示viewport中的部分
 * 
 * Dependencies: None依赖关系：无
 * 
 * JS Version: ES2015/ES6JS版本：ES2015 / ES6
 * 
 * JS Standard: ESlintJS标准：ESlint
 * 
*/

/**
 * Define Global Variables定义全局变量
 * 
*/
const pageSections = document.querySelectorAll('section');
console.log(pageSections);

/**
 * End Global Variables结束全局变量
 * Start Helper Functions启动助手功能
 * 
*/
function contentIsInViewport(element){
    let isVisible = false;

    const pageScrollHeight = window.pageYOffset;
    const topValue = element.offsetTop;

    if(pageScrollHeight >= topValue){
        isVisible = true;
    }else{
        isVisible = false;
    }
    return isVisible;
}
/**
 * End Helper Functions最终助手功能
 * Begin Main Functions开始主要功能
 * 
*/

// build the nav建立导航
function buildNav(){
    const navContainer = document.querySelector("#navbar__list");
    const containerFragment = document.createDocumentFragment();

    for(const section of pageSections){
        const liItem = document.createElement('li');
        const aItem = document.createElement('a');
        const sectionName = section.getAttribute('data-nav');

        aItem.setAttribute("data-section", section.id);
        aItem.setAttribute("class", 'menu__link');
        aItem.textContent = sectionName;
        liItem.appendChild(aItem);
        containerFragment.appendChild(liItem);
    };
    navContainer.appendChild(containerFragment);
}

// Add class 'active' to section when near top of viewport
//在视口顶部附近时，将“活动”类添加到部分
function highlightSection(section){
    if(contentIsInViewport(section)){
        document.querySelectorAll(".menu__link").forEach(menu =>{
            menu.classList.remove("menu__link__active");
            const sectionId = section.getAttribute("id");
            const menuId = menu.getAttribute("data-section");
            if(menuId == sectionId){
                menu.classList.add('menu__link__active');
            }
        });
        section.classList.add('heighlight');
    }else{
        section.classList.remove('hightlight');
    }
}
// Scroll to anchor ID using scrollTO event
//使用scrollTO事件滚动到锚点ID
function scrollHandler(){
    document.querySelectorAll(".menu__link").forEach(menuLink => {
        menuLink.addEventListener("click", function(event){
            event.preventDefault();
            document.querySelectorAll(".menu__link").forEach(menu => {
                menu.classList.remove("menu__link__active");
            });

            event.target.classList.add("menu__link__active");
            const targetSectionId = event.target.getAttribute("data-section");

            const moveTop = document.getElementById(targetSectionId).offsetTop;
            window.scrollTo({
                top:moveTop,
                behavior: "smooth"
            });
        });
    });
}
/**
 * End Main Functions结束主要功能
 * Begin Events开始活动
 * 
*/

// Build menu 构建菜单

// Scroll to section on link click滚动到链接部分，点击
document.addEventListener("DOMContentLoaded", (event) => {
    buildNav();
    scrollHandler();
});
// Set sections as active将部分设置为活动
document.addEventListener('scroll', (event) =>{
    for (const section of pageSections){
        highlightSection(section);
    }
});


