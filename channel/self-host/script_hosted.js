/* 
This script is intended to be placed in the footer of the channel pug template with a defer tag, if self-hosting.
This file is identical to the original, but with the emotes feature omitted. (see script_emotespanel.js for reference)
*/

/* Removes the buttons for resizing video and user list size toggle */
const resizes = document.getElementById("resize-video-smaller");
const resizel = document.getElementById("resize-video-larger");
const userlisttoggle = document.getElementById("userlisttoggle");
resizes.remove();
resizel.remove();
userlisttoggle.remove();

/* Adds scrolling banner to MOTD wrap */
$("#motdwrap").prepend($('<div class="banner-slideshow"><div class="mover-1"></div></div>'));

/* Create basic two column layout */
$("#mainpage").prepend($('<div class="rightcontent">'))
$("#mainpage").prepend($('<div class="leftcontent">'))

/* Place video and the rest of the page into the left column */
$("<div id='video-container'>").prependTo($(".leftcontent"));
$("#videowrap").prependTo($("#video-container"));
$('<div class="nano-content">').appendTo($(".leftcontent"));
$("#announcements").appendTo($(".nano-content"));
$("#drinkbar").appendTo($(".nano-content"));
$("#motdrow").appendTo($(".nano-content"));
$("#controlsrow").appendTo($(".nano-content"));
$("#playlistrow").appendTo($(".nano-content"));
$("#sitefooter").appendTo($(".nano-content"));
$("#footer").appendTo($(".nano-content"));
$(".leftcontent").prepend($("#pollwrap"));

/* Place chat and buttons into the right column */
$("#chatwrap").appendTo($(".rightcontent"));
$("#leftcontrols").appendTo($("#chatwrap"));
$('<div class="emotewrap" id="emotewrap">').appendTo($(".rightcontent"));

/* Meant for implementation of scrolling title - remove if unused */
$("#chatwrap").prepend($("<div class='currenttitlewrap'>"));
$("#videowrap-header").prependTo($(".currenttitlewrap"));

const nodecurrenttitle = document.getElementById("currenttitle");
const clonecurrenttitle = nodecurrenttitle.cloneNode(true);
/* $("#videowrap-header").append($("<span> </span>"));
document.getElementById("videowrap-header").appendChild(clone); */

/* Remove padding on wrap */
const pagewrap = document.getElementById("wrap");
pagewrap.setAttribute("style", "padding-bottom: 0px;")

/* Add hint text for chatline and disables spellcheck */
const chatline = document.getElementById("chatline");
chatline.removeAttribute("placeholder");
chatline.setAttribute("placeholder", "Send a message");
chatline.setAttribute("spellcheck", "false");

/* Positions the chat depending on media query */
function chatPosition(x) {
    if (x.matches) { // If media query matches
        $("#chatwrap").prependTo($(".nano-content"));
    } else {
        $("#chatwrap").prependTo($(".rightcontent"));
    }
}
  
var mediaQuery = window.matchMedia("(max-width: 768px)");
chatPosition(mediaQuery); // Call listener function at run time
mediaQuery.addEventListener('change', chatPosition); // Attach listener function on state changes



//OLDER CODE: DON'T TOUCH
/* AFK on unfocus function */
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

/* Adds favicon and externally hosted fonts from Google Fonts */
$(document).ready(function() {
    $('<link id="chanfavicon" href="https://dl.dropboxusercontent.com/s/8a079qbl5cr3zgu/youbdayfavi.png" type="image/x-icon" rel="shortcut icon" />').appendTo("head");

    $('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu">').appendTo("head");
    
    $('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand">').appendTo("head");
});

/* Navbar title */
if (window.location.href == 'https://cytu.be/r/bokigang') {
    $(".navbar-brand").html("BOKIGANG");
}


/* Adds CSS preview button to built-in CSS editor */
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

/* Create space to align AFK and Clear buttons to the right - remove if necessary with better implementation */
$('<button id="spacer-btn" class="btn btn-default btn-sm">Spacer button</button>')
    .appendTo("#leftcontrols")
    .on("click", function() {});

/* Add custom AFK button for manual AFK */
$('<button id="afk-btn" class="btn btn-default btn-sm">AFK</button>')
    .appendTo("#leftcontrols")
    .on("click", function() {
        socket.emit("chatMsg", {
            msg: '/afk'
        });
        VOL_AFK = !VOL_AFK;
    });

/* Add button to clear chat */
$('<button id="clear-btn" class="btn btn-default btn-sm">Clear</button>')
    .appendTo("#leftcontrols")
    .on("click", function() {
        socket.emit("chatMsg", {
            msg: '/clear'
        });
    });