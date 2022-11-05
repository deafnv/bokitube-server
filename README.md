# Bokitube Cytube Server Theme

![Preview](https://raw.githubusercontent.com/deafnv/bokitube-server/master/images/ss.png)

## Description

JS and CSS for a cytube server theme, as well as similar resources for a self-hosted Cytube server.

&nbsp;

## Usage

### For channel owners on cytu.be

Copy and paste the links below to the external javascript and CSS fields in your channel options.

#### Channel CSS

```
https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/style.css
```

#### Channel Javascript

```
https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/script.js
```

### For site administrators hosting cytube

If you are hosting your own server, you should have access to the template files. Inserting the theme scripts directly may improve loading speed and apply the theme to all the channels on your server. If this is not what you need, ignore this section and apply the theme through cytube's JS and CSS fields in the channel options.

#### Channel CSS

```
link(rel="stylesheet", href="https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/style.css")
```

Copy and paste the above line into the ```head.pug``` or the head of the ```channel.pug``` file, which should be located in the ```/templates``` folder. Linking the theme in ```head.pug``` will change the navbar in the site accordingly.

#### Channel Javascript

```
script(defer, src="https://cdn.jsdelivr.net/gh/deafnv/bokitube-server@master/channel/script.js")
```

Copy and paste the above line into the footer of the ```channel.pug``` file, which should be located in the ```/templates``` folder. You may want to

&nbsp;

## Credits

Server design inspired by [BillTube theme](https://github.com/BillTube/BillTube2) with original and simplified implementation.

Emotes panel design from [Cytube Plus](https://github.com/zimny-lech/CyTube-Plus).

Site source code from [Cytube sync repository](https://github.com/calzoneman/sync).
