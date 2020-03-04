const { RichEmbed } = require('discord.js');

exports.run = async (client, message, args, ops) => {
    const hembed = new RichEmbed()
        .setColor('#3d3d3d')
        .setTitle('명령어')
        .setDescription('➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖\n\n📫[사이다 커뮤니티](https://discord.gg/xwZth73) | [사이다 봇 초대](http://bitly.kr/4yWY7tt4)\n\n➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖')
        .addField('🎵 노래', '``노래 [노래 이름]`` ``재생목록`` ``스킵``')

    const tembed = new RichEmbed()
        .setColor('#3d3d3d')
        .setTitle("**TIP**")
        .setDescription("명령어 사용방법은 사이다 커뮤니티에 나와있어요!")

    const cembed = new RichEmbed()
        .setColor('#3d3d3d')
        .setTitle("📫")
        .setDescription(`게인메시지로 사이다봇 명령어를 보내드렸어요!`)

    message.author.send('➖➖➖➖➖➖➖➖➖➖➖➖➖➖➖');
    message.author.send(hembed);
    message.author.send(tembed);
    message.channel.send(cembed);
}