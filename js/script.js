$(document).ready(function(){
        var linkedList = new DLL.DoublyLinkedList();
        var articles = $("article");

        $.each(articles, function(index, value){
             linkedList.append(articles[index]);
            $(articles[index]).hide();
            $(articles[index]).find("section").hide();
        });

        var current = linkedList.head();

        $(current.data).show();

        $(document).keyup(function(keyEvent) {
            if(keyEvent.which == 37){
                $(current.data).hide();
                $(current.data).find("section").hide();
                if(current.prev == null){
                    current = linkedList.tail();
                }else{
                    current = current.prev;
                }
                $(current.data).show();
            }

            if(keyEvent.which ==  39){
                $(current.data).hide();
                $(current.data).find("section").hide();
                if(current.next == null){
                    current = linkedList.head();
                }else{
                    current = current.next;
                }

                $(current.data).show();
            }

            if(keyEvent.which == 38){
                $(current.data).find("section").hide();
            }

            if(keyEvent.which == 40){
                $(current.data).find("section").show();
            }
        });

});
