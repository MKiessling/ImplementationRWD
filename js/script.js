$(document).ready(function () {

    var articles = $("article");
    var isSmall, isBig = false;
    var listener = null;

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
        });

        window.removeEventListener('keyup', listener, false);

    }

    /* triggers if window is small enough for mobile version */
    var small = function () {
        isSmall = true;
        isBig = false;
        var linkedList = new DLL.DoublyLinkedList();
        $.each(articles, function (index, value) {
            linkedList.append(articles[index]);
            $(articles[index]).hide();
            $(articles[index]).find("section").hide();
        });
        var current = linkedList.head();
        $(current.data).show();

        listener = function (keyEvent) {
            /* Right-Arrow */
            if (keyEvent.keyCode === 39) {
                $(current.data).find("section").hide();
                $(current.data).effect('slide', {direction: 'left', mode: 'hide', distance: '100%'}, 1000);
                if (current.next == null) {
                    current = linkedList.head();
                } else {
                    current = current.next;
                }

                $(current.data).effect('slide', {direction: 'right', mode: 'show', distance: '100%'}, 1000);

            }
            /* Left-Arrow */
            if (keyEvent.keyCode === 37) {
                $(current.data).find("section").hide();
                $(current.data).effect('slide', {direction: 'right', mode: 'hide', distance: '100%'}, 1000);
                if (current.prev == null) {
                    current = linkedList.tail();
                } else {
                    current = current.prev;
                }
                $(current.data).effect('slide', {direction: 'left', mode: 'show', distance: '100%'}, 1000);
            }

            /* Up-Arrow */
            if(keyEvent.which === 38){
                $(current.data).find("section").slideUp();
            }

            /* Down-Arrow */
            if(keyEvent.which === 40){
                $(current.data).find("section").slideDown();
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
