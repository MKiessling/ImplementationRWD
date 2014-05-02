/**
 * copy into Developer console
 */
var articles = $("article");
var linkedList = new DLL.DoublyLinkedList();
$.each(articles, function (index, value) {
    linkedList.append(articles[index]);
    $(articles[index]).hide();
});
var current = linkedList.head();
$(current.data).show();

$(current.data).effect('slide', {direction: 'left', mode: 'show', distance: '100%'}, 1000);