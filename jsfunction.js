/*
 * source   : jsfunction.js
 * Version  : beta 1.0
 * depends  : Jquery 1.4+
 * Download : http://www.itbbb.com/jsfunction/jsfunction.js
 *
 * Author   : baby
 * Blog     : http://www.itbbb.com
 * Wechat   : ITbeibei
 * Email    : babyisun@qq.com
 *
 * create   : 2014/03/29
 * update   : 2014/04/19
 *
 * message  : 如果发现任何bug、需要完善的代码，请发邮件或通过微信联系我，我很高兴与大家一起整理优雅的代码.
**/
if (typeof jQuery === 'undefined') { throw new Error('JSFunction requires jQuery 1.4+') }
$.extend({ JSFunction: { version: 1.0, author: "baby" } });
window.JSF = $.JSFunction;

/*Cookie*/
+function ($) {
    'use strict';//严格模式

    var cookie = {
        get: function (name) {
            var cookieValue = "";
            var search = name + "=";
            if (document.cookie.length > 0) {
                var offset = document.cookie.indexOf(search), end;
                if (offset != -1) {
                    offset += search.length;
                    end = document.cookie.indexOf(";", offset);
                    if (end == -1)
                        end = document.cookie.length;
                    cookieValue = unescape(document.cookie.substring(offset, end));
                }
            }
            return cookieValue;
        },
        set: function (name, value, time, timetype, domain) {
            var expire = "", dm = "", timet = { day: 86400000, hour: 3600000, minute: 60000, seconds: 1000 };
            if (time) {
                if (!timetype) timetype = "hour";
                expire = new Date((new Date()).getTime() + time * timet[timetype]);
                expire = "; expires=" + expire.toGMTString();
            }
            if (domain) {
                dm = "; domain=" + domain;
            }
            document.cookie = name + "=" + escape(value) + expire + ";path=/" + dm;
        },
        remove: function (name) {
            this.set(name, null, -1);
        }
    };

    window.JSF.cookie = $.cookie = cookie;

}(jQuery);

/*Browser*/
+function ($) {
    'use strict';

    var browser = { webkit: false, /*opera: false,*/ msie: false, mozilla: false },
        ua = window.navigator.userAgent.toLowerCase();
    if (!$.browser) {
        // Useragent RegExp
        var rwebkit = /(webkit)[ \/]([\w.]+)/,
        /*ropera = /(opera)(?:.*version)?[ \/]([\w.]+)/,*/
        rmsie = /(msie) ([\w.]+)/,
        rmozilla = /(mozilla)(?:.*? rv:([\w.]+))?/,
        uaMatch = function () {
            var match = rwebkit.exec(ua) ||
                /*ropera.exec(ua) ||*/
                rmsie.exec(ua) ||
                ua.indexOf("compatible") < 0 && rmozilla.exec(ua) ||
                [];
            return { browser: match[1] || "", version: match[2] || "0" };
        },
        browserMatch = uaMatch();
        if (browserMatch.browser) {
            //对ie11做出的修正
            if (browserMatch.browser == "mozilla" && (!!window.ActiveXObject || "ActiveXObject" in window)) {
                browser["msie"] = true;
            }
            else
                browser[browserMatch.browser] = true;
            browser.version = browserMatch.version;
        }
    }
    else {
        browser = $.browser;
    }

    browser.ie6 = browser.msie && (browser.version == "6.0");
    browser.mobile = ua.match(/ipad/i) == "ipad"
         || ua.match(/iphone os/i) == "iphone os"
         || ua.match(/midp/i) == "midp"
         || ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4"
         || ua.match(/ucweb/i) == "ucweb"
         || ua.match(/android/i) == "android"
         || ua.match(/windows ce/i) == "windows ce"
         || ua.match(/windows mobile/i) == "windows mobile";

    window.JSF.browser = $.browser = browser;
}(jQuery);

/*Date*/
+function ($) {
    'use strict';//严格模式

    //初始化时间
    $.date = function (date) {
        return !date ? new Date() : new Date(date.replace(/-/g, "\/"));
    };
    //格式化日期
    //$.date.Format("yyyy-MM-dd")
    Date.prototype.format = function (fmt) {
        var o =
        {
            "M+": this.getMonth() + 1, //月份 
            "d+": this.getDate(), //日 
            "h+": this.getHours(), //小时 
            "m+": this.getMinutes(), //分 
            "s+": this.getSeconds(), //秒 
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
            "S": this.getMilliseconds() //毫秒 
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    }

    Date.prototype.addMseconds = function (milliseconds) {
        var m = this.getTime() + milliseconds;
        return new Date(m);
    };
    Date.prototype.addSeconds = function (second) {
        return this.addMseconds(second * 1000);
    };
    Date.prototype.addMinutes = function (minute) {
        return this.addSeconds(minute * 60);
    };

    Date.prototype.addHours = function (hour) {
        return this.addMinutes(60 * hour);
    };

    //加天数
    Date.prototype.addDays = function (d) {
        return this.setDate(this.getDate() + d);
    };

    //加周数
    Date.prototype.addWeeks = function (w) {
        return this.addDays(w * 7);

    };

    //加月数
    Date.prototype.addMonths = function (m) {
        var d = this.getDate();
        this.setMonth(this.getMonth() + m);
        if (this.getDate() < d)
            this.setDate(0);
        return this;
    };

    //加年数
    Date.prototype.addYears = function (y) {
        var m = this.getMonth();
        this.setFullYear(this.getFullYear() + y);
        if (m < this.getMonth()) {
            this.setDate(0);
        }
        return this;
    };

    //星期几
    Date.prototype.getWeek = function (type) {
        var i = this.getDay();
        if (!type || type == "周" || type == "星期") {
            var nums = ["日", "一", "二", "三", "四", "五", "六"];
            type = type || "周";
            return type + nums[i];
        }
        else if (type == "En") {
            var ennmae = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return ennmae[i];
        }
        else if (type == "Short") {
            var enshortname = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
            return enshortname[i];
        }
    }

    //获取周岁
    Date.prototype.getAge = function () {
        var Age = 0,
        now = $.date(),
        birthYear = this.getFullYear(),
        birthMonth = this.getMonth(),
        birthDay = this.getDate(),
        nowYear = now.getFullYear(),
        nowMonth = now.getMonth(),
        nowDay = now.getDate();

        var ageDiff = nowYear - birthYear;
        if (ageDiff == 0) {
            Age = 0;//同年 则为0岁
        }
        else {
            if (ageDiff > 0) {
                var monthDiff = nowMonth - birthMonth;
                if (monthDiff == 0) {
                    if ((nowDay - birthDay) < 0)
                        Age = ageDiff - 1;
                    else
                        Age = ageDiff;
                } else {
                    if (monthDiff < 0)
                        Age = ageDiff - 1;
                    else
                        Age = ageDiff;
                }
            }
            else {
                Age = "未出生";//返回-1 表示出生日期输入错误 晚于今天
            }
        }
        return Age;//返回周岁年龄
    }

    //是否是闰年
    Date.prototype.isLeapYear = function () {
        var year = this.getFullYear();
        return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
    };
    //该月有多少天
    Date.prototype.daysInMonth = function () {
        var month = this.getMonth() + 1;
        if (month != 2)
            return ((month <= 7 && month % 2 == 1) || (month > 7 && month % 2 == 0)) ? 31 : 30;
        else return this.isLeapYear() ? 29 : 28;
    };

    //获取日期差
    $.diffDate = function (startTime, endTime, diffType) {
        var timet = { day: 86400000, hour: 3600000, minute: 60000, seconds: 1000 };
        if (typeof startTime == "string")
            startTime = $.date(startTime);
        if (typeof endTime == "string")
            endTime = $.date(endTime);
        diffType = diffType || "day";
        return parseInt((endTime.getTime() - startTime.getTime()) / parseInt(timet[diffType]));
    };
}(jQuery);

/*String*/
+function ($) {
    'use strict';

    //替换所有
    String.prototype.replaceAll = function (s1, s2) {
        return this.replace(new RegExp(s1, "gm"), s2);
    };

    //去除前后空格
    String.prototype.trim = function () {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };

    // 从左截取指定长度的字串 
    String.prototype.left = function (n) {
        return this.slice(0, n);
    }
    // 从右截取指定长度的字串 
    String.prototype.right = function (n) {
        return this.slice(this.length - n);
    }

    //字符串转换时间 &依赖于Date扩展
    String.prototype.toDate = function (v) {
        var d = $.date(this);
        if (v)
            return d.format(v);
        return d;
    };

    // HTML编码 
    String.prototype.htmlEncode = function () {
        var t = document.createElement("div");
        (t.textContent != null) ? (t.textContent = this) : (t.innerText = this);
        var o = t.innerHTML;
        t = null;
        return o;
    }
    // HTML反编码
    String.prototype.htmlDecode = function () {
        var t = document.createElement("div");
        t.innerHTML = this;
        var o = t.innerText || t.textContent;
        t = null;
        return o;
    }

}(jQuery);

/*Array*/
+function ($) {
    'use strict';

    //Add方法
    Array.prototype.add = function (item) {
        this.push(item);
        return this;
    };

    //Add集合
    Array.prototype.addRange = function (items) {
        var length = items.length;
        if (length) {
            for (var index = 0; index < length; index++) {
                this.push(items[index]);
            }
        }
        return this;
    };

    //ie6没有forEach
    if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (callback, thisArg) {
            var T, k;
            if (this == null) {
                throw new TypeError(" this is null or not defined");
            }
            var O = Object(this);
            var len = O.length >>> 0;
            if ({}.toString.call(callback) != "[object Function]") {
                throw new TypeError(callback + " is not a function");
            }
            if (thisArg) {
                T = thisArg;
            }
            k = 0;
            while (k < len) {
                var kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        };
    }

    //清空
    Array.prototype.clear = function () {
        if (this.length > 0) {
            this.splice(0, this.length);
        }
        return this;
    };

    //判断是否为空
    Array.prototype.isEmpty = function () {
        return this.length == 0;
    };

    //ie6没有数组的indexOf
    if (!Array.prototype.indexOf) {
        //获取项目索引
        Array.prototype.indexOf = function (item) {
            var length = this.length;
            if (length != 0) {
                for (var index = 0; index < length; index++) {
                    if (this[index] == item) {
                        return index;
                    }
                }
            }
            return -1;
        };
    }

    //判断项是否在数组中
    Array.prototype.contains = function (item) {
        var index = this.indexOf(item);
        return (index >= 0);
    };


    //插入项
    Array.prototype.insert = function (index, item) {
        return this.splice(index, 0, item);
    };

    //出队
    Array.prototype.dequeue = function () {
        return this.shift();
    };

    //通过项目删除某项
    Array.prototype.remove = function (item) {
        var index = this.indexOf(item);
        if (index >= 0) {
            this.splice(index, 1);
        }
        return this;
    };

    //通过索引删除某项
    Array.prototype.removeAt = function (index) {
        this.splice(index, 1);
        return this;
    };

    Array.prototype.reverse = function () {
        var retVal = new Array(), len = this.length;
        for (var i = len - 1; i > -1; i--)
            retVal[retVal.length] = this[i];
        return retVal;
    }
    Array.prototype.skip = function (count) {
        var len = this.length, newArray = new Array();
        for (var i = count; i < len; i++) {
            if (i < len) {
                newArray[newArray.length] = this[i];
            }
        }
        return newArray;
    };

    Array.prototype.take = function (count) {
        var len = this.length, newArray = new Array();
        for (var i = 0; i < count; i++) {
            if (i < len) {
                newArray[newArray.length] = this[i];
            }
        }
        return newArray;
    };
    //Linq
    //条件查询
    Array.prototype.where = function (clause) {
        if (!clause)
            return this;
        var len = this.length, newArray = new Array();
        for (var i = 0; i < len; i++) {
            if (clause(this[i], i)) {
                newArray[newArray.length] = this[i];
            }
        }
        return newArray;
    };

    Array.prototype.first = function (clause) {
        var len = this.length;
        if (clause != null) {
            return this.where(clause).first();
        }
        else {
            if (len > 0)
                return this[0];
            else
                return null;
        }
    };
    Array.prototype.last = function (clause) {
        var len = this.length;
        if (clause != null) {
            return this.where(clause).last();
        }
        else {
            if (len > 0)
                return this[len - 1];
            else
                return null;
        }
    };

    Array.prototype.any = function (clause) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            if (clause(this[i], i)) { return true; }
        }
        return false;
    };
    Array.prototype.all = function (clause) {
        var len = this.length;
        for (var i = 0; i < len; i++) {
            if (!clause(this[i], i)) { return false; }
        }
        return true;
    };

    Array.prototype.count = function (clause) {
        if (clause == null)
            return this.length;
        else
            return this.where(clause).length;
    };

    Array.prototype.orderBy = function (clause) {
        var len = this.length, tempArray = new Array();
        for (var i = 0; i < len; i++) {
            tempArray[tempArray.length] = this[i];
        }
        tempArray.sort(function (a, b) {
            var x = clause(a);
            var y = clause(b);
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        return tempArray;
    };
    Array.prototype.orderByDescending = function (clause) {
        var len = this.length, tempArray = new Array();
        for (var i = 0; i < len; i++) {
            tempArray[tempArray.length] = this[i];
        }
        tempArray.sort(function (a, b) {
            var x = clause(b);
            var y = clause(a);
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        return tempArray;
    };
    Array.prototype.max = function (clause) {
        var maxValue, len = this.length, item = this[0];
        if (len == 0)
            return null;
        if (len == 1)
            return item;
        maxValue = clause(item, 0);
        for (var i = 1; i < len; i++) {
            var temp = clause(this[i], i);
            if (maxValue < temp) {
                //maxValue = temp;
                item = this[i];
            }
        }
        return item;
    };
    Array.prototype.min = function (clause) {
        var minValue, len = this.length, item = this[0];
        if (len == 0)
            return null;
        if (len == 1)
            return item;
        minValue = clause(item, 0);
        for (var i = 1; i < len; i++) {
            var temp = clause(this[i], i);
            if (minValue > temp) {
                //maxValue = temp;
                item = this[i];
            }
        }
        return item;
    };
    Array.prototype.sum = function (clause) {
        var sumValue = 0, len = this.length, item = this[0];
        for (var i = 0; i < len; i++) {
            var temp = clause(this[i], i);
            if (/[^\d]/.test(temp)) {
                throw new TypeError("类型错误");
                return 0;
            }
            sumValue += temp;
        }
        return sumValue;
    };




    //复杂数组对象去重
    Array.prototype.distinct = function (clause) {
        var len = this.length;
        if (len < 2) return this;
        var dict = new Object(), retVal = new Array();
        //递归鸭子检测
        var _duckCheckObj = function (obj) {
            var v = "";
            if (typeof obj == "object") {
                for (var o in obj) {
                    if (typeof obj[o] == "object") {
                        v += _duckCheckObj(obj[o]);
                    }
                    else { v += o + obj[o]; }
                }
            }
            else
                v = obj;
            return v;
        };
        if (!clause) clause = function (item) { return item; };
        for (var i = 0; i < len; i++) {
            var arrobj = this[i], arrkey = clause(arrobj), key = _duckCheckObj(arrkey);
            if (dict[key] == null) {
                dict[key] = true;
                retVal[retVal.length] = arrobj;
            }
        }
        dict = null;
        return retVal;
    };

    //深度克隆
    Array.prototype.clone = function () {
        var _duckclone = function (obj) {
            var v = new Object();
            if (typeof obj == "object") {
                for (var o in obj) {
                    if (typeof obj[o] == "object" && obj[o] != null) {
                        v[o] = _duckclone(obj[o]);
                    }
                    else { v[o] = obj[o]; }
                }
            }
            else
                v = obj;
            return v;
        };
        var clonearr = new Array(), len = this.length;
        for (var i = 0; i < len; i++) {
            var item = this[i];
            if (typeof item == "object") {
                item = _duckclone(item);
                clonearr.push(item);
            }
            else
                clonearr.push(item);
        }
        return clonearr;
    };


}(jQuery);

/*Url*/
+function ($) {
    'use strict';

    var url = {
        getArgs: function () {
            var args = new Object(),
            query = location.search.substring(1),
            pairs = query.split("&"),
            plength = pairs.length;
            for (var i = 0; i < plength; i++) {
                var pos = pairs[i].indexOf('=');
                if (pos == -1) continue;
                var argname = pairs[i].substring(0, pos),
                value = pairs[i].substring(pos + 1);
                value = decodeURIComponent(value);
                args[argname] = value;
            }
            return args;
        },
        parse: function (url) { //# 解析URL
            var a = document.createElement('a');
            url = url || document.location.href;
            a.href = url;
            return {
                source: url
                , protocol: a.protocol.replace(':', '')
                , host: a.hostname
                , port: a.port
                , query: a.search
                , file: (a.pathname.match(/([^\/?#]+)$/i) || [, ''])[1]
                , hash: a.hash.replace('#', '')
                , path: a.pathname.replace(/^([^\/])/, '/$1')
                , relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1]
                , segments: a.pathname.replace(/^\//, '').split('/')
            };
        },
        open: function (url) {
            var linkObj = $("#open_instead_Link");
            if (!linkObj.length) {
                //linkObj = $("<a id='open_instead_Link' href='javascript:;' target='_blank' onClick='window.open(this.href); return false;' ></a> ").appendTo("body");
                linkObj = $("<form id='open_instead_Link' action='this.href' target='_blank'></form> ").appendTo("body");
            }
            //linkObj.attr("href", url).trigger('click');
            $("body").one("mouseover", function () {
                linkObj.attr("action", url).submit();
            });
        }
    }

    window.JSF.url = $.url = url;
}(jQuery);

/*Jquery fn*/
+function ($) {
    'use strict';

    /**
     * 格式化form表单
     * $(formid).getFormData()
     */
    $.fn.getFormData = function () {
        var inputs = $(this).find("input,select,textarea");
        var data = "", txt, type, name, read, i = 0;
        for (; i < inputs.length; i++) {
            type = inputs[i].type;
            read = inputs[i].getAttribute("data-read");
            if (type == "button"
                        || type == "submit"
                        || type == "image"
                        || type == "reset"
                        || read == "ignore")
                continue;
            name = inputs[i].name;
            if (data != "" && data.substring(data.length - 1, data.length) != "&") {
                data += "&";
            }
            if (type == "radio" || type == "checkbox") {
                if (txt != name) {
                    txt = name;
                    var cval = "";
                    if (type == "radio") {
                        cval = $("input:radio[name='" + name + "']:checked").val();
                        data += name + "=" + (cval ? encodeURIComponent(cval) : "");
                    } else {
                        $("[name=" + name + "]:checked").each(function () {
                            cval += $(this).val() + ",";
                        });
                        data += name + "=" + (cval ? cval.substring(0, cval.length - 1) : "");
                    }
                }
            }
            else {
                data += name + "=" + encodeURIComponent(inputs[i].value);
            }
        }
        return data;
    };

    /**
    * 让ie支持placeholder
    * $("input").placeholder();
    */
    $.fn.placeholder = function (options) {
        if ("placeholder" in document.createElement("input")) {
            return this; //如果原生支持placeholder属性，则返回对象本身
        } else {
            var _fun = function (placeholder, val) {
                if (val)
                    placeholder.css({ display: 'none' });
                else
                    placeholder.css({ display: 'inline' });
            };
            return this.each(function () {
                var input = $(this), text = input.attr('placeholder');
                if (!text) return;
                var pdl = 5, height = input.outerHeight(), width = input.outerWidth(),
                    placeholder = $('<span class="jsf_placeholder">' + text + '</span>'),
                    pdlcss = input.css('padding-left');
                if (pdlcss) {
                    pdl = pdlcss.match(/\d*/i)[0] * 1;
                }
                //try {
                //    pdl = input.css('padding-left').match(/\d*/i)[0] * 1;
                //} catch (e) {
                //    pdl = 5;
                //}
                var _default = {
                    'margin-left': -(width - pdl),
                    'height': height,
                    'line-height': height + "px",
                    'position': 'absolute',
                    'color': "#cecfc9",
                    'font-size': "12px"
                };

                options = $.extend(_default, options);

                placeholder.css(options).click(function () {
                    input.focus();
                });
                _fun(placeholder, input.val());
                placeholder.insertAfter(input);
                input.keyup(function (e) {
                    _fun(placeholder, $(this).val());
                }).blur(function () {
                    _fun(placeholder, $(this).val());
                });
            });
        }
    };
}(jQuery);