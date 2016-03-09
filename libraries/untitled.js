var server = require('http').createServer()
server.listen(process.env.PORT || 8001)

function User(socket) {
 	var self = this
 	this.socket = socket
 	this.name = ""
	this.groupListening = {}
	this.isBroadcaster = false
}

function GroupListening() {
	this.io = require('socket.io')(server)

	this.addHandlers()
}

GroupListening.prototype.addHandlers = function() {
	var groupListening = this

	this.io.sockets.on("connection", function(socket) {
		groupListening.addUser(new User(socket))
	})
}

GroupListening.prototype.addUser = function(user) {
	console.log("Add user called")

	user.socket.on("broadcastBegin", function() {
		user.isBroadcaster = true
	})

	user.socket.on("requestToJoin", function(listenerName) {
		console.log("new user requested to join station, user name is " + listenerName)

		user.socket.broadcast("requestForSong", { name : listenerName })

		// tmpSocket.on("songData", function(songName, songID) {
		// 	user.socket.emit("songInformation", {songName : songName, songID: songID})
		// })
	})

	user.socket.on("songData", function(song, songID) {
		user.socket.broadcast("songDataForListener", {name: song, id: songID})
	})

}


// GroupListening.prototype.userBroadcasted = function(user, songName, songID) {
// 	this.broadcaster = user
// 	console.log("broadcaster created")
// 	this.broadcaster.socket.on("broadcast", function(songName, songID, broadcasterName) {
// 		self.console.log("broadcasting song")
// 	})
// }

// GroupListening.prototype.userJoined = function(user, songName, songID) {
// 	this.listener = user
// 	console.log("listener created")
// 	this.listener.socket.on("join", function(songName, songID, listenerName) {
// 		self.console.log("joining song")
// 	})
// }

//Start Group Listening Session
var groupListening = new GroupListening()