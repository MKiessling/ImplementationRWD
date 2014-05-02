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

    };

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
            if(e.which == 37){
                $(current.data).hide();
                $(current.data).find("section").hide();
                if(current.prev == null){
                    current = linkedList.tail();
                }else{
                    current = current.prev;
                }
                $(current.data).show();
            }

            if(e.which ==  39){
                $(current.data).find("section").hide();
                $(current.data).hide("slide");

                if(current.next == null){
                    current = linkedList.head();
                }else{
                    current = current.next;
                }

                $(current.data).show("slide");
            }

            if(e.which == 38){
                $(current.data).find("section").slideUp();
            }

            if(e.which == 40){
                $(current.data).find("section").slideDown();
            }
        }, false);
    };

    if ($(window).width() <= 759) {
        small();
    }
    else if ($(window).width() > 759) {
        big();
    }
});