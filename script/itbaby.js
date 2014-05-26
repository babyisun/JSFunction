
$(function () {
    //加网
    var jiathis_config = { data_track_clickback: 'true' };

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
        fn: function () {
            $("#jsf_placeholder").placeholder();
        }
        //url: function () {
        //    $("#demo_addfav").click(function () {
        //        $.url.addFav();
        //    });

        //    $("#demo_additbbb").click(function () {
        //        $.url.addFav("www.itbbb.com", "IT北北报", function () { alert("该浏览器需要手动添加到收藏夹");});
        //    });
        //}
    };

    //执行哪些Demo
    var DemoInit = function () {
        Demo.date();
        Demo.fn();
        //Demo.url();
    };

    DemoInit();

    //调用hljs
    try {
        hljs.initHighlightingOnLoad();
    }
    catch (e) {
        //throw new TypeError("hljs need ie8+");
    }
});