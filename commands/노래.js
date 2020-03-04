const { RichEmbed } = require('discord.js');
const search = require('yt-search');

exports.run = (client, message, args, ops) => {
    search(args.join(' '), function(err, res) {
        if (err) return message.channel.send('알수 없는 오류가 발생했습니다. 개발자에게 문의 하십시오.');

        let videos = res.videos.slice(0, 5);

        let resp ='';
        for (var i in videos) {
            resp += `**${parseInt(i)+1}) \`${videos[i].title}\`\n\n`;
        }

        resp += `\n**번호를 선택하십시오. \`1-${videos.length}\``;

        message.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0;
        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;

        collector.once('collect', function(m) {

            let commandFile = require(`./playurl.js`);
            commandFile.run(client, message, [this.videos[parseInt(m.content)-1].url], ops);

        });

    });
}