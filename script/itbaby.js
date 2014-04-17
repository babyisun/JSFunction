
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
        },
        fn: function () {
            $("#jsf_placeholder").placeholder();
        }
    };

    //执行哪些Demo
    var DemoInit = function () {
        Demo.date();
        Demo.fn();
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