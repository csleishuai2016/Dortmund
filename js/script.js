var getEle=function(cls){
	return document.querySelector(cls);
}

var getAllEle=function(cls){
	return document.querySelectorAll(cls);
}

var getCls=function(ele){
	return ele.getAttribute("class");
}

var addCls=function(ele,cls){
	var baseCls=ele.getAttribute("class");
	if (baseCls.indexOf(cls)===-1) {
		ele.setAttribute("class",baseCls+"  "+cls);
	}
}

var delCls=function(ele,cls){
		var baseCls=ele.getAttribute("class");
	if (baseCls.indexOf(cls)!=-1) {
		ele.setAttribute("class",baseCls.split(cls).join(" ").replace(/\s+/g," "));
	}
}

var animateClass={
	".player__picture_rows":[
	".player__picture_1",
	".player__picture_2",
	".player__picture_3"
	]
}

/*导航条选择*/

function SelecterNav(ele,index){
	for (var i = 0; i < ele.length; i++) {
		delCls(ele[i],"header__nav_item-active");
	}
	addCls(ele[index],"header__nav_item-active");
}
function navsItem(ele){
	for (var i = 0; i < ele.length; i++) {
		  ele[i].id=i;
		ele[i].onclick=function(){
			var index=this.id;
			SelecterNav(ele,index);
		}
	}
}

navsItem(getAllEle(".header__nav_item"));
var main=document.getElementById("banner__container");
var imgIdx=getAllEle(".banner__item-content").length;
var timer=null;
var imageContent=document.getElementById("banner__container").getElementsByTagName("div");
var imageButton=document.getElementById("banner__button").getElementsByTagName("span");
/*轮播图*/
function startImage(doubleIndex){
for (var i = 0; i < 4; i++) {
	imageContent[2*i].style.display="none";
}
imageContent[doubleIndex].style.display="block";
};
//开始计时
function interVal(){
	var index=0;
	timer=setInterval(function(){
		index++;
		if(index>imgIdx-1){
			index=0;
		}
		var doubleIndex=2*index;
		startImage(doubleIndex);
		imageButton[0].onclick=function(){
			
			if(doubleIndex==0){
				doubleIndex=6;
				startImage(doubleIndex);
			}else{ 
				doubleIndex=doubleIndex-2;
				startImage(doubleIndex);
			}
		}
		imageButton[1].onclick=function(){
			if(doubleIndex==6){
				doubleIndex=0;
				startImage(doubleIndex);
			}else{ 
				doubleIndex=doubleIndex+2;
				startImage(doubleIndex);
			}
		}
	},1000)};
	//停止计时
function disInterVal(){
	clearInterval(timer);
}

main.onmousemove=function(){
	disInterVal();
}

main.onmouseout=function(){
	interVal();
}
interVal();

/*滚动换屏*/

window.onscroll=function(){
	var top=document.body.scrollTop;
	if(top>80){
		addCls(getEle(".header"),"header-active");
	}else{
		delCls(getEle(".header"),"header-active");
	}
	SelecterNav(getAllEle(".header__nav_item"),0);
	if(top>0){
		SelecterNav(getAllEle(".header__nav_item"),0);
	}
	if(top>580){
     SelecterNav(getAllEle(".header__nav_item"),1);

	}
	if(top>1380){
		 SelecterNav(getAllEle(".header__nav_item"),2);
		 animateDone(".player__picture_rows");

	}
	if(top>2180){
		 SelecterNav(getAllEle(".header__nav_item"),3);

	}
	if(top>2980){
		 SelecterNav(getAllEle(".header__nav_item"),4);
	}
}

/*CSS3动画*/
var animateInit=function (cls){
	var animateCls=animateClass[cls];
	
	for (var i = 0; i < animateCls.length; i++) {
		var ele=getEle(animateCls[i]);
		var baseClass=ele.getAttribute("class");
		ele.setAttribute("class",baseClass+"  "+baseClass+"_init");
	}
}

var animateDone =function (cls){
	var animateCls=animateClass[cls];
	for (var i = 0; i < animateCls.length; i++) {
		var ele=getEle(animateCls[i]);
		var baseClass=ele.getAttribute("class");
		ele.setAttribute("class",baseClass.replace("_init","_done"));
	}
}
window.onload=function(){
	for (k in animateClass) {
		animateInit(k);
	}
}
