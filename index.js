const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '-';
const ownerID = '579196200633237528';
const active = new Map();

const db = require('quick.db');

let statuses = ["사이다 마시는중", "사이다 1200원이에요 제발 저를 사주세요"];

client.on('ready', () => {
    setInterval(function() {

        let status = statuses[Math.floor(Math.random()*statuses.length)];

        client.user.setPresence({ game: { name: status }, status: 'online' });

    }, 7000)
})

client.on('message', message => {

    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {

        delete require.cache[require.resolve(`./commands/${cmd}.js`)];

        let ops = {
            ownerID: ownerID,
            active: active
        }

        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message,args, ops);

    } catch (e) {
        console.log(e.stack);
    }

});

client.on('ready', () => console.log('봇 정상 작동!'));

client.login('NjgzMjQ0NDEzNTc2OTM3NDcy.Xloy7g.qhwYIms5OSEK7tdxHRUKmlGukY4');