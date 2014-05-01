$(document).ready(function () {

    var articles = $("article");
    var isSmall, isBig = false;

    window.addEventListener('resize', function () {
        if ($(window).width() <= 759 && isBig) {
            small();
        }
        else if ($(window).width() > 759 && isSmall) {
            big();
        }
    }, true);

    var big = function () {
        isBig = true;
        isSmall = false;
        $.each(articles, function (index, value) {
            $(articles[index]).show();
        });
        window.removeEventListener('keyup', arguments.callee, false);

    }

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
        window.addEventListener('keyup', function (e) {
            if (e.keyCode === 39) {
                $(current.data).hide();
                if (current.next == null) {
                    current = linkedList.head();
                } else {
                    current = current.next;
                }

                $(current.data).show();
                ;
            }
            if (e.keyCode === 37) {
                $(current.data).hide();
                if (current.prev == null) {
                    current = linkedList.tail();
                } else {
                    current = current.prev;
                }
                $(current.data).show();
            }
        }, false);
    }

    if ($(window).width() <= 759) {
        small();
    }
    else if ($(window).width() > 759) {
        big();
    }
});
