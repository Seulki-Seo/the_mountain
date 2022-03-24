let html = $("html");
let pc = 1200, tablet = 769, mobile = 768;

function scrollShowHide(status) {
    html.css({ "overflow-y": status });
    return html.width();
};

let sc_w1 = scrollShowHide("hidden"),
    sc_w2 = scrollShowHide("scroll"),
    sc_w3 = sc_w1 - sc_w2;

if (sc_w3 > 0) {
    pc = pc - sc_w3;
    tablet = tablet - sc_w3;
    mobile = mobile - sc_w3;
};

function windowSize() {
    let w_size = $(window).width();

    if (w_size >= 1200 && !html.hasClass("pc")) {
        html.removeClass("tablet mobile").addClass("pc");
        scrollShowHide("scroll");
    } else if (w_size < 1200 && w_size >= 769 && !html.hasClass("tablet")) {
        html.removeClass("pc mobile").addClass("tablet");
        scrollShowHide("scroll");
    } else if (w_size < 768 && !html.hasClass("moblie")) {
        html.removeClass("pc tablet").addClass("mobile");
    }

    if (w_size > 768) {
        $(".nav_bg, .lnb").removeAttr("style");
        $(".add").removeClass("on");
        $(".mobile_menu_wrap").css({ left: "-100%" });
    }
};

windowSize();

$(window).resize(function () {
    windowSize();
});

function gnbGo() {
    let ts = $(this);

    if (html.hasClass("mobile")) {
        $(".add").removeClass("on");
        $(".lnb:visible").stop().slideUp(300);
        
        if (ts.next().is(":hidden")) {
            ts.addClass("on");
            ts.next().stop().slideDown(300);
        }
    } else {
        $(".lnb:visible").stop().slideUp(300);
        ts.next().stop().slideDown(300);
    }
};

function gnbLeave() {
    $(".lnb:visible").stop().slideUp(300);
};

$(".mobile_menu_open").click(function () {
    $(".nav_bg").delay(100).fadeIn(200);
    $(".mobile_menu_wrap").animate({ left: 0 }, 300);
    scrollShowHide("hidden");
});

$(".mobile_menu_close").click(function () {
    $(".nav_bg").delay(100).fadeOut(200);
    $(".mobile_menu_wrap").animate({ left: "-100%" }, 300);
    scrollShowHide("scroll");
});

$(document).on("click", ".mobile .add, .tablet .add", gnbGo);
$(document).on("mouseenter", ".pc .add", gnbGo);
$(document).on("mouseleave", ".pc .gnb_list>li", gnbLeave);