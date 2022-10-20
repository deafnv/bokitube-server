const titlebar = document.getElementById("videowrap-header");
titlebar.remove();

$('<div class="leftcontent">').appendTo("#mainpage");
$('<div class="rightcontent">').appendTo("#mainpage");

$("#videowrap").prepend("#leftcontent");
$("#mainpage").prepend($("#chatwrap"));