const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var os = require('os');

var lastMessage;
var times = 0;

var logInTerminal = true;
var logInFile = true;
var logFile = "";

function getTime() {
	var date = new Date(Date.now());
	var hours = date.getHours(), minutes = date.getMinutes(), seconds = date.getSeconds();
	if(hours <= 9) {
		hours = "0" + hours;
	}
	if(minutes <= 9) {
		minutes = "0" + minutes;
	}
	if(seconds <= 9) {
		seconds = "0" + seconds;
	}
	return `${hours}:${minutes}:${seconds}`;
}

function log(msg) {
	var newMessage = `[${getTime()}] ${msg}`;
	if(logInTerminal) {
		console.log(newMessage);
	}
	if(logInFile) {
		fs.appendFile(logFile, newMessage + '\n', function() {});
	}
}

if (!fs.existsSync("./logs") && logInFile) {
	console.log("Creating logs directory...");
	fs.mkdirSync("./logs");
}

for(var logL = 0; logL >= 0; logL+=1) {
	if(!fs.existsSync(`./logs/log${logL}.txt`)) {
		logFile = `./logs/log${logL}.txt`;
		break;
	}
}

log("ChatRec v1.0");
log(`Running on ${os.arch()} ${os.type()} system as ${os.hostname()}!`)

client.on('ready', () => {
  log(`Logged in on Discord as ${client.user.tag}.`);
  log(`Registered to ${client.guilds.size} guilds.`);
});

client.on('message', (message) => {
	if(message.guild === null && (message.channel instanceof Discord.DMChannel || message.channel instanceof Discord.GroupDMChannel)) {
		if(message.author === client.user) {
			log(`DM: ${message.author.tag} -> ${message.channel.recipient.tag}`);
			log(`Sent at ${message.createdAt}`);
		} else {
			log(`DM: ${message.author.tag} -> ${client.user.tag}`);
			log(`Received at ${message.createdAt}`);
			if(message.cleanContent == lastMessage) {
				times += 1;
				log(`Received duplicate message ${times} times! Possible spam?`);
				return;
			}
			times = 0;
			lastMessage = message.cleanContent;
		}
		log(`${message.cleanContent}`);
		return;
	}
	if(message.author === client.user) {
		log(`Message sent to "${message.guild}": ${message.author.tag} -> #${message.channel.name}`);
		log(`Sent at ${message.createdAt}`);
	} else {
		log(`Message received on "${message.guild}": ${message.author.tag} -> #${message.channel.name}`);
		log(`Received at ${message.createdAt}`);
		if(message.cleanContent == lastMessage) {
			times += 1;
			log(`Received duplicate message ${times} times! Possible spam?`);
			return;
		}
		times = 0;
		lastMessage = message.cleanContent;
	}
	log(`${message.cleanContent}`);
});

log("Proceding to log in to Discord...");
client.login("<your token>"); // get your token from Discord
// in discord client, press CTRL-SHIFT-I, go to Application, Local Storage, select https discord bla bla, and then get the token without ""'s and copy it into client.login("<token"), where <token> is your token.