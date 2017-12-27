export const J = {};
class JSF {
    constructor() {
        Function.prototype.fn = function (name, fun) {
            if (!this.prototype[name]) {
                this.prototype[name] = fun;
            }
            return this;
        }
        this.JSF_Date();
        this.JSF_String();
        this.JSF_Array();
    }

    JSF_Date() {
        J.date = function (date) {
            return !date ? new Date() : typeof date == "string" ? new Date(date.replace(/-/g, "\/")) : new Date(date);
        };

        //格式化日期
        //$.date.format("yyyy-MM-dd")
        Date.fn("format", function (fmt) {
            var o = {
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
        });

        Date.fn("addMseconds", function (milliseconds) {
            var m = this.getTime() + milliseconds;
            return new Date(m);
        });

        Date.fn("addSeconds", function (second) {
            return this.addMseconds(second * 1000);
        });

        Date.fn("addMinutes", function (minute) {
            return this.addSeconds(minute * 60);
        });

        Date.fn("addHours", function (hour) {
            return this.addMinutes(60 * hour);
        });

        //加天数
        Date.fn("addDays", function (d) {
            this.setDate(this.getDate() + d);
            return this;
        });

        //加周数
        Date.fn("addWeeks", function (w) {
            return this.addDays(w * 7);
        });

        //加月数
        Date.fn("addMonths", function (m) {
            var d = this.getDate();
            this.setMonth(this.getMonth() + m);
            if (this.getDate() < d)
                this.setDate(0);
            return this;
        });

        //加年数
        Date.fn("addYears", function (y) {
            var m = this.getMonth();
            this.setFullYear(this.getFullYear() + y);
            if (m < this.getMonth()) {
                this.setDate(0);
            }
            return this;
        });

        //星期几
        Date.fn("getWeek", function (type) {
            var i = this.getDay();
            if (!type || type == "周" || type == "星期") {
                var nums = ["日", "一", "二", "三", "四", "五", "六"];
                type = type || "周";
                return type + nums[i];
            } else if (type == "En") {
                var ennmae = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                return ennmae[i];
            } else if (type == "Short") {
                var enshortname = ["Sun.", "Mon.", "Tues.", "Wed.", "Thurs.", "Fri.", "Sat."];
                return enshortname[i];
            }
        });

        //获取周的7日数组
        Date.fn("currentWeek", function () {
            var now = this.getDay(),
                arr = [];
            now = now == 0 ? 7 : now;
            var sunday = this.addDays(-now);
            for (var i = 1; i <= 7; i++) {
                arr.add(new Date(sunday.addDays(1)));
            }
            return arr;
        });

        //获取周岁
        Date.fn("getAge", function () {
            var Age = 0,
                now = J.date(),
                birthYear = this.getFullYear(),
                birthMonth = this.getMonth(),
                birthDay = this.getDate(),
                nowYear = now.getFullYear(),
                nowMonth = now.getMonth(),
                nowDay = now.getDate();

            var ageDiff = nowYear - birthYear;
            if (ageDiff == 0) {
                Age = 0; //同年 则为0岁
            } else {
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
                } else {
                    Age = "未出生"; //返回-1 表示出生日期输入错误 晚于今天
                }
            }
            return Age; //返回周岁年龄
        });

        //是否是闰年
        Date.fn("isLeapYear", function () {
            var year = this.getFullYear();
            return (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0))
        });
        //该月有多少天
        Date.fn("daysInMonth", function () {
            var month = this.getMonth() + 1;
            if (month != 2)
                return ((month <= 7 && month % 2 == 1) || (month > 7 && month % 2 == 0)) ? 31 : 30;
            else return this.isLeapYear() ? 29 : 28;
        });

        //获取日期差
        J.diffDate = (startTime, endTime, diffType) => {
            var timet = {
                day: 86400000,
                hour: 3600000,
                minute: 60000,
                seconds: 1000
            };
            if (typeof startTime == "string")
                startTime = J.date(startTime);
            if (typeof endTime == "string")
                endTime = J.date(endTime);
            diffType = diffType || "day";
            return parseInt((endTime.getTime() - startTime.getTime()) / parseInt(timet[diffType]));
        };
    }

    JSF_String() {
        //替换所有 *当涉及到正则关键字的时候需要特殊处理，如替换“\\|”
        String.fn("replaceAll", function (s1, s2) {
            return this.replace(new RegExp(s1, "gm"), s2);
        });

        //去除前后空格
        String.fn("trim", function () {
            //return this.replace(/(^\s*)|(\s*$)/g, "");
            var _txt = this.replace(/^\s*/, "");
            for (var i = _txt.length - 1; i >= 0; i--) {
                if (/\S/.test(_txt.charAt(i))) {
                    _txt = _txt.substring(0, i + 1);
                    break;
                }
            }
            return _txt;
        });

        // 从左截取指定长度的字串
        String.fn("left", function (n) {
            return this.slice(0, n);
        });
        // 从右截取指定长度的字串
        String.fn("right", function (n) {
            return this.slice(this.length - n);
        });

        //字符串转换时间 &依赖于Date扩展
        String.fn("toDate", function (v) {
            var d = J.date(this);
            if (v)
                return d.format(v);
            return d;
        });

        //判断字符串是否是日期
        String.fn("isDate", function () {
            var r = this.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
            if (r == null)
                return false;
            var d = new Date(r[1], r[3] - 1, r[4]);
            return (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]);
        });
        //日期比较
        String.fn("compareDate", function (v2) {
            if (!this.isDate() || !v2.isDate())
                return false;
            var d1 = new Date(this.replace(/-/g, "\/")),
                d2 = new Date(v2.replace(/-/g, "\/"));
            return (d1 > d2);
        });

        //格式化数字字符串
        String.fn("formatNumber", function () {
            if (!isNaN(+this) && typeof + this == "number") {
                var temp = this.split("."),
                    len = temp[0].length,
                    num = temp[0].split("").reverse(),
                    s1 = [];
                for (var i = 0; i < len; i++) {
                    s1.push(num[i]);
                    if (i % 3 == 2 && i != len - 1)
                        s1.push(",");
                }
                temp[0] = s1.reverse().join("");
                return temp.join(".");
            } else {
                return this;
            }
        });

        //对于数值型也加入科学技术法，但是返回字符串
        Number.fn("formatNumber", function () {
            var _this = "" + this;
            var temp = _this.split("."),
                len = temp[0].length,
                num = temp[0].split("").reverse(),
                s1 = [];
            for (var i = 0; i < len; i++) {
                s1.push(num[i]);
                if (i % 3 == 2 && i != len - 1)
                    s1.push(",");
            }
            temp[0] = s1.reverse().join("");
            return temp.join(".");
        });

        // HTML编码
        String.fn("htmlEncode", function () {
            var t = document.createElement("div");
            (t.textContent != null) ? (t.textContent = this) : (t.innerText = this);
            var o = t.innerHTML;
            t = null;
            return o;
        });
        // HTML反编码
        String.fn("htmlDecode", function () {
            var t = document.createElement("div");
            t.innerHTML = this;
            var o = t.innerText || t.textContent;
            t = null;
            return o;
        });
    }

    JSF_Array() {
        //Add方法
        Array.fn("add", function (item) {
            this.push(item);
            return this;
        });

        //Add集合
        Array.fn("addRange", function (items) {
            var length = items.length;
            if (length) {
                for (var index = 0; index < length; index++) {
                    this.push(items[index]);
                }
            }
            return this;
        });


        Array.fn("forEach", function (callback, thisArg) {
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
        });


        //清空
        Array.fn("clear", function () {
            if (this.length > 0) {
                this.splice(0, this.length);
            }
            return this;
        });

        //判断是否为空
        Array.fn("isEmpty", function () {
            return this.length == 0;
        });

        //获取项目索引
        Array.fn("indexOf", function (item) {
            var length = this.length;
            if (length != 0) {
                for (var index = 0; index < length; index++) {
                    if (this[index] == item) {
                        return index;
                    }
                }
            }
            return -1;
        });

        //判断项是否在数组中
        Array.fn("contains", function (item) {
            var index = this.indexOf(item);
            return (index >= 0);
        });


        //插入项
        Array.fn("insert", function (index, item) {
            return this.splice(index, 0, item);
        });

        //出队
        Array.fn("dequeue", function () {
            return this.shift();
        });

        //通过项目删除某项
        Array.fn("remove", function (item) {
            var index = this.indexOf(item);
            if (index >= 0) {
                this.splice(index, 1);
            }
            return this;
        });

        //通过索引删除某项
        Array.fn("removeAt", function (index) {
            this.splice(index, 1);
            return this;
        });

        Array.fn("reverse", function () {
            var retVal = new Array(),
                len = this.length;
            for (var i = len - 1; i > -1; i--)
                retVal[retVal.length] = this[i];
            return retVal;
        });

        Array.fn("skip", function (count) {
            var len = this.length,
                newArray = new Array();
            for (var i = count; i < len; i++) {
                if (i < len) {
                    newArray[newArray.length] = this[i];
                }
            }
            return newArray;
        });

        Array.fn("take", function (count) {
            var len = this.length,
                newArray = new Array();
            for (var i = 0; i < count; i++) {
                if (i < len) {
                    newArray[newArray.length] = this[i];
                }
            }
            return newArray;
        });
        //Linq
        //条件查询
        Array.fn("where", function (clause) {
            if (!clause)
                return this;
            var len = this.length,
                newArray = new Array();
            for (var i = 0; i < len; i++) {
                if (clause(this[i], i)) {
                    newArray[newArray.length] = this[i];
                }
            }
            return newArray;
        });

        Array.fn("joinKey", function (key) {
            var len = this.length,
                newArray = new Array();
            if (key) {
                for (var i = 0; i < len; i++) {
                    var item = this[i][key];
                    if (item) {
                        newArray[newArray.length] = item;
                    }
                }
            }
            return newArray;
        });

        Array.fn("removeByKey", function (key, arr) {
            if (key && arr && arr.length) {
                return this.where(function (item, index) {
                    return !arr.contains(item[key]);
                });
            }
            return this;
        });

        Array.fn("first", function (clause) {
            var len = this.length;
            if (clause != null) {
                return this.where(clause).first();
            } else {
                if (len > 0)
                    return this[0];
                else
                    return null;
            }
        });

        Array.fn("last", function (clause) {
            var len = this.length;
            if (clause != null) {
                return this.where(clause).last();
            } else {
                if (len > 0)
                    return this[len - 1];
                else
                    return null;
            }
        });

        Array.fn("any", function (clause) {
            var len = this.length;
            for (var i = 0; i < len; i++) {
                if (clause(this[i], i)) {
                    return true;
                }
            }
            return false;
        });

        Array.fn("all", function (clause) {
            var len = this.length;
            for (var i = 0; i < len; i++) {
                if (!clause(this[i], i)) {
                    return false;
                }
            }
            return true;
        });

        Array.fn("count", function (clause) {
            if (clause == null)
                return this.length;
            else
                return this.where(clause).length;
        });

        Array.fn("orderBy", function (clause) {
            var len = this.length,
                tempArray = new Array();
            for (var i = 0; i < len; i++) {
                tempArray[tempArray.length] = this[i];
            }
            tempArray.sort(function (a, b) {
                var x = clause(a);
                var y = clause(b);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            return tempArray;
        });

        Array.fn("orderByDescending", function (clause) {
            var len = this.length,
                tempArray = new Array();
            for (var i = 0; i < len; i++) {
                tempArray[tempArray.length] = this[i];
            }
            tempArray.sort(function (a, b) {
                var x = clause(b);
                var y = clause(a);
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            });
            return tempArray;
        });

        Array.fn("max", function (clause) {
            var maxValue, len = this.length,
                item = this[0];
            if (len == 0)
                return null;
            if (len == 1)
                return item;
            maxValue = clause(item, 0);
            for (var i = 1; i < len; i++) {
                var temp = clause(this[i], i);
                if (maxValue < temp) {
                    maxValue = temp;
                    item = this[i];
                }
            }
            return item;
        });
        Array.fn("min", function (clause) {
            var minValue, len = this.length,
                item = this[0];
            if (len == 0)
                return null;
            if (len == 1)
                return item;
            minValue = clause(item, 0);
            for (var i = 1; i < len; i++) {
                var temp = clause(this[i], i);
                if (minValue > temp) {
                    minValue = temp;
                    item = this[i];
                }
            }
            return item;
        });

        Array.fn("sum", function (clause) {
            var sumValue = 0,
                len = this.length,
                item = this[0];
            for (var i = 0; i < len; i++) {
                var temp = clause(this[i], i);
                if (/[^\d]/.test(temp)) {
                    throw new TypeError("类型错误");
                    return 0;
                }
                sumValue += temp;
            }
            return sumValue;
        });

        //复杂数组对象去重
        Array.fn("distinct", function (clause) {
            var len = this.length;
            if (len < 2) return this;
            var dict = new Object(),
                retVal = new Array();
            //递归鸭子检测
            var _duckCheckObj = function (obj) {
                var v = "";
                if (typeof obj == "object") {
                    for (var o in obj) {
                        if (typeof obj[o] == "object") {
                            v += _duckCheckObj(obj[o]);
                        } else {
                            v += o + obj[o];
                        }
                    }
                } else
                    v = obj;
                return v;
            };
            if (!clause) clause = function (item) {
                return item;
            };
            for (var i = 0; i < len; i++) {
                var arrobj = this[i],
                    arrkey = clause(arrobj),
                    key = _duckCheckObj(arrkey);
                if (dict[key] == null) {
                    dict[key] = true;
                    retVal[retVal.length] = arrobj;
                }
            }
            dict = null;
            return retVal;
        });

        //深度克隆
        Array.fn("clone", function () {
            var _duckclone = function (obj) {
                var v = new Object();
                if (typeof obj == "object") {
                    for (var o in obj) {
                        if (typeof obj[o] == "object" && obj[o] != null) {
                            v[o] = _duckclone(obj[o]);
                        } else {
                            v[o] = obj[o];
                        }
                    }
                } else
                    v = obj;
                return v;
            };
            var clonearr = new Array(),
                len = this.length;
            for (var i = 0; i < len; i++) {
                var item = this[i];
                if (typeof item == "object") {
                    item = _duckclone(item);
                    clonearr.push(item);
                } else
                    clonearr.push(item);
            }
            return clonearr;
        });
    }
}
new JSF();