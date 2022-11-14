//? Original code from cytube plus
//* The following code is obtained from https://github.com/zimny-lech/CyTube-Plus with slight modification and thus is licensed under the MIT License
//* https://github.com/zimny-lech/CyTube-Plus/blob/master/LICENSE
GroupEmotes_Number = 100;
UI_GroupEmotes = 1;
chatpanel = $('<div id="chatpanel" class="row" />').insertBefore("#playlistmanagerwrap");
emotespanel = $('<div id="emotespanel" style="display:none" />').appendTo(chatpanel);
function toggleDiv(div) {
    $(div).css('display') == "none" ? $(div).show() : $(div).hide();
}
function insertText(str) {
    $("#chatline").val($("#chatline").val() + str).focus();
}

function emotesPanel() {
  emotespanel.removeClass('row');
  document.querySelector('#emotespanel').replaceChildren();

  if (typeof GroupEmotes_Number !== "number" || GroupEmotes_Number < 1) {
      GroupEmotes_Number = 100;
  }
  len = CHANNEL.emotes.length;
  if (len < 1) {
      emotespanel.addClass('row');
      makeAlert("No emotes available", "Ask channel administrator. This panel will update every second until an emote is found.").appendTo(emotespanel);

      console.log('No emotes found, reloading in 1 second')
      setTimeout(function() {emotesPanel()}, 1000);
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
}