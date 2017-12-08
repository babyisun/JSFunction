/*Jquery fn*/
+function ($) {
    'use strict';

    /**
     * 抓取form表单数据
     * $(form).getFormData()
     */
    $.fn.getFormData = function () {
        var inputs = $(this).find("input,select,textarea");
        var data = "",
            txt, type, name, read, i = 0;
        for (; i < inputs.length; i++) {
            type = inputs[i].type;
            read = inputs[i].getAttribute("data-read");
            if (type == "button" || type == "submit" || type == "image" || type == "reset" || read == "ignore")
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
                        $("[name='" + name + "']:checked").each(function () {
                            cval += $(this).val() + ",";
                        });
                        data += name + "=" + (cval ? cval.substring(0, cval.length - 1) : "");
                    }
                }
            } else {
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
                    placeholder.css({
                        display: 'none'
                    });
                else
                    placeholder.css({
                        display: 'inline'
                    });
            };
            return this.each(function () {
                var input = $(this),
                    text = input.attr('placeholder');
                if (!text) return;
                var pdl = 5,
                    height = input.outerHeight(),
                    width = input.outerWidth(),
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