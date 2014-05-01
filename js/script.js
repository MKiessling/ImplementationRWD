$(document).ready(function(){
    if ($(window).width() <= 759) {

        var linkedList = new DLL.DoublyLinkedList();
        var articles = $("article");
        $.each(articles, function(index, value){
             linkedList.append(articles[index]);
            $(articles[index]).hide();
        });

        var current = linkedList.head();

        $(current.data).show();

        $(document).keyup(function(keyEvent) {
            if(keyEvent.which ==  39){
                $(current.data).hide();
                if(current.next == null){
                    current = linkedList.head();
                }else{
                    current = current.next;
                }

                $(current.data).show();
            }

            if(keyEvent.which == 37){
                $(current.data).hide();
                if(current.prev == null){
                    current = linkedList.tail();
                }else{
                    current = current.prev;
                }
                $(current.data).show();
            }

        });
    }
});
