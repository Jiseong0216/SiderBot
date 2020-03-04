const ytdl = require('ytdl-core');
const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, ops) => {

    const aembed = new RichEmbed()
        .setColor('#ff4026')
        .setTitle(':musical_note: 노래')
        .setDescription('음성채널에 들어가서 플레이 명령어를 사용하십시오.')

    if (!message.member.voiceChannel) return message.channel.send(aembed);

    const cembed = new RichEmbed()  
        .setColor('#ff4026')
        .setTitle(':musical_note: 노래')
        .setDescription("유튜브 영상 링크를 부여하십시오.")

    if (!args[0]) return message.channel.send(cembed);

    let validate = await ytdl.validateURL(args[0]);

    const dembed = new RichEmbed()
        .setColor('#ff4026')
        .setTitle(':musical_note: 노래')
        .setDescription('유효한 유튜브 영상 링크를 부여하십시오.')

    if (!validate) return message.channel.send(dembed);

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voiceChannel.join();
    if (!data.queue) data.queue = [];
    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) playStream(client, ops, data);
    else {

        const eembed = new RichEmbed()
            .setColor('#77ff00')
            .setTitle(`:musical_note: 노래 | ${info.title}`)
            .setDescription('노래가 재생목록에 추가 되었습니다.')

        message.channel.send(eembed);
    }

    ops.active.set(message.guild.id, data);

}

async function playStream(client, ops, data) {

    const fembed = new RichEmbed()
        .setColor('#77ff00')
        .setTitle(`:musical_note: 노래 | ${data.queue[0].songTitle}`)
        .setDescription('노래가 재생됩니다.')

    client.channels.get(data.queue[0].announceChannel).send(fembed)

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly' }));
    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function() {
        end(client, ops, this);
    });

}

function end(client, ops, dispatcher) {
    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetched);

        playStream(client, ops ,fetched);

    } else {
        ops .active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;
        if (vc) vc.leave();

    }
}
