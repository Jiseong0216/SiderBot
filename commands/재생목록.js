const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);

    const aembed = new RichEmbed()
        .setColor('#ff4026')
        .setTitle(':musical_note: 노래')
        .setDescription('현재는 아무노래도 재생중이지 않습니다.')

    if (!fetched) return message.channel.send(aembed);

    let queue = fetched.queue;
    let nowPlaying = queue[0];

    const rembed = new RichEmbed()
        .setColor('#77ff00')
        .setTitle(':musical_note: 노래')
        .setDescription()
    
    let resp = `:musical_note: 노래\n\n\n**현재 재생중인 노래**\n${nowPlaying.songTitle}\n\n**다음 노래**\n-----------------`;

    for (var i = 1; i < queue.length; i++) {

        resp += `\n\n**-** ${queue[i].songTitle}`
    }

    message.channel.send(resp);

}