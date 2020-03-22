import './css/bootstrap-combined.no-icons.min.css'
import './css/global.scss'


import {campaignData} from '../data.js'


var navigation = document.getElementById('navigation');
var content=document.getElementById('content');
var tabs=document.getElementById('tab');
var startX; 
var swipebar;
var menuWidth=0;
const itemWidth=68;
const currentDate = new Date();


window.onload=function(){
    var page=document.getElementsByTagName('html');
    page[0].style.backgroundColor=campaignData.bgColor;
    var kv =document.getElementById('kv');
    var images=kv.getElementsByTagName('img');
    images[0].setAttribute('src',campaignData.kv.url);
    var menu = navigation.getElementsByTagName('ul');
    var length=campaignData.items.length;
    menuWidth=itemWidth*length;
    menu[0].style.width=menuWidth+'px';
    navigation.style.backgroundColor=campaignData.menuColor;
    tabs.style.backgroundColor=campaignData.menuColor;

    campaignData.tabs.forEach((item,i)=>{
        var iconBlock=document.createElement('div');
        var icon=document.createElement('img');
        icon.setAttribute('src',item.icon);
        iconBlock.appendChild(icon);
        iconBlock.className='block';
        iconBlock.style.width=(100/campaignData.tabs.length)+'%';
        tabs.appendChild(iconBlock);
    })

    campaignData.items.forEach((item,i)=>{
        var listItem = document.createElement('li');
        var link = document.createElement('a');
        link.setAttribute('href','#block'+i);
        link.innerHTML=item.name;
        link.onclick=function(e){
            e.stopPropagation();
            if(swipebar){
                swipebar.style.display='none';
            }
        }
        listItem.appendChild(link);
        menu[0].appendChild(listItem);
        var contentItem=document.createElement('div');
        contentItem.setAttribute('id','block'+i)

        var contentImage=document.createElement('img');
        contentImage.setAttribute('src',item.url);
        contentItem.appendChild(contentImage);

        var contentTitle=document.createElement('p');
        contentTitle.innerHTML=item.name;
        contentTitle.className='title';
        contentItem.appendChild(contentTitle);

        var hotelBlock=document.createElement('div');
        hotelBlock.className='block',
        item.hotels.forEach((item,i)=>{
            var link=document.createElement('a');
            var url=`https://www.booking.com/searchresults.html?checkin=${getCheckin()}&checkout=${getCheckout()}&dest_id=${item.id}&dest_type=hotel`;
            link.setAttribute('href',url);
            link.setAttribute('target','_blank')
            var hotel=document.createElement('div');
            hotel.className='hotel';
            var hotelImage=document.createElement('div');
            hotelImage.className='image';
            hotelImage.style.backgroundImage=`url(${item.main_photo})`;
            var desc=document.createElement('div');
            var stars=document.createElement('div');
            for (var i = 0; i < item.stars; i++) {
                var star= document.createElement('i');
                // star.className='icon-star';
                // star.style.color='#feba02';
                stars.appendChild(star);
            }
            var name=document.createElement('p');
            name.innerHTML=item.name;
            desc.className='desc';
            desc.appendChild(stars);
            desc.appendChild(name);
            hotelImage.appendChild(desc);
            hotel.appendChild(hotelImage);

            var hotelInfo=document.createElement('div');
            hotelInfo.className='info';
            var review=document.createElement('div');
            review.innerHTML=item.review_score+'  '+item.review_text;
            var price=document.createElement('div');
            price.innerHTML=formatThousand(item.min_price)+'元';
            price.className='price';
            var badge=document.createElement('div');
            badge.innerHTML=item.badge;
            badge.className='badge';
            hotelInfo.appendChild(review);
            hotelInfo.appendChild(price);
            hotelInfo.appendChild(badge);

            hotel.appendChild(hotelInfo);
            link.appendChild(hotel);
            hotelBlock.appendChild(link);
            
        })
        contentItem.appendChild(hotelBlock);
        content.appendChild(contentItem);
    })
}

navigation.ontouchstart=function(event){
    // event.preventDefault();
        startX=event.touches[0].pageX; //获取触摸开始的X坐标
        swipebar = document.getElementById('bar');
    }
   
navigation.ontouchmove=function(event){
    // event.preventDefault();
    
    swipebar = document.getElementById('bar');
    if(!swipebar){ //无滑动条的情况下，新建滑动提示条
        var swipebar = document.createElement('div');
        swipebar.setAttribute('id','bar');
        navigation.appendChild(swipebar);
    }else{         //在已有滑动条的情况下，重新显示滑动条
        swipebar.style.display='block';
    }

    var step=15; //设置移动间距
    var style;
    //当X坐标大于起始坐标时，向右滑动目录栏
    if(event.touches[0].clientX>startX){
        this.scrollLeft-=step;
        //滑动条向左
        style=window.getComputedStyle(swipebar);
        if(parseInt(style.left)>10)
        swipebar.style.left=(parseInt(style.left)-step)+'px';
    }else{    
        //当X坐标小于起始坐标时，向左滑动目录栏
        this.scrollLeft+=step;
        style=window.getComputedStyle(swipebar);
        if((parseInt(style.left)+parseInt(style.width))<(menuWidth-10))
        swipebar.style.left=(parseInt(style.left)+step)+'px';
    }
}
navigation.ontouchend=function(event){
    // event.preventDefault();

    //触摸完成后隐藏滑动条
    if(swipebar){
        swipebar.style.display='none';
    }
}

navigation.ontouchcancel=function(event){
    if(swipebar){
        swipebar.style.display='none';
    }
}

function getCheckin(){
let formatedMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
let formatedDate =("0"+currentDate.getDate()).slice(-2);
const today = currentDate.getFullYear() + '-' + formatedMonth + '-' + formatedDate;
return today;
}

function getCheckout(){
    let tempdate = new Date();
    tempdate.setDate(tempdate.getDate() + 1);
    let formatedMonth = ("0" + (tempdate.getMonth() + 1)).slice(-2);
    let formatedDate = ("0"+tempdate.getDate()).slice(-2);

    return tempdate.getFullYear() + '-' + formatedMonth + '-' + formatedDate;
}

function formatThousand(num){
    var reg=/\d{1,3}(?=(\d{3})+$)/g; 
    return (num + '').replace(reg, '$&,');
}

var xhr = new XMLHttpRequest();
xhr.open('get','http://localhost:8080/haha?query=1');
xhr.send();
xhr.onload = function(){
   console.log(xhr.responseText);
}