```
┌───────────────────────────────────────────────┐
                                       _
     __ _  ___   ___  _ __ _ __ ___   (_) ___
    / _` |/ _ \ / _ \| ‘__| ‘_ ` _ \  | |/ _ \
   | (_| | (_) | (_) | |  | | | | | |_| | (_) |
    \__, |\___/ \___/|_|  |_| |_| |_(_)_|\___/
    |___/
			      𝘼𝙣𝙮𝙤𝙣𝙚 𝙘𝙖𝙣 𝙙𝙚𝙫𝙚𝙡𝙤𝙥!
└───────────────────────────────────────────────┘
```
# goormIDE
Welcome to goormIDE!
goormIDE is a powerful cloud IDE service to maximize productivity for developers and teams.
**DEVELOP WITH EXCELLENCE**
`Happy coding! The goormIDE team`

## Make a customized Chat Web
 * Tech
	* This project uses `React.js` `socket.io` `materialUI` `express`.
 * Target
    * Someone who wants to study React.
    * Someone who wants to experience the appeal of web socket using socket.io.
    * Someone who is looking for a web project with an interesting topic.
    * Someone who wants to customize and complete your own chat room.
 * Description
	* Entering chat rooms and sending/receiving messages using socket.io are developed.
        * Write with event names such as JOIN_ROOM, SEND_MESSAGE, UPDATE_MESSAGE, etc.
        * DB is not connected by default.
        * The DB default setting is enabled by setting up MongoDB connection and disabling annotation processing of server/src/index.js file and setting it in the config file.
    * Make your own Goormee-Talk by customizing your messages by actually putting them in the DB, adding profiles to each user, and making a chat room list!
 * Folder Structure
```
.
|-- client
|   |-- node_modules
|   |-- package-lock.json
|   |-- package.json
|   |-- public
|   `-- src
|			|-- components
|			|   |-- Chat
|			|   |-- ChatRoomEntry
|			|   `-- Message
|			|-- containers
|			|   |-- Chat.jsx
|			|   `-- ChatRoomEntry.jsx
|			|-- contexts
|			|   `-- SocketContext.jsx
|			|-- index.js
|			`-- pages
|			    |-- chat.jsx
|			    |-- main.jsx
|			    `-- page.module.scss
`-- server
    |-- config
    |-- node_modules
    |-- package-lock.json
    |-- package.json
    `-- src

```

## 🎨 Usage
1. Check URL and Port
   1. Click `PROJECT > Running URL and Port` on top menu bar.
   2. Register client and server domains with 3000 and 3001 ports.
2. Environment variables and config settings
    1. In the client path, '.Create 'env.development' file.
    2. Insert `REACT_APP_SERVER_URL = <server domain you set>` into the file.
    3. Create the file 'config/default.js' in the server path.
    4. Set the file as follows:
    ```
    module.exports = {
        db: { //If you use Mongodb atlas, set it up.
           mongoUrl: ""
        },
        port: 3001, //Set it to match the server port set in step 1.
        client: "" //Set the same as the client URL set in step 1.
    }
    ```
3. Check Dependencies.
   1. `cd client && npm i && cd ../server && npm i && cd ..` into terminal.
4. Run Project
   * Execute command (top right of IDE)
       * click `run client and client`

## 🔧  Tip & Guide
* Command feature
	* You can simply run your script using the shortcut icons on the top right.
	* Check out `PROJECT > Common/Build/Run/Test/Find Command` in the top menu.
	
* Get URL and Port
	* Click `PROJECT > URL/PORT` in top menu bar.
	* You can get default URL/Port and add URL/Port in the top menu.
* Useful shortcut
	
| Shortcuts name     | Command (Mac) | Command (Window) |
| ------------------ | :-----------: | :--------------: |
| Copy in Terminal   | ⌘ + C         | Ctrl + Shift + C |
| Paste in Terminal  | ⌘ + V         | Ctrl + Shift + V |
| Search File        | ⌥ + ⇧ + F     | Alt + Shift + F  |
| Terminal Toggle    | ⌥ + ⇧ + B     | Alt + Shift + B  |
| New Terminal       | ⌥ + ⇧ + T     | Alt + Shift + T  |
| Code Formatting    | ⌥ + ⇧ + P     | Alt + Shift + P  |
| Show All Shortcuts | ⌘ + H         | Ctrl + H         |

## Support & Documentation
Visit [https://ide.goorm.io](https://ide.goorm.io) to support and learn more about using goormIDE.
To watch some usage guides, visit [https://help.goorm.io/en/goormide](https://help.goorm.io/en/goormide)