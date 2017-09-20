$(function() {
    var $slide_0 = $("#slide_0"),
        $slide_1 = $("#slide_1"),
        $slide_2 = $("#slide_2");


    var IScroll_0 = null,
        IScroll_1 = null,
        IScroll_2 = null;


    var upTag_0 = $("#upTag_0"),
        upTag_1 = $("#upTag_1"),
        upTag_2 = $("#upTag_2");
    template.helper("sex", function(gender) {
        if (gender == 0) {
            return "男" //一定要有返回值
        } else {
            return "女"
        };
    });
    //确定3个包裹层的高度
    $(".swiper-slide").height($("#section").height());

    fetchList(0);

    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        onSlideChangeStart: function(swiper) {
            fetchList(swiper.activeIndex)
        },
        paginationBulletRender: function(swiper, index, className) {
            var arr = ["足球现场", "足球生活", "足球美女"];
            return '<span class="' + className + '">' + arr[index] + '</span>';
        }
    });


    function fetchList(index) {

        $.get('/api/leftList', { pages: index }, function(data) {
            //console.log(data);
            //第二个参数一定是对象
            // $("$slide_"+index)

            // 把html放到滑动层
            var html = template("list_temp", data);

            if (index == 0) {

                if (!IScroll_0) { //下次再切换过来的时候 不要在创建了 只是用之前创建的那个实例

                    $("#slide_0").find(".content").html(html);
                    IScroll_0 = new MyIsroll("#slide_0", upTag_0);

                };


            } else if (index == 1) {

                if (!IScroll_1) {
                    $("#slide_1").find(".content").html(html);
                    IScroll_1 = new MyIsroll("#slide_1", upTag_1);
                };

            } else if (index == 2) {

                if (!IScroll_2) {
                    $("#slide_2").find(".content").html(html);
                    IScroll_2 = new MyIsroll("#slide_2", upTag_2);
                };

            };

        });
    }




    function MyIsroll(slide, upTag) {
        this.myScroll = null; //
        this.max = null; //记录当前页面最大滚动高度
        this.flag = "";
        this.more = 0; //控制分页
        this.init(slide, upTag); //执行创建真正的isroll
        this.fresh();
    }


    MyIsroll.prototype.init = function(slide, upTag) {
        var _this = this;

        _this.myScroll = new IScroll(slide, {
            probeType: 2
        });

        _this.max = _this.myScroll.maxScrollY;

        _this.myScroll.on('scroll', function() {
            if (this.directionY && !_this.flag && this.y < _this.max - 40) {
                _this.flag = "up";
                upTag.html("释放加载...");
                _this.myScroll.maxScrollY = _this.max - 40;
            } else if (this.directionY == -1 && _this.flag == "up" && this.y > _this.max - 40) {
                _this.flag = "";
                upTag.html("上拉");
                _this.myScroll.maxScrollY = _this.max;
            };
        });

        _this.myScroll.on('scrollEnd', function() {
            if (_this.flag == "up") {
                upTag.html("加载中...");
                fetchMore($(slide), _this.more, function() {
                    upTag.html("上拉");
                    _this.flag = "";
                    _this.myScroll.refresh();
                    _this.max = _this.myScroll.maxScrollY;
                    _this.more++;
                });
            }
        });
    }

    MyIsroll.prototype.fresh = function() {
        setTimeout(function() {
            this.myScroll.refresh();
        }.bind(this), 20)
    }

    function fetchMore($slide, more, callback) {
        $.get('/api/live', { index: more }, function(data) {
            if (data.error == 0) {
                var html = template("list_temp", data);
                $slide.find(".content").append(html);
                callback();
            };
        });
    };


    document.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);
})