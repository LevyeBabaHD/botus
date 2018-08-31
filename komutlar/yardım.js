const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

var prefix = ayarlar.prefix;

exports.run = (client, message, params) => {
  const embedyardim = new Discord.RichEmbed()
  .setTitle("Komutlar")
  .setDescription('')
  .setColor(0x00ffff)
  .addField("**Eğlence ve Kullanıcı Komutları:**", `g!banned = Dene ve Gör! \ng!avatarım = Avatarınınızı Gösterir. \ng!herkesebendençay = Herkese Çay Alırsınız. \ng!koş = Koşarsınız.\ng!çayiç = Çay İçersiniz. \ng!çekiç = İstediğiniz Kişiye Çekiç Atarsınız. \ng!çayaşekerat = Çaya Şeker Atarsınız. \ng!yumruh-at = Yumruk Atarsınız. \ng!yaz = Bota İstediğiniz Şeyi Yazdırırsınız. \ng!sunucuresmi = BOT Sunucunun Resmini Atar. \ng!sunucubilgi = BOT Sunucu Hakkında Bilgi Verir. \ng!kullanıcıbilgim = Sizin Hakkınızda Bilgi Verir. \ng!söv = Size Özelden Söver.`)
  .addField("**Sunucu Yetkilisi Komutları**", `g!-ban = İstediğiniz Kişiyi Sunucudan Banlar. \ng!-kick  = İstediğiniz Kişiyi Sunucudan Atar. \ng!unban = İstediğiniz Kişinin Yasağını Açar. \ng!-sustur = İstediğiniz Kişiyi Susturur. -MUTED- \ng!oylama = Oylama Açar. \ng!duyurbot = Güzel Bir Duyuru Görünümü Sağlar.`)
  .addField("**Botun Ana Komutları**", "g!yardım = BOT Komutlarını Atar. \g!bilgi = BOT Kendisi Hakkında Bilgi Verir. \ng!ping = BOT Gecikme Süresini Söyler. \ng!davet = BOT Davet Linkini Atar. \ng!istatistik = BOT İstatistiklerini Atar.")
  .addField("**Gizli Komutlar:**", "  BULUNMAMAKTADIR ")
  .setFooter('**Beni Yaratan =ＬＥＶＹＥ#8336**  ')


  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
    const longest = commandNames.reduce((long, str) => Math.max(long, str.length), 0);
    message.channel.send(embedyardim);
  } else {
    let command = params[0];
    if (client.commands.has(command)) {
      command = client.commands.get(command);
      message.author.send('asciidoc', `= ${command.help.name} = \n${command.help.description}\nDoğru kullanım: ` + prefix + `${command.help.usage}`);
    }
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['h', 'halp', 'help', 'y'],
  permLevel: 0
};

exports.help = {
  name: 'yardım',
  description: 'Tüm komutları gösterir.',
  usage: 'yardım [komut]'
};
