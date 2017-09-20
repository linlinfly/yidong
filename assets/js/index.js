$(function() {



    $(".redian").on("click", function() {
        $(this).addClass("choose")
            .siblings()
            .removeClass("choose")
        location.href = "index11.html"
    });
    $(".guanzhu").on("click", function() {
        $(this).addClass("choose")
            .siblings()
            .removeClass("choose")
        location = "index_0.html"
    })








    // var mySwiper = new Swiper(".swiper-one", {

    //     direction: 'horizontal',
    //     // loop: true,
    //     width: 320,


    //     // 如果需要分页器
    //     pagination: '.pagination1',

    //     paginationClickable: true,

    //     paginationBulletRender: function(swiper, index, className) {
    //         var arr = ["热点", "关注"]
    //         return '<span class="' + className + '">' + arr[index] + '</span>';
    //     },
    //     onSlideChangeEnd(swiper) {
    //         console.log(swiper.activeIndex) //当前滑到哪个的索引值
    //         $(".pagination1 span").eq(swiper.activeIndex).addClass("choose").siblings().removeClass("choose");
    //     },

    // })




    // var mySwiper = new Swiper('.swiper-two', {
    //     direction: 'horizontal',
    //     // loop: true,
    //     width: 320,


    //     // 如果需要分页器
    //     pagination: '.pagination2',

    //     paginationClickable: true,

    //     paginationBulletRender: function(swiper, index, className) {
    //         var arr = ["足球现场", "足球生活", "足球美女"];
    //         return '<span class="' + className + '">' + arr[index] + '</span>';
    //     },
    //     onSlideChangeEnd(swiper) {
    //         console.log(swiper.activeIndex) //当前滑到哪个的索引值
    //         $(".pagination2 span").eq(swiper.activeIndex).addClass("choose").siblings().removeClass("choose");
    //     },
    //     //freeMode:true,
    //     // 如果需要分页器
    //     //pagination: '.swiper-pagination',
    //     // 如果需要前进后退按钮
    //     // nextButton: '.swiper-button-next',
    //     // prevButton: '.swiper-button-prev',

    //     // 如果需要滚动条
    //     // scrollbar: '.swiper-scrollbar',
    // })

})