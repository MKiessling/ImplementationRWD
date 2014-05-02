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
        });
        var current = linkedList.head();
        $(current.data).show();

        listener = function (keyEvent) {
            /* Right-Arrow */
            if (keyEvent.keyCode === 39) {
                $(current.data).hide();
                if (current.next == null) {
                    current = linkedList.head();
                } else {
                    current = current.next;
                }

                $(current.data).show();
                ;
            }
            /* Left-Arrow */
            if (keyEvent.keyCode === 37) {
                $(current.data).hide();
                if (current.prev == null) {
                    current = linkedList.tail();
                } else {
                    current = current.prev;
                }
                $(current.data).show();
            }
        };

        window.addEventListener('keyup', listener, false);
    }

    /* is triggered once the page was loaded */
    if ($(window).width() <= 759) {
        small();
    }
    else if ($(window).width() > 759) {
        big();
    }
});
