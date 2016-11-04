;(function (name, context, definition) {
    if (typeof module !== 'undefined' && module.exports) { module.exports = definition(); }
    else if (typeof define === 'function' && define.amd) { define(definition); }
    else { context[name] = definition(); }
})('AddToHomeScreen', this, function () {
    'use strict';
    function setCookie(name,value) {
        var Days = 365;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days*24*60*60*1000);
        document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
    }
    function getCookie(name) {
        var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
        if(arr=document.cookie.match(reg))
            return unescape(arr[2]);
        else
            return null;
    }
    var AddToHomeScreen = function (options) {
        this.options = $.extend({
            useCookie : true,
            name : 'HELLO'
        },options);
        var _self = this;
        this._browser = {
            versions:function(){
                var u = navigator.userAgent, app = navigator.appVersion;
                return {         //移动终端浏览器版本信息
                    trident: u.indexOf('Trident') > -1, //IE内核
                    presto: u.indexOf('Presto') > -1, //opera内核
                    webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                    gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                    mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                    ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                    android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
                    iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
                    iPad: u.indexOf('iPad') > -1, //是否iPad
                    webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
                };
            }(),
            language:(navigator.browserLanguage || navigator.language).toLowerCase()
        },
        this.hide = function() {
            $("#guider_container").hide();
            if (this.options.useCookie) {
                setCookie("add_to_home_hide","true");
            }
        }
        this.buildContainer = function () {
            var con = "<div id='guider_container' style=''>";
            if (this._browser.versions.android) {
                con += "<div id='guider_item' style='position: absolute;right: 8px;top: 15px;z-index:9999;border-radius:3px;width:290px;height:auto;" +
                "background-color:white;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);'>" +
                "<div id='guider_close' style='width: 24px;height: 24px;position: absolute;right: 16px;top: 16px;" +
                "background:url(images/guider_icons.png) no-repeat;background-size:80px;background-position:4px -260px;'></div>" +
                "<div style='border: 8px transparent solid;border-bottom: 12px solid white;width: 0;height: 0;position: absolute;right: 14px;top: -19px;'></div>" +
                "<img src='images/add_logo.jpg' style='width: 56px;height: 56px;margin: 15px auto 0px auto;display: block;'/>" +
                "<div style='padding: 22px;'>Add " + this.options.name + " to your Home screen. Open the options menu " +
                "<span style='width: 24px;height: 12px;padding:4px 12px;background:url(images/guider_icons.png) no-repeat;background-size:80px;background-position:4px -207px;'></span>" +
                "and Select Add to Home Screen</div>" +
                "</div>";
            } else {
                con = "<div id='guider_container'>";
                con += "<div id='guider_item' style='position: absolute;left: 50%;margin-left:-150px;bottom: 15px;z-index:9999;border-radius:3px;width:300px;height:auto;" +
                "background-color:white;box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.5);'>" +
                "<div id='guider_close' style='width: 24px;height: 24px;position: absolute;right: -8px;top: -10px;" +
                "background:url(images/guider_icons.png) no-repeat;background-size:80px;background-position:0px -282px;'></div>" +
                "<div style='border: 8px transparent solid;border-top: 12px solid white;width: 0;height: 0;position: absolute;left: 50%;bottom: -19px;'></div>" +
                "<img src='images/add_logo.jpg' style='width: 40px;height: 40px;margin: 15px;display: block;float: left;'/>" +
                "<div style='padding: 16px 0px 12px 0px;float: left;width: 226px;font-size: 12px;'>" +
                "<div>Click <span style='width: 24px;height: 12px;padding:4px 12px;background:url(images/guider_icons.png) no-repeat;background-size:80px;background-position:3px -103px;'></span> First</div>" +
                "<div style='margin-top: 2px;'>And then <span style='font-weight: bold;'>Add to Home Screen &nbsp;</span>" +
                "<span style='padding: 4px 10px;width: 20px;height: 20px;background:url(images/guider_icons.png) no-repeat;background-size:80px;background-position:0px -125px;'></span></div>" +
                "</div></div></div>";
            }
            con += "</div>";
            $(con).appendTo($("body"));
            $("#guider_close").bind("click", function(event) {
                _self.hide();
                event.stopPropagation();
                event.preventDefault();
                return false;
            });
        };
    };
    AddToHomeScreen.prototype = {
        show: function() {
            if ($("#guider_container").length == 1) {
                $("#guider_container").show();
                return false;
            }
            if (this.options.useCookie) {
                var flag = getCookie("add_to_home_hide");
                if (flag == "true") {
                    return false;
                }
            }
            this.buildContainer();
        }
    };
    return AddToHomeScreen;
});