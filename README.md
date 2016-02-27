# **Rust Experimental WebRcon**

Rust Experimental is a game from British company Facepunch Studios. And this is
Promise-based JavaScript library for Rcon connection to the server with websockets.

You may use source file rust-webrcon.js (ES6) or minified version rust-webrcon.min.js (ES5)

## **Usage**

```js
var rust = new RustWebRcon('rcon_password','server_ip','rcon_port')

// Use it in some event hadler
rust.open()
$('button').click(() => {
	rust.cmd('status')
	.then(data => { '...do some work with response object' })
})

// Or execute commands with "then" chaining after connecting
rust.open()
.then(rust.cmdThen('status'))
.then(data => console.log(data.Message)) // hostname: Test Serv version : 1355 secure (secure...
.then(rust.cmdThen('another amazing command'))
.then(...)
	 
// And don't do this
// because connection may not yet be established
rust.open()
rust.cmd('status') //will throw error: Connection isn't established yet
```

## **API**

#### open(): Promise

Open new connection

#### close(): Promise

Close current connection

#### cmd(string: command, number: identifier): Promise

Send Rcon command


Parameters
+ `string: command` - Command to execute. See [full command list](http://playrustwiki.com/wiki/Server_Commands).
+ `number: identifier` - Your server's identity. Avoid spaces, special characters.

#### cmdThen(string: command, number: identifier): Function

Send Rcon command - method for using with promise's .then()


Parameters
+ `string: command` - Command to execute. See [full command list](http://playrustwiki.com/wiki/Server_Commands).
+ `number: identifier` - Your server's identity. Avoid spaces, special characters.

## **Example of server response**
```JSON
// JSON string
{
"Identifier": 0,
"Message": "Saved 9,145 ents, serialization(0.00), write(0.00) ...",
"Stacktrace": "",
"Type": 3
}
```
## **License**

This software is released under the terms of the MIT license.