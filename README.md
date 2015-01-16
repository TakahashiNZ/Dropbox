Dropbox
=======

A tool for generating links to files/folders in your dropbox folder

##Usage
test.js demonstrates how to use it.

##Requirements
You need to obtain an app-key and app-secret code from the Dropbox developer console.

Then put you app-key in the link below and follow it.

https://www.dropbox.com/1/oauth2/authorize?client_id=<app-key>&response_type=code

Once you click authorize, you will be presented with an authentication code, copy it and save it.

Dropbox.js requires a settings.json file with your app-key, app-secret and authentication-code so it can authenticate with Dropbox.com

The file should look like this:
{"appKey":"<your-app-key>","appSecret":"<your-app-secret>","authCode":"your-auth-code"}

