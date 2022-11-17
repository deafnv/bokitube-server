# Bokitube Cytube Server Theme

![Preview](https://raw.githubusercontent.com/deafnv/bokitube-server/master/images/ss.png)

[Live demo](https://cytubegce.ddns.net)

## Description

JS and CSS for a cytube server theme, as well as similar resources for a self-hosted Cytube server.

&nbsp;

## Usage

### For channel owners on cytu.be

Copy and paste the links below to the external javascript and CSS fields in your channel options.

#### Channel CSS

```
https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/style.min.css
```

To customize the preset theme, paste the following into the CSS editor in the Channel Settings (not External CSS). Change these variables as necessary.

```
:root {
    --leftcontentvw:  78.4vw;
    --bannerimg: url("https://dl.dropboxusercontent.com/s/eyzfkmihwol6b69/banner%20%280-00-00-00%29.png");
    --dialogbgimageurl: url("https://dl.dropboxusercontent.com/s/v59wycx9g8p05e5/astolfo_render__1__by_mrsterben_dbzfx5u.png");
    --bgimageurl: url("https://wallpapercave.com/wp/wp2225973.jpg");
    --primarycolor: #000000;
    --secondarycolor: #2e2e2e;
    --tertiarycolor: #627b83;
}
```

#### Channel Javascript

```
https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/script.min.js
```

To customize the theme from the default Cytube, paste the following into the JS editor in the Channel Settings (not External Javascript)

```
var channelName = "<custom title here>";
var faviconUrl = "<custom favicon URL here>";
```

### For site administrators hosting cytube

If you are hosting your own server, you should have access to the template files. Inserting the theme scripts directly may improve loading speed and apply the theme to all the channels on your server. If this is not what you need, ignore this section and apply the theme through cytube's JS and CSS fields in the channel options. Alternatively, if you would like to customize the theme, feel free to host the files in this repo on your own site.

#### Channel CSS

```
link(rel="stylesheet", href="https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/style.min.css")
```

Copy and paste the above line into the ```head.pug``` or the head of the ```channel.pug``` file, which should be located in the ```/templates``` folder. Linking the theme in ```head.pug``` will change the navbar in the site accordingly.

#### Channel Javascript

```
script(defer, src="https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/script.min.js")
```

Copy and paste the above line into the footer of the ```channel.pug``` file, which should be located in the ```/templates``` folder.

&nbsp;

## Credits

Server design inspired by [BillTube theme](https://github.com/BillTube/BillTube2) with original and simplified implementation.

Emotes panel design from [Cytube Plus](https://github.com/zimny-lech/CyTube-Plus).

Site source code from [Cytube sync repository](https://github.com/calzoneman/sync).
