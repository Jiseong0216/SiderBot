const { RichEmbed } = require('discord.js');

exports.run = (client, message, args, ops) => {
    const aembed = new RichEmbed()
        .setColor("#3d3d3d")
        .setTitle("리로드 | Reload")
        .setDescription("당신은 봇 개발자가 아닙니다.\n**봇 개발자**: Joy_-#5554")

    const bembed = new RichEmbed()  
        .setColor("#3d3d3d")
        .setTitle("리로드 | Reload")
        .setDescription("그 파일을 리로드 할 수 없습니다.")

    const cembed = new RichEmbed()
        .setColor("#3d3d3d")
        .setTitle("리로드 | Reload")
        .setDescription(`그 파일을 리로드 했습니다.\n\n\n파일 이름: **${args[0]}**`);

    if (message.author.id !== ops.ownerID) return message.channel.send(aembed);

    try {
        delete require.cache[require.resolve(`./${args[0]}.js`)];
    } catch (e) {
        return message.channel.send(bembed);
    }
    message.channel.send(cembed);
}