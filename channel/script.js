/* 
* This script is intended to be placed in the footer of the channel pug template with a defer tag, if self-hosting.
*/

/* Removes the buttons for resizing video and user list size toggle */
const resizes = document.getElementById("resize-video-smaller");
const resizel = document.getElementById("resize-video-larger");
resizes.remove();
resizel.remove();

/* Display none on container-fluid after accepting permissions */
document.querySelector('.container-fluid').style.display = "none";

/* Adds scrolling banner to MOTD wrap */
$("#motdwrap").prepend($('<div class="banner-slideshow"><div class="mover-1"></div></div>'));

/* Theme credits */
$(".credit").append($('<p class="text-muted credit">Theme by TomoLover, available on <a href="https://github.com/deafnv/bokitube-server" target="_blank" rel="noreferrer noopener">Github</a></p>'));

/* Create basic two column layout */
$("#mainpage").prepend($('<div id="content-wrap">'))
$("#content-wrap").prepend($('<div id="rightcontent">'))
$("#content-wrap").prepend($('<div id="leftcontent">'))

/* Place video and the rest of the page into the left column */
$("<div id='video-container'>").prependTo($("#leftcontent"));
$("#videowrap").prependTo($("#video-container"));
$('<div id="channel-content">').appendTo($("#leftcontent"));
$("#announcements").appendTo($("#channel-content"));
$("#drinkbar").appendTo($("#channel-content"));
$("#motdrow").appendTo($("#channel-content"));
$("#controlsrow").appendTo($("#channel-content"));
$("#playlistrow").appendTo($("#channel-content"));
$("#sitefooter").appendTo($("#channel-content"));
$("#footer").appendTo($("#channel-content"));
$("#leftcontent").prepend($("#pollwrap"));

/* Place chat and buttons into the right column */
$("#chatheader").appendTo($("#rightcontent"));
$("#userlist").appendTo($("#rightcontent"));
$("#messagebuffer").appendTo($("#rightcontent"));
const formLine = document.querySelector("div#chatwrap > form");
formLine.setAttribute("id", "formline");
$("#formline").appendTo($("#rightcontent"));
$("#leftcontrols").appendTo($("#rightcontent"));

/* Meant for implementation of scrolling title - remove if unused */
$("#rightcontent").prepend($("<div id='currenttitlewrap'>"));
$("#videowrap-header").prependTo($("#currenttitlewrap"));

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

/* Sets the variable used for mobile chat sizing every 20 milliseconds - there is probably a better implementation of this */
setInterval(function () {document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);}, 20);

/* Positions the chat depending on media query */
function chatPosition(x) {
    if (x.matches) { // If media query matches
        $("#rightcontent").appendTo($("#leftcontent"));
        $("#channel-content").appendTo($("#leftcontent"));
        $("#footer").appendTo($("#leftcontent"));
        
        /* When user clicks chatline on devices with width < 768px, scroll up continuously for 0.5 seconds */
        document.getElementById("chatline").onclick = function() {
            var counter = 0;
            var clickChatInterval = setInterval(() => {
                document.documentElement.scrollTop = 0;

                if (++counter === 10) {
                    window.clearInterval(clickChatInterval);
                }
            }, 50);
        }

        /* Sets the variable used for mobile chat sizing every 20 milliseconds - there is probably a better implementation of this */
        setInterval(function () {
            document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
        }, 20);
    } else {
        $("#rightcontent").appendTo($("#content-wrap"));
        
        document.documentElement.style.setProperty('--vh', `${window.innerHeight/100}px`);
    }
}
  
var mediaQuery = window.matchMedia("(max-width: 768px)");
chatPosition(mediaQuery); // Call listener function at run time
mediaQuery.addEventListener('change', chatPosition); // Attach listener function on state changes

/* Add jump to current item button */
const jumpBtn = document.createElement("button");
jumpBtn.innerHTML = "Scroll to current item"
jumpBtn.setAttribute("id", "jump-btn");
jumpBtn.setAttribute("class", "btn");
jumpBtn.onclick = function() {
    window.scrollQueue();
}
const rightControls = document.getElementById("rightcontrols");
rightControls.insertBefore(jumpBtn, rightControls.children[1]);



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
    /* Navbar title */
    if (window.location.host == 'cytu.be') {
        $(".navbar-brand").html(channelName);
        $('<link id="chanfavicon" href="' + faviconUrl + '" type="image/x-icon" rel="shortcut icon" />').appendTo("head");
    }

    $('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Ubuntu">').appendTo("head");
    
    $('<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Quicksand">').appendTo("head");
});

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

/* Initialize default values for floating emotes panel positioning for new users */
if (!localStorage.epFlTop || !localStorage.epFlLeft) {
    localStorage.epFlTop = 100;
    localStorage.epFlLeft = -15;
}

$('<div class="emotewrap" id="emotewrap" style="top: ' + localStorage.epFlTop + 'px; left: ' + localStorage.epFlLeft + 'px;">').appendTo($("#rightcontent"));

/* Initialize default values for emotes panel positioning for new users */
if (!localStorage.epposition) {
    localStorage.epposition = 1;
    emotespanel = $('<div id="emotespanel" class="ep__fixed" style="display:none" />').insertAfter('#userlist');
}

/* Set emotes panel to floating or fixed depending on last session */
if (localStorage.epposition == 0) {
    emotespanel = $('<div id="emotespanel" class="ep__floating" style="display:none" />').appendTo($("#emotewrap"));
} else {
    emotespanel = $('<div id="emotespanel" class="ep__fixed" style="display:none" />').insertAfter('#userlist');
}

/* Initialize default values for emotes panel state for new users */
if (!localStorage.epIsOpen) {
    localStorage.epIsOpen = 0;
}
if (localStorage.epIsOpen == 1) {
    toggleDiv(emotespanel);
}

function toggleDiv(div) {
    $(div).css('display') == "none" ? $(div).show() : $(div).hide();
}
function insertText(str) {
    $("#chatline").val($("#chatline").val() + str).focus(); // TODO: remove this utility function so that the chatline doesn't get focused on emote press on mobile
}

/* Initialize intersection observer to improve performance - see https://github.com/deafnv/bokitube-server/commit/1d81d089762a7cb421d252dba385cd706ede4960 */
let observer = new IntersectionObserver(observerCallback);
function observerCallback() {
    toggleDiv('#queue');
}

/* Custom emotes panel */
var autocompleteArr = [];
function emotesPanel() {
    emotespanel.removeClass('row');
    document.querySelector('#emotespanel').replaceChildren();

    len = CHANNEL.emotes.length;
    if (len < 1) {
        emotespanel.addClass('row');
        makeAlert("No emotes available", "Ask channel administrator. This panel will update every second until an emote is found.").appendTo(emotespanel);

        console.log('No emotes found, reloading in 1 second')
        setTimeout(function() {emotesPanel()}, 1000);
    } else {
        for (i in CHANNEL.emotes) {
            $('<img onclick="insertText(\'' + CHANNEL.emotes[i].name + ' \')" />')
                .attr({
                    'src': CHANNEL.emotes[i].image,
                    'title': CHANNEL.emotes[i].name
                })
                .appendTo(emotespanel);
            autocompleteArr.push({"name":CHANNEL.emotes[i].name, "image": CHANNEL.emotes[i].image});
        }
        autocompleteArr.sort((a, b) => a.name.localeCompare(b.name));
        // Disable autocomplete on mobile - legacy, enable if needed, although mobile has less vertical space as is
        if (!window.matchMedia("(max-width: 768px)").matches) {
            autocomplete(document.getElementById("chatline"), autocompleteArr);
        } else {
            // See line 212 for details
            observer.observe(document.querySelector('#rightpane-inner').children[5]);
        }
    }
}
emotesPanel();

/* Remove original emote button */
$("#emotelistbtn").remove();

/* Add custom emotes panel button */
emotesbtn = $('<button id="emotes-btn" class="btn btn-sm btn-default" title="Display emotes panel">Emote List</button>')
    .prependTo("#leftcontrols")
    .on("click", function() {
        toggleDiv(emotespanel);
        localStorage.epIsOpen == 0 ? localStorage.epIsOpen = 1 : localStorage.epIsOpen = 0;
    });

/* Switch emotes panel - fixed or floating */
$('<li><a onclick="switchEp()" style="cursor: pointer;">Switch EP</a></li>').appendTo(".navbar-nav")

function switchEp() {
    const panel = document.querySelector("#emotespanel");
    if(localStorage.epposition == 1) { 
        panel.setAttribute("class", "ep__floating");
        $("#emotespanel").appendTo($("#emotewrap"));
        localStorage.epposition = 0;
        document.querySelector('#emotewrap').style.top = '100px';
        document.querySelector('#emotewrap').style.left = '-15px';
        localStorage.epFlTop = 100;
        localStorage.epFlLeft = -15;
    } else {
        panel.setAttribute("class", "ep__fixed");
        $("#emotespanel").insertAfter('#userlist');
        localStorage.epposition = 1;
    }
}

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
        localStorage.epFlTop = document.querySelector('#emotewrap').style.top.substring(0, document.querySelector('#emotewrap').style.top.length - 2);
        localStorage.epFlLeft = document.querySelector('#emotewrap').style.left.substring(0, document.querySelector('#emotewrap').style.left.length - 2);
    }
}

/* Autocomplete function for emotes */
function autocomplete(inp, arr) {
    var currentFocus;
    var currentInputVal = '';
    var matchedlength = 0;
    inp.addEventListener("input", function(e) {
        var a, b, i, val = this.value;

        closeAllLists();
        
        if (!val) { return false;}
        currentFocus = -1;

        a = document.createElement("DIV");
        a.setAttribute("id", "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(a);
        $("#autocomplete-list").insertBefore(document.querySelectorAll('form')[1]);

        // FIXME: Regex lookbehinds aren't supported on Safari, might have to find alternative
        // Regex searches for / character preceded by a space, matching all succeeding characters unless it is a whitespace.
        var matched = document.getElementById("chatline").value.match(/(?<!\S)\/\S*$/gim).toString();
        var matchedNoSlash = matched.substring(1, matched.length);
        currentInputVal = document.getElementById("chatline").value;

        for (i = 0; i < arr.length; i++) {
            if (arr[i].name.substr(0, matched.length).toUpperCase() == matched.toUpperCase()) { // Handle direct match
                matchedlength = matched.length;
                b = document.createElement("DIV");
                b.innerHTML = "<strong>" + arr[i].name.substr(0, matched.length) + "</strong>";
                b.innerHTML += arr[i].name.substr(matched.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
                b.innerHTML += "<img id='autocomplete-image' src='" + arr[i].image + "'>";
                b.addEventListener("click", function(e) {
                    $("#chatline").val($("#chatline").val().substring(0, $("#chatline").val().length - $("#chatline").val().match(/(?<!\S)\/\S*$/gim).toString().length) + this.getElementsByTagName("input")[0].value);
                    closeAllLists();
                });
                a.appendChild(b);
            } else if (arr[i].name.substring(1, arr[i].name.length).indexOf(matchedNoSlash) > -1) { // Handle match in string
                var indexInArr = arr[i].name.indexOf(matchedNoSlash);
                b = document.createElement("DIV");
                b.innerHTML = "<strong>/</strong>";
                b.innerHTML += arr[i].name.substring(1, indexInArr);
                b.innerHTML += "<strong>" + matchedNoSlash + "</strong>";
                b.innerHTML += arr[i].name.substring((indexInArr + matchedNoSlash.length), arr[i].name.length);
                b.innerHTML += "<input type='hidden' value='" + arr[i].name + "'>";
                b.innerHTML += "<img id='autocomplete-image' src='" + arr[i].image + "'>";
                b.addEventListener("click", function(e) {
                    $("#chatline").val($("#chatline").val().substring(0, $("#chatline").val().length - $("#chatline").val().match(/(?<!\S)\/\S*$/gim).toString().length) + this.getElementsByTagName("input")[0].value);
                    closeAllLists();
                });
                a.appendChild(b);
            }
        }
    });
    
    inp.addEventListener("keydown", function(e) {
        var x = document.getElementById("autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        
        if (e.keyCode == 40) {
            e.preventDefault();
            currentFocus++;
            addActive(x);

            document.querySelector('.autocomplete-active').scrollIntoViewIfNeeded(false);
            $("#chatline").val(currentInputVal.substring(0, (currentInputVal.length - currentInputVal.match(/(?<!\S)\/\S*$/gim).toString().length)) + document.getElementsByClassName('autocomplete-active')[0].querySelector('input').getAttribute('value'));
        } else if (e.keyCode == 38) {
            e.preventDefault();
            currentFocus--;
            addActive(x);

            document.querySelector('.autocomplete-active').scrollIntoViewIfNeeded(false);
            $("#chatline").val(currentInputVal.substring(0, (currentInputVal.length - currentInputVal.match(/(?<!\S)\/\S*$/gim).toString().length)) + document.getElementsByClassName('autocomplete-active')[0].querySelector('input').getAttribute('value'));
        } else if (e.keyCode == 13 || e.keyCode == 9) {
            // stoppropagation doesnt really work here to stop enter from sending message
            closeAllLists();
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
            x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}