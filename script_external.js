/* 
This script is intended to be placed in the external JS section of the channel
The script below will fail to run if it is placed within script_internal.js
*/

/* Custom emotes panel */
/* Basic implementation: Full credits to https://github.com/zimny-lech/CyTube-Plus */
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

/* PLace emotes panel in a wrap */
$("#emotespanel").appendTo($(".emotewrap"));

/* Remove original emote button */
$("#emotelistbtn").remove();

/* Add custom emotes panel button */
emotesbtn = $('<button id="emotes-btn" class="btn btn-sm btn-default" title="Display emotes panel">Emote List</button>')
    .prependTo("#leftcontrols")
    .on("click", function() {
        toggleDiv(emotespanel);
        (UI_ChannelCache != "1" && !EMOTES) ? showEmotes(): '';
    });

$('#newpollbtn').prependTo($("#leftcontrols"));

/* Makes the custom emotes panel draggable */
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