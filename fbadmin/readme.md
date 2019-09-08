# OTS-Poll App Admin SDK

This is the node.js based firebase admin SDK for the OTS-Poll app.

to use it, you'll have to store your projects Admin SDK under the name ServiceAccountKey.json inside the fbadmin folder. But do not store it to a public repositiory!

## Scripts

Right now, the Admin SDK supports the following npm / node scripts to read or modify user data.

### promote <userId> | grant user admin rights

copy the userId from the firebase console and type: "npm rum promote <userId>" to the console. (make sure you navigated to the \fbadmin folder)

### userList | console log of all users

"npm rum userlist" => short info (id, email, displayName, customClaims)
"npm rum userlist all" => all user Information
