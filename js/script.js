$(document).ready(function () {

    var articles = $("article");
    var isSmall, isBig = false;
    var listener = null;
    var block = false;
    var expand = false;
    var nav = responsiveNav(".nav-collapse");

    /* attach EventListener to window to monitor changes in width */
    window.addEventListener('resize', function () {
        if ($(window).width() <= 759 && isBig) {
            small();
        }
        else if ($(window).width() > 759 && isSmall) {
            big();
        }
    }, true);

    /* triggers if window is big enough for non-mobile version */
    var big = function () {
        isBig = true;
        isSmall = false;
        $.each(articles, function (index, value) {
            $(articles[index]).show();
            $(articles[index]).find("div.maintext").show();
            $(articles[index]).swipe("destroy");
        });

        window.removeEventListener('keyup', listener, false);
    };

    /* triggers if window is small enough for mobile version */
    var small = function () {
        isSmall = true;
        isBig = false;
        var linkedList = new DLL.DoublyLinkedList();
        $.each(articles, function (index, value) {
            linkedList.append(articles[index]);
            $(articles[index]).hide();
            $(articles[index]).find("div.maintext").hide();
        });
        var current = linkedList.head();
        $(current.data).show();


        var slideRight = function () {
            block = true;

            $(current.data).effect('slide', {direction: 'left', mode: 'hide', distance: '100%'}, 1000, function () {
                $(this).find("div.maintext").hide();
                $(this).find("div.heading").addClass("sum");
                $(this).find("div.intro.text").addClass("sum");
                $(this).find("div.intro.more").css("display", "block");
            });

            if (current.next == null) {
                current = linkedList.head();
            } else {
                current = current.next;
            }

            $(current.data).effect('slide', {direction: 'right', mode: 'show', distance: '100%'}, 1000, function () {
                block = false;
            });
        };

        var slideLeft = function () {
            block = true;

            $(current.data).effect('slide', {direction: 'right', mode: 'hide', distance: '100%'}, 1000, function () {
                $(this).find("div.maintext").hide();
                $(this).find("div.heading").addClass("sum");
                $(this).find("div.intro.text").addClass("sum");
                $(this).find("div.intro.more").css("display", "block");
            });

            if (current.prev == null) {
                current = linkedList.tail();
            } else {
                current = current.prev;
            }
            $(current.data).effect('slide', {direction: 'left', mode: 'show', distance: '100%'}, 1000, function () {
                block = false;
            });
        };

        var slideUp = function () {
            block = true;
            expand = false;

            $(current.data).find("div.maintext").slideUp(400, function () {
                block = false;
                $(current.data).find("div.heading").addClass("sum");
                $(current.data).find("div.intro.text").addClass("sum");
                $(current.data).find("div.intro.more").css("display", "block");
            });
        };

        var slideDown = function () {
            block = true;
            expand = true;

            $(current.data).find("div.heading.sum").removeClass("sum");
            $(current.data).find("div.intro.text.sum").removeClass("sum");
            $(current.data).find("div.intro.more").css("display", "none");

            $(current.data).find("div.maintext").slideDown(400, function () {
                block = false;
            });
        };

        $.each(articles, function (index, value) {
            $(articles[index]).swipe({
                swipe: function (event, direction, distance, duration, fingerCount) {
                    if (direction == "left" && block === false) {
                        slideRight();
                    } else if (direction == "right" && block === false) {
                        slideLeft();
                    }
                },
                tap: function (event, target) {
                    if (!expand) {
                        slideDown();
                    } else {
                        slideUp();
                    }
                }, allowPageScroll: "vertical"
            });
        });

        listener = function (keyEvent) {
            /* Right-Arrow */
            if (keyEvent.keyCode === 39 && block === false) {
                slideRight();
            }
            /* Left-Arrow */
            if (keyEvent.keyCode === 37 && block === false) {
                slideLeft();
            }
            /* Up-Arrow */
            if (keyEvent.which === 38 && block === false) {
                slideUp();
            }
            /* Down-Arrow */
            if (keyEvent.which === 40 && block === false) {
                slideDown();
            }
        };

        window.addEventListener('keyup', listener, false);
    };

    /* is triggered once the page was loaded */
    if ($(window).width() <= 759) {
        small();
    }
    else if ($(window).width() > 759) {
        big();
    }
});