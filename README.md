dropbox-mk2
===========

A tool for generating links to files/folders in your dropbox folder

##Usage
test.js demonstrates how to use it.

##Requirements
You need to obtain an app-key and app-secret code from the Dropbox developer console.

Then put you app-key in the link below and follow it.

https://www.dropbox.com/1/oauth2/authorize?client_id=app-key&response_type=code

Once you click authorize, you will be presented with an authentication code, copy it and save it.

Dropbox.js requires a settings.json file with your app-key, app-secret and authentication-code so it can authenticate with Dropbox.com

The file should look like this:
{"appKey":"your-app-key","appSecret":"your-app-secret","authCode":"your-auth-code"}

##Notes
This is my first attempt at publishing a node module, so be gentle :)

dropbox-mk2, is a very simple wrapper for the dropbox API, I wrote it as I struggled with the other modules I came across dbox and dropbox. 

I have only got the shareUrl function working as that is the only one I need.

I have left all the debug logging enabled.

Currently the dropox object takes a few hundred milliseconds to get ready, if you call it before it is ready you will get an "err not ready" message. you can check dropbox.ready() if you want to know if it is ready yet. I'm sure there is a nicer way to do this.

If anyone wants to make any changes, I'm happy to accomodate.
