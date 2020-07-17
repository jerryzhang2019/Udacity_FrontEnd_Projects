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
let sectionList = document.querySelectorAll('section');
let navListTag = document.getElementById('navbar_list');

let sectionLength = sectionList.length;
let sectionPositions = [];
let oldPosition = 0;
let currentPosition = 0;

/**
 * End Global Variables结束全局变量
 * Start Helper Functions启动助手功能
 * 
*/
function scrollToSection(sectionID){
    window.scrollTo(0,sectionID);
}

/**
 * End Helper Functions最终助手功能
 * Begin Main Functions开始主要功能
 * 
*/

// build the nav建立导航
sectionList.forEach((element, index) => {
    let sectionName = element.getAttribute('data-nav');
    let toOffSection = element.offsetTop + 30;
    let liTag = document.createElement('li');
    liTag.setAttribute('class', 'menu_link' + index);
    liTag.innerHTML = `<a onClick="scrollToSection(${toOffSection})">${sectionName}</a>`;
    navListTag.appendChild(liTag);
  });

// add event listener
document.addEventListener('scroll', () => {
    currentPosition = this.scrollY;
    // Section Positions
    sectionPositions = [];
    sectionList.forEach(element =>
      sectionPositions.push(element.getBoundingClientRect().top + 50)
    );
  
    // Adding and removing active sections
    let addIndex = sectionPositions.findIndex(element => element > 0);
    for (let i = 0; i < sectionLength; i++) {
      if (addIndex === i) {
        document.querySelector('.menu_link' + addIndex).classList.add('active');
        Document
          .querySelector(`#section${addIndex + 1}`)
          .classList.add('highlight');
      } else {
        document.querySelector('.menu_link' + i).classList.remove('active');
        document.querySelector(`#section${i + 1}`).removeAttribute('class');
      }
    }
  });








