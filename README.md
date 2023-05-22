# Bokitube Cytube Channel Theme

<div style="display: flex;">
    <img src="https://raw.githubusercontent.com/deafnv/bokitube-server/master/images/ss.png" width="900">
    <img src="https://raw.githubusercontent.com/deafnv/bokitube-server/master/images/ss-mobile.png" width="400">
</div>

[Live demo](https://cytu.be/r/testtheme)

## Description

JS and CSS for a chat-focused theme for Cytube channels.

- Mobile-friendly responsive design
- Better emotes display
- Switch from fixed, to draggable emotes panel with `Switch EP` button on navbar
- Emotes autocomplete when using emotes with `/<emote-name>` format
- Reply button to reply to individual messages
- AFK on window unfocus

&nbsp;

## Usage

Copy and paste the links below to the external javascript and CSS fields in your channel options.

### Channel CSS

```
https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/style.min.css
```

To customize the preset theme, paste the following into the CSS editor in the Channel Settings (not External CSS). Customize these as you wish.

``` css
:root {
    --leftcontentvw:  78.4vw; /* Width of video player section, chat will fill the rest */
    --bannerimg: url("INSERT YOUR IMAGE HERE"); /* Sliding banner image in MOTD */
    --dialogbgimageurl: url("INSERT YOUR IMAGE HERE"); /* Modal background image */
    --bgimageurl: url("INSERT YOUR IMAGE HERE"); /* Background channel image */
    --primarycolor: #000000;
    --secondarycolor: #2e2e2e;
    --tertiarycolor: #627b83;
}
```

### Channel Javascript

```
https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/script.min.js
```

To customize the theme from the default Cytube, paste the following into the JS editor in the Channel Settings (not External Javascript)

``` javascript
var channelName = "<custom title here>";
var faviconUrl = "<custom favicon URL here>";
var scrollingBannerEnabled = false; //true or false
```

&nbsp;

## Credits

Server design inspired by [BillTube theme](https://github.com/BillTube/BillTube2).

Basic emotes panel design from [Cytube Plus](https://github.com/zimny-lech/CyTube-Plus).

Site source code from [Cytube sync repository](https://github.com/calzoneman/sync).
