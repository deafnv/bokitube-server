const resizes = document.getElementById("resize-video-smaller");
const resizel = document.getElementById("resize-video-larger");
const userlisttoggle = document.getElementById("userlisttoggle");

resizes.remove();
resizel.remove();
userlisttoggle.remove();

$("#motdwrap").prepend($('<div class="banner-slideshow"><div class="mover-1"></div></div>'));
$(".credit").append($('<p class="text-muted credit">Theme by TomoLover, available on <a href="https://github.com/deafnv/bokigang-server" target="_blank" rel="noreferrer noopener">Github</a></p><p class="text-muted credit">Breast milk (sometimes spelled as breastmilk) or mother\'s milk is milk produced by mammary glands, located in the breast of a human female. Breast milk is the primary source of nutrition for newborns, containing fat, protein, carbohydrates (lactose and human milk oligosaccharides) and variable minerals and vitamins. Breast milk also contains substances that help protect an infant against infection and inflammation, whilst also contributing to healthy development of the immune system and gut microbiome.</p>'));

$("#mainpage").prepend($("#chatwrap"));
$("#mainpage").prepend($('<div class="rightcontent">'))
$("#mainpage").prepend($('<div class="leftcontent">'))

$("<div id='video-container'>").prependTo($(".leftcontent"));
$("#videowrap").prependTo($("#video-container"));
$("#chatwrap").appendTo($(".rightcontent"));
$("#leftcontrols").appendTo($("#chatwrap"));

$('<div class="nano-content">').appendTo($(".leftcontent"));
$("#motdrow").appendTo($(".nano-content"));
$("#controlsrow").appendTo($(".nano-content"));
$("#playlistrow").appendTo($(".nano-content"));
$("#sitefooter").appendTo($(".nano-content"));
$("#footer").appendTo($(".nano-content"));
$(".leftcontent").prepend($("#pollwrap"));

$('<div class="emotewrap" id="emotewrap">').appendTo($(".rightcontent"));

$("#chatwrap").prepend($("<div class='currenttitlewrap'>"));
$("#videowrap-header").prependTo($(".currenttitlewrap"));

const node = document.getElementById("currenttitle");
const clone = node.cloneNode(true);
$("#videowrap-header").append($("<span> </span>"));
document.getElementById("videowrap-header").appendChild(clone);


const chatline = document.getElementById("chatline");
chatline.removeAttribute("placeholder");
chatline.setAttribute("placeholder", "Send a message");
chatline.setAttribute("spellcheck", "false");



//OLDER CODE: DON'T TOUCH
var VOL_AFK = false;
var FOCUS_AFK = false;
setInterval(function() {
    if (VOL_AFK === false && FOCUS_AFK === false) {
        $("#userlist").find('span[class^=userlist]').each(function() {
            if ($(this).html() == CLIENT.name && $(this).css('font-style') == "italic") {
                socket.emit("chatMsg", {
                    msg: '/afk'
                });
                return;
            }
        });
    }
}, 500);

setInterval(function() {
    if (document.hasFocus() && FOCUS_AFK && VOL_AFK) {
        socket.emit("chatMsg", {
            msg: '/afk'
        });
        FOCUS_AFK = !FOCUS_AFK;
        VOL_AFK = !VOL_AFK;
    } else if (!document.hasFocus() && !FOCUS_AFK && !VOL_AFK) {
        socket.emit("chatMsg", {
            msg: '/afk'
        });
        FOCUS_AFK = !FOCUS_AFK;
        VOL_AFK = !VOL_AFK;
    }
}, 500);

$(document).ready(function() {
    $('<link id="chanfavicon" href="https://dl.dropboxusercontent.com/s/8a079qbl5cr3zgu/youbdayfavi.png" type="image/x-icon" rel="shortcut icon" />').appendTo("head");

    $('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu">').appendTo("head");
    
    $('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand">').appendTo("head");
});

$(".navbar-brand").html("BOKIGANG");

$('<button class="btn btn-primary" id="cs-csspreview">Preview CSS</button>')
    .appendTo("#cs-csseditor")
    .on("mousedown", function() {
        document.getElementById("channeloptions").style.visibility = "hidden";
        document.getElementById("cs-csseditor").style.visibility = "hidden";
        document.getElementById("cs-csspreview").style.visibility = "visible";
    })
    .on("mouseout", function() {
        document.getElementById("channeloptions").style.visibility = "visible";
        document.getElementById("cs-csseditor").style.visibility = "visible";
    })
    .on("mouseup", function() {
        document.getElementById("channeloptions").style.visibility = "visible";
        document.getElementById("cs-csseditor").style.visibility = "visible";
    });

var EMOTES = false;
GroupEmotes_Number = 100;
UI_ChannelCache = 1;
UI_GroupEmotes = 1;
chatpanel = $('<div id="chatpanel" class="row" />').insertBefore("#playlistmanagerwrap");
emotespanel = $('<div id="emotespanel" style="display:none" />').appendTo(chatpanel);
UI_ChannelCache == "1" ? showEmotes() : '';
function toggleDiv(div) {
    $(div).css('display') == "none" ? $(div).show() : $(div).hide();
}
function insertText(str) {
    $("#chatline").val($("#chatline").val() + str).focus();
}
function showEmotes() {
    if (typeof GroupEmotes_Number !== "number" || GroupEmotes_Number < 1) {
        GroupEmotes_Number = 100;
    }
    len = CHANNEL.emotes.length;
    if (len < 1) {
        emotespanel.addClass('row');
        makeAlert("No emotes available", "Ask channel administrator.").appendTo(emotespanel);
    } else if (UI_GroupEmotes != "1" || len <= GroupEmotes_Number) {
        for (i in CHANNEL.emotes) {
            $('<img onclick="insertText(\'' + CHANNEL.emotes[i].name + ' \')" />')
                .attr({
                    'src': CHANNEL.emotes[i].image,
                    'title': CHANNEL.emotes[i].name
                })
                .appendTo(emotespanel);
        }
    } else {
        var arr = new Array();
        stop = GroupEmotes_Number - 1;
        gr = Math.ceil(CHANNEL.emotes.length / GroupEmotes_Number);
        html = '';
        for (i = 0; i < len; i++) {
            html += '<img src="' + CHANNEL.emotes[i].image + '" ' +
                'onclick="insertText(\'' + CHANNEL.emotes[i].name + ' \')" />';
            if (i % GroupEmotes_Number == stop) {
                arr.push(html);
                html = '';
            }
        }
        len % GroupEmotes_Number != 0 ? arr.push(html) : '';
        for (i = 0; i < gr; i++) {
            div = $('<div id="emotes-' + i + '" class="groupemotes" style="display:none" />')
                .html(arr[i])
                .appendTo(emotespanel);
        }
        arr = '';
        emotesbtnwrap = $('<div id="emotesbtnwrap" />').appendTo(emotespanel);
        emotesbtngroup = $('<div id="emotescontrols" class="btn-group">').appendTo(emotesbtnwrap);
        for (i = 0; i < gr; i++) {
            btn = $('<button class="btn btn-sm btn-default emotesbtn" group="' + i + '">' + (i + 1) + '</button>')
                .appendTo(emotesbtngroup)
                .on("click", function() {
                    $(".emotesbtn").removeClass('active');
                    $(this).addClass('active');
                    $(".groupemotes").hide();
                    nr = $(this).attr('group');
                    $("#emotes-" + nr).show();
                });
        }
        $("#emotes-0").show();
        $("#emotescontrols button:nth-child(1)").addClass('active');
    }
    EMOTES = true;
}

$("#emotespanel").appendTo($(".emotewrap"));

$("#emotelistbtn").remove();

emotesbtn = $('<button id="emotes-btn" class="btn btn-sm btn-default" title="Display emotes panel">Emote List</button>')
    .appendTo("#leftcontrols")
    .on("click", function() {
        toggleDiv(emotespanel);
        (UI_ChannelCache != "1" && !EMOTES) ? showEmotes(): '';
    });

$('<button id="spacer-btn" class="btn btn-default btn-sm">Spacer button</button>')
    .appendTo("#leftcontrols")
    .on("click", function() {});

$('<button id="afk-btn" class="btn btn-default btn-sm">AFK</button>')
    .appendTo("#leftcontrols")
    .on("click", function() {
        socket.emit("chatMsg", {
            msg: '/afk'
        });
        VOL_AFK = !VOL_AFK;
    });

$('<button id="clear-btn" class="btn btn-default btn-sm">Clear</button>')
    .appendTo("#leftcontrols")
    .on("click", function() {
        socket.emit("chatMsg", {
            msg: '/clear'
        });
    });

    dragElement(document.getElementById("emotewrap"));

    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown;
      }
    
      function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
      }
    
      function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
      }
    }