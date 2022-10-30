# Bokigang Cytube Server Theme

![Preview](https://github.com/deafnv/bokigang-server/blob/38758b35b50b61df3dd72bc32fd3d0cd1d134643/images/ss.png)

#### [Visit for live demo](https://cytubegce.ddns.net/)

## Description

JS and CSS for a cytube server theme, as well as similar resources for a self-hosted Cytube server.

&nbsp;

## Usage

If possible, inserting the CSS and JS code as HTML tags directly into the header and footer of the pug template directly may result in faster loading of the site.

### Channel CSS

Host the CSS files in [/channel](https://github.com/deafnv/bokigang-server/tree/master/channel) on an external site like Dropbox for highest functionality, or copy and paste the code into the built in CSS editor.

Use the appropriate files and code according to the header comments depending on original or self-hosting.

### Channel Javascript

Host the JS files in [/channel](https://github.com/deafnv/bokigang-server/tree/master/channel) on an external site like Dropbox for highest functionality, or copy and paste the code into the built in JS editor.

If self-hosting and inserting external scripts directly into the pug template, use separated files for correct emote panel functionality.

(Use the ```hosted_style.css``` alongside style.css, adding the stylesheets to ```head.pug``` if self-hosting.)

&nbsp;

## Credits

Server design based on the [BillTube theme](https://github.com/BillTube/BillTube2) with original and simplified implementation.

Emotes panel design from [Cytube Plus](https://github.com/zimny-lech/CyTube-Plus).

Site source code from [Cytube sync repository](https://github.com/calzoneman/sync).
