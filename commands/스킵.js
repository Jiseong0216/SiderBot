const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    
    const aembed = new RichEmbed()
        .setColor('#ff4026')
        .setTitle(':musical_note: 노래')
        .setDescription('현재는 노래가 재생중이지 않습니다.')

    if (!fetched) return message.channel.send(aembed);

    const bembed = new RichEmbed()
        .setColor('#ff4026')
        .setTitle(':musical_note: 노래')
        .setDescription('봇이 당신에 음성채널에 있지 않습니다.')

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send(bembed);

    let userCount = message.member.voiceChannel.members.size;

    let required = Math.ceil(userCount/2);

    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    const cembed = new RichEmbed()
        .setColor('#ff4026')
        .setTitle(':musical_note: 노래')
        .setDescription(`당신은 이미 스킵에 찬성을 하셨습니다.`)

    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(cembed);

    fetched.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, fetched);

    if (fetched.queue[0].voteSkips.length >= required) {

        const dembed = new RichEmbed()
            .setColor('#77ff00')
            .setTitle(':musical_note: 노래')
            .setDescription(`모두가 스킵에 찬성했습니다. 노래를 스킵합니다.`)

        message.channel.send(dembed);

        return fetched.dispatcher.emit('end');

    }

    const dembed = new RichEmbed()
        .setColor('#77ff00')
        .setTitle(':musical_note: 노래')
        .setDescription(`스킵에 찬성하셨습니다. \n\n**TIP**\n남은 인원이 모두 스킵을 해야만 노래가 스킵됩니다.\n\n**남은인원**\n **스킵에 찬성한 인원**: ${fetched.queue[0].voteSkips.length}명\n**통화방 인원**: ${required}명`)

    message.channel.send(dembed)


}