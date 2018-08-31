const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const fs = require('fs');
const moment = require('moment');
require('./util/eventLoader')(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'hosgeldin');
  if (!channel) return;
    const hg = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription('Sunucuya yeni biri katýldý hoþgeldin! ' + ${member});
    return channel.sendEmbed(hg);
});

client.on('guildMemberRemove', member => {
  const channel = member.guild.channels.find('name', 'hosgeldin');
  if (!channel) return;
     const bb = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setThumbnail(member.user.displayAvatarURL)
    .setDescription('Sunucudan ' + ${member} + 'ayrýldý güle güle!');
    return channel.sendEmbed(bb);
});





client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'herkese çay') {
    msg.reply('Þakire Yooh :smile:');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'sigara ic') {
     msg.reply('Sigara Ýçiyorum!');
      msg.edit(' :smoking: :cloud: :cloud: :cloud: ');
      msg.edit(' :smoking: :cloud: :cloud: ');
      msg.edit(' :smoking: :cloud:  ');
      msg.edit(' :smoking:  ');
      msg.edit(' Sigaram Bitti! ÞAKÝR ÝÇÝYO DÝYE SÝZDE ÝÇMEYÝN KAMU SPOTU :smile: ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'peki þakire çay yok') {
    msg.reply('Ne demek Þakir ');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'adýnýmý deðiþtirdin') {
    msg.reply('Sen bana nasýl Þakir dersin lann kelek!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'ne diyem mahmutmu diyem þakir') {
    msg.reply('Þakir abi, dayý, aða diyeceksin!');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'o günler bitti þakir') {
    msg.reply('Ne Demek Bitti');
  }
});

client.on('message', msg => {
  if (msg.content.toLowerCase() === 'þakir') {
    msg.reply('Efendim Ciðerim');
  }
});

client.on('message', msg => {
  if (msg.content === 'þakir bi sus') {
    msg.reply('Susuyorum Ulen Sen Konuþ Ciðerim :smile:');
  }
});

client.elevation = message => {
  if(!message.guild) {
	return; }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
  console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
  console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(process.env.TOKEN);