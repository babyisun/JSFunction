$(function () {
    //加网
    var jiathis_config = {
        data_track_clickback: 'true'
    };

    //Demo
    var Demo = {
        date: function () {
            $("#demo-date").html($.date() + "<br>" + $.date("2014-1-1"));
            $("#demo-date-format").html($.date().format("yyyy-MM-dd hh:mm:ss") + "<br>" + $.date("2014-1-1").format("yyyy-MM-dd"));
            $("#demo-getAge").html($.date("2001-1-4").getAge());
            $("#demo-diffDate").html($.diffDate($.date(), $.date("2013-1-1")) + "<br>" + $.diffDate("2013-1-2", "2013-1-3", "hour"));

            var djs = $("#demo-countDown");
            var _fdjs = function () {
                $.countDown({
                    second: 30,
                    //startTime: $.date("2014-6-1 10:00:00"),
                    //endTime: $.date("2014-6-1 10:00:05"),
                    started: function () {
                        djs.attr("disabled", "disabled");
                    },
                    timed: function (times) {
                        djs.html("重新发送(" + times.seconds + ")");
                    },
                    finaled: function () {
                        djs.html("重新发送").removeAttr("disabled");
                    }
                });
            };
            djs.click(function () {
                _fdjs();
            });
        },
        local: function () {
            var LOCALDATA_KEY = "LOCALDATA_KEY",
                $setlocaldata = $("#demo-setlocaldata");
            $setlocaldata.val($.localData.get(LOCALDATA_KEY));
            $setlocaldata.keyup(function () {
                $.localData.set(LOCALDATA_KEY, this.value);
            });
            $("#demo-clearlocaldata").click(function () {
                $.localData.remove(LOCALDATA_KEY);
                $setlocaldata.val("");
            });
        },
        fn: function () {
            //$("#jsf_placeholder").placeholder();
        }
    };
    var Event = function () {
        //调用hljs
        try {
            hljs.initHighlightingOnLoad();
        } catch (e) {
            //throw new TypeError("hljs need ie8+");
        }

        //返回顶部
        var gotop = $("#gotop");

        $(window).bind("scroll", function () {
            var _this = $(this),
                st = _this.scrollTop();
            if (st > 500)
                gotop.show();
            else
                gotop.hide();
        });
        gotop.click(function () {
            $('html,body').animate({
                scrollTop: 0
            }, 500);
        });

        var affixChanged = function (offsetTop) {
            if (location.hash) {
                var target = $(location.hash),
                    _offsetTop = 50 || offsetTop;
                if (target.length) {
                    var top = target.offset().top - _offsetTop;
                    if (top > 0) {
                        $('html,body').animate({
                            scrollTop: top
                        }, 500);
                    }
                }
            }
        }

        var mobileBar = $(".mobile-bar");
        mobileBar.height($(window).height() - 100);
        mobileBar.find("li li").click(function () {
            $(".bs-navbar-collapse").collapse("hide");
        });

        //移动端下拉菜单
        // if($.browser.mobile){
        //     var mobileBar=$(".mobile-bar");
        //     mobileBar.height($(window).height()-100);
        //     mobileBar.find("li>ul>li>a").click(function(){
        //         affixChanged();
        //     });
        //     mobileBar.find("li li").click(function(){
        //         $(".bs-navbar-collapse").collapse("hide");
        //     });
        // }else{
        //     var pcBar=$(".bs-docs-sidenav");
        //     pcBar.find("li a").click(function(){
        //         affixChanged();
        //     });
        // }

        window.onhashchange = function (e) {
            affixChanged();
        };

    };

    //执行哪些Demo
    var DemoInit = function () {
        Demo.date();
        Demo.fn();
        //Demo.url();
        Demo.local();
    };

    DemoInit();

    Event();
});