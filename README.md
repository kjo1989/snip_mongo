# snip_icons install and run in Windows


[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Getting Started


Install mongo.
 
 1) Go to https://www.mongodb.com/download-center/community.
 
 2)Choose 4.1.7 version, Your OS, package ZIP (for Windows) and submit the download button.
 
 3)On C: create the directory data/db (*required), then select the bin folder from downloading mongo files,
 
 and paste it in data/db.
 
 4) Run cmd and type the following commands:
 
 ```
 > C: (You will be in the C: directory)
 > cd data/db/bin
 > mongod
 ``` 
 
 See the result:
 
 on the last line You'll see the text such as 
 ...connection accepted from 127.0.0.1.60107 etc...
 
 5)Clone or download the project.
 
 6)Open the IDE (JET BRAINS IDE-s (Web Storm, Php Storm)), in File menu click /open directory/,
 select the project.
 
 7)Right click on the root, select the /open terminal/,
 
 in in terminal type /
 ```
 1. npm install
 ```
 ```
  2.npm start
   ```
   in the positive result you will see  /Server running at
  http://127.0.0.1:3000/

8) Then right click on the frontend folder, select the /open terminal/,

in this terminal type /
```
1.npm install
 ```
 ```
 2.ng serve --o --port
 ```

9)After these actions the project will be opened automatically.

