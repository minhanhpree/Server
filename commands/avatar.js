const Discord = require('discord.js');
const axios = require('axios');
let config = require('../configs.json');
module.exports = {
    name: 'avt',
    description: 'xem avatar ...',
     execute( message, args) {
        if (message.deletable) message.delete()
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
            const URL = member.user.avatarURL({ format: 'jpg', dynamic: true, size: 1024})
            const Embed = new Discord.MessageEmbed()
                .setImage(URL)
                .setURL(URL)
                .setTitle('BẤM VÔ XEM SỰ CUTE')
            message.channel.send(Embed)
        
    }
}


