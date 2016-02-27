/**
 * RUST WebSocket Rcon API
 * @class
 */
class RustWebRcon {
	/**
	 * @param {string} pass - rcon password.
	 * @param {string} ip - server ip.
	 * @param {string} port - rcon port.
	 */
	constructor(pass, ip='localhost', port='27018'){
		this.ip=ip
		this.port=port
		this.pass=pass
		this.connected = false
		this.socket = null
	}

	/**
	 * Open new connection through websocket
	 * Return promise that resolves if connection was opened
	 * @return {Promise}
	 */
	['open'](){
		return new Promise((resolve, reject) => {
			if(!this.connected){
				this.socket = new WebSocket(`ws://${this.ip}:${this.port}/${this.pass}`)

				this.socket.onopen = () => {
					if (this.socket.readyState === 1) {
						this.connected = true
						resolve(this.socket)
					}
				}
				this.socket.onerror = (e) => reject('Error in connection establishment')
			}
			else reject('Connection already established')
		})
	}
	
	/**
	 * Close current connection.
	 * Return promise that resolves if connection was closed
	 * @return {Promise}
	 */
	['close'](){
		return new Promise((resolve, reject) => {
			if(this.connected && this.socket.readyState === 1){
				this.socket.close(1000)
				this.socket.onclose = e => {
					this.connected = false
					return resolve(1)
				}
			}
			else throw new Error('Connection isn\'t established yet')
		})
	}
	
	/**
	 * Send rcon command
	 * @param {string} msg - Command to execute.
	 * @param {number} identifier - Server identifier.
	 * @return {Promise}
	 */
	['cmd'](msg, identifier=-1){
		return new Promise((resolve, reject) => {
			this.send(msg, identifier, resolve, reject)
		})
	}
	
	/**
	 * Send rcon command - command for then methods
	 * @param {string} msg - Command to execute.
	 * @param {number} identifier - Server identifier.
	 * @return {Function}
	 */
	['cmdThen'](msg, identifier=-1){
		return (data)=> new Promise((resolve, reject) => {
			this.send(msg, identifier, resolve, reject)
		})
	}
	
	/**
	 * @private
	 */
	['send'](msg, identifier, resolve, reject){
		if(!this.connected) return reject('Connection isn\'t established yet')

		let packet = JSON.stringify({
			'Identifier': identifier,
			'Message': msg,
			'Name': 'WebRcon'
		})
		
		this.socket.onerror = e =>  reject('Error in connection establishment')
		this.socket.onmessage = msg => resolve(JSON.parse(msg.data).Message)
		this.socket.send(packet)
	}
}
window['RustWebRcon'] = RustWebRcon;