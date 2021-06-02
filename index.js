const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
const config = require('./configs.json');
const BOT_TOKEN = config.token;
const PREFIX = config.PREFIX;
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
const axios = require('axios')
let PlayerCount = require('./server/players');
const url = config.SERVER_URL;
const request = require('request');

client.on('ready', () => {
  client.user.setActivity(`Đang Hubo ...`)
    console.log(`${client.user.username} ✅`)
})
client.on('message', msg => {
    if (msg.content === 'ip'){ 
        const embed = new Discord.MessageEmbed()
        .setTitle('Theo thông tin !')
        .setDescription(`
        connect "cfx.re/join/8eg6l5".
        `)
        .setThumbnail('https://i.imgur.com/toywRc9.png')
        msg.channel.send(embed)
        msg.reply('Đang Update ...')
    }
    else if(msg.content === 'tony') {
        const embed = new Discord.MessageEmbed()
        .setTitle('Theo thông tin !')
        .setDescription(`
        là một người anh vĩ đại với tài chỉ huy tài ba nhưng khổ nổi là mấy thằng ngu thường không nghe.
        `)
        .setThumbnail('https://i.imgur.com/toywRc9.png')
        .setColor('RED')
        msg.channel.send(embed)
        msg.reply('Đang Update ...')
    }
    else if(msg.content === 'Rồng Hubo') {
        msg.channel.send('Đang Hubo gọi cái gì ?')
    }
    else if(msg.content === 'Rồng đâu') {
      msg.channel.send('Tao đây! Gọi tao có cái gì không ?')
    }
    else if(msg.content === 'nhanngao') {
      msg.channel.send('Mập địt toàn ngủ quên trước giờ chiếm đóng.')
    }
    else if (msg.content === '.ticket') {
      const ch = msg.guild.channels.cache.find(ch => ch.name === msg.author.id)
        if(ch) return msg.channel.send('You already have a ticket open.')
        msg.guild.channels.create(`${msg.author.id}`, {
            type : 'text',
            parent : '817059262403706892',
            permissionOverwrites : [
                {
                    id : msg.guild.id,
                    deny : ['VIEW_CHANNEL']
                },
                {
                    id : msg.author.id,
                    allow : ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ADD_REACTIONS', 'ATTACH_FILES']
                }
            ]
        }).then(async channel=> {
            msg.reply(`click <#${channel.id}> to view your ticket`)
            channel.send(`${msg.author}, welcome to your ticket!`)
        })
    }
    else if (msg.content === '.close') {
      if(msg.channel.parentID !== '817059262403706892') return msg.channel.send('Bạn chỉ có thể sử dụng lệnh này trong một ticket !');
      const transcriptChannel = msg.guild.channels.cache.get('817059262403706894')
      msg.channel.send('Xóa Ticket sau 5 giây .....')
      setTimeout(() => {
          msg.channel.delete().then(async ch=> {
              client.ticketTranscript.findOne({ Channel : ch.id }, async(err, data) => {
                  if(err) throw err;
                  if(data) {
                      fs.writeFileSync(`../${ch.id}.txt`, data.Content.join("\n\n"))
                      transcriptChannel.send(`${msg.guild.members.cache.get(ch.name).user.username}'s ticket đã được đóng.`)
                      await transcriptChannel.send(new MessageAttachment(fs.createReadStream(`../${ch.id}.txt`)));
                      client.ticketTranscript.findOneAndDelete({ Channel : ch.id })
                  }
              })
          })
      }, 5000)
    }
})

client.on('message', msg => {
  if (msg.content === 'sl') {
            request({
          url: "http://139.99.125.64:30120/players.json",
          json: true
      },
        function (error, response, body) {
          if (!error && response.statusCode === 200) {
              var string = '';
              let entry = body
              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,6) == 'SAIGON'|| a.substring(0,6) == 'saigon' || a.substring(0,6) == 'Saigon'){
                  sl = sl + 1;
                 }
              }
            string = string + '●▬▬▬▬▬๑۩ Số Lượng Gang Đang Online ۩๑▬▬▬▬▬●' + '\n';
             string = string + 'Gang Saigon: ' + sl  + '\n';
           
             var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                if(a.substring(0,11) == 'Thiên Triều' || a.substring(0,11) == 'thiên triều' || a.substring(0,11) == 'Thiên triều' || a.substring(0,11) == 'thiên Triều'){
                  sl = sl + 1;
                 }
              }
              string = string + 'Gang Thiên Triều : ' + sl  + '\n';

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,5) == 'Crips' || a.substring(0,5) == 'crips' ){
                  sl = sl + 1;
                 }
              }
             string = string + 'Gang Crips : ' + sl  + '\n';

              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,3) == 'BHG' || a.substring(0,3) == 'Bhg'){
                  sl = sl + 1;
                 }
              }
             string = string + 'Gang BHG: ' + sl  + '\n';
              var sl = 0;
              for (let i=1; i<entry.length; i++) {
                var a = entry[i]["name"];
                 if(a.substring(0,8) == 'Xóm Liều'){
                  sl = sl + 1;
                 }
              }
             string = string + 'Gang Xóm Liều: ' + sl  + '\n';
          }
          const embed = new Discord.MessageEmbed()
          .setTitle('Danh Sách Số Lượng Gang')
          .setDescription(string)
          .setThumbnail('https://i.imgur.com/toywRc9.png')
          .setColor('RED')
          .setTimestamp(new Date())
          msg.channel.send(embed)
          msg.reply('Đang Update ...')
      })
  }
});
for(const file of commandFiles){
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}
client.on('message', message =>{
  if(!message.content.startsWith(PREFIX) || message.author.bot) return
  const args = message.content.slice(PREFIX.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if(!client.commands.has(command)) return
  try {
    client.commands.get(command).execute(message, args);
  } catch (error) {
    console.error(error);
  }
});
client.login(BOT_TOKEN);
