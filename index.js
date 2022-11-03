const Discord = require("discord.js")

const TOKEN = "MTAzNjI0NjU0Mzc1OTU4OTQyOA.G4-mUk.1Ov149xrUlvs78fik9aDkuhtmKpFA4QuYd3eVI"

const client = new Discord.Client({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS",
        "GUILD_PRESENCES",
        "GUILD_MESSAGE_REACTIONS"
    ]
})

const prefix = '!'


client.on("ready", () => {
    console.log(`Zalogowany jako ${client.user.tag}`)
})

//główna zawartość
client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot) return

     const args = message.content.slice(prefix.length).split(/ +/)
     const command = args.shift().toLowerCase()

     const messageArray = message.content.split(" ")
     const argument = messageArray.slice(1)
     const cmd = messageArray[0]

  
//komenda sprawdzająca działanie bota
if(command === 'hej'){
    message.reply('Ello!')
} 


//komenda do linku do kanału
if (command == 'youtube'){
    message.reply('https://youtube.com/@Kubuse');
}


// komenda pomoc
if (command === 'pomoc'){

    const embed = new Discord.MessageEmbed()
    .setColor('PURPLE')
    .setTitle('Centrum Pomocy')
    .setDescription('========================== \n \n Lista dostępnych komend: \n \n !hej - Przywitanij się z botem \n \n !siemak - Siemak kopiuje unsub \n \n !youtube - wyświetla kanał Kubuse \n \n !adm - Panel z komendami administracyjnymi \n \n ==========================')
    .setThumbnail('https://cdn.discordapp.com/attachments/1036247413976989788/1036749100776955924/1667250627673.png')
    .setTimestamp()
    .setFooter(`Guide BOT by ${message.author.tag}`)

    message.channel.send({ embeds: [embed]})
}


//komenda adm
if (command === 'adm'){

    const embed = new Discord.MessageEmbed()
    .setColor('PURPLE')
    .setTitle('Panel Administracyjny')
    .setDescription(`========================== \n \n Witaj użytkowniku \n \n ============================== \n \n Lista dostępnych komend dla administracji: \n \n ============================== \n \n !kick - Wyrzuca oznaczonego użytkownika serwera \n \n !ban - Banuje oznaczonego użytkownika \n \n !mute - Wycisza oznaczonego użytkownika \n \n !unmute - Odcisza oznaczonego użytkownika \n \n !warn - Ostrzega oznaczonego użytkownika \n \n ==========================`)
    .setThumbnail('https://cdn.discordapp.com/attachments/1036247413976989788/1036749100776955924/1667250627673.png')
    .setTimestamp()
    .setFooter(`Guide BOT by ${message.author.tag}`)

    message.channel.send({ embeds: [embed]})
}


//komenda kick
if (command === 'kick') {
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
    if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("Nie masz permisji do tej komendy...")
    if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send("Nie mam permisji do kickowania...")
    if (message.member === member) return message.channel.send("Nie możesz sie wyrzucić, nie rozumiesz?!")
    if (!member.kickable) return message.channel.send("Chłop ma wieksze permisje od Ciebie TYPIEEE!")
    if (!argument[0]) return message.channel.send("BRRR")
    
    let reason = argument.slice(1).join(" ") || 'Bez powodu.'
    
    const dmEmbed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark:  Zostałeś **kicknięty** z ${message.guild.name} | ${reason} `)
    .setColor("BLUE")
    
    const embed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark:  ${member} został **kicknięty** | ${reason}`)
    .setColor("BLUE")


    member.send({ embeds: [dmEmbed] }).catch(err => {console.log("This user has their DMs off!")})

    member.kick().catch(err => {message.channel.send("Jakiś error")})
      
    message.channel.send({ embeds: [embed] })
}


//komenda ban
if (command === 'ban') {
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
    if (!message.member.permissions.has("BAN_MEMBERS")) return message.channel.send("Nie masz permisji do tej komendy...")
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) return message.channel.send("Nie mam permisji do banowania...")
    if (message.member === member) return message.channel.send("Nie mozesz sie zbanować, nie rozumiesz?!")
    if (!member.kickable) return message.channel.send("Chłop ma wieksze permisje od Ciebie TYPIEEE!")
    if (!argument[0]) return message.channel.send("BRRR")
    
    let reason = argument.slice(1).join(" ") || 'Bez powodu.'
    
    const dmEmbed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark:  Zostałeś **zbanowany** z ${message.guild.name} | ${reason} `)
    .setColor("BLUE")
    .setImage("https://cdn.discordapp.com/attachments/1036247413976989788/1036583651422523402/undertale-heartbreak.gif")
    
    const embed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark:  ${member} został **zbanowany** | ${reason}`)
    .setColor("BLUE")
    .setImage("https://cdn.discordapp.com/attachments/1036247413976989788/1036583651422523402/undertale-heartbreak.gif")

    member.send({ embeds: [dmEmbed] }).catch(err => {console.log("This user has their DMs off!")})

    member.ban().catch(err => {message.channel.send("Jakiś error")})
      
    message.channel.send({ embeds: [embed] })
}


//komenda warn
    if(command === 'warn'){
        const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
        if (!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("Nie masz permisji do tej komendy...")
        if (!message.guild.me.permissions.has("KICK_MEMBERS")) return message.channel.send("Nie mam permisji do warnowania...")
        if (message.member === member) return message.channel.send("Nie mozesz dać sobie warna, nie rozumiesz?!")
        if (!member.kickable) return message.channel.send("Chłop ma wieksze permisje od Ciebie TYPIEEE!")
        if (!argument[0]) return message.channel.send("BRRR")
        
        let reason = argument.slice(1).join(" ") || 'Bez powodu.'
        
        const dmEmbed = new Discord.MessageEmbed()
        .setDescription(`:white_check_mark:  Otrzymałeś **ostrzeżenie** z ${message.guild.name} za ${reason} `)
        .setColor("BLUE")
        
        const embed = new Discord.MessageEmbed()
        .setDescription(`:white_check_mark:  ${member} otrzymał **ostrzeżenie** za ${reason}`)
        .setColor("BLUE")
        
        message.channel.send({ embeds: [embed] })
        member.send({ embeds: [dmEmbed] }).catch(err => {console.log("This user has their DMs off!")})
}  



//komenda mute
if(command === "mute"){
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
    const muteRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"))
    const muteUser = message.mentions.members.first()
    const muteReason = argument.slice(1).join(" ") || "Bez powodu"

    if(!argument[0]) return message.channel.send("Musisz kogoś podać...")
    if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("Nie masz permisji do tej komendy!")
    if (message.member === member) return message.channel.send("Nie mozesz się wyciszyć, nie rozumiesz?!")
    if(!muteUser) return message.channel.send("Komu mam dać mute?")
    if(!muteRole) return message.channel.send("Nie ma takiej roli jak muted!")

    muteUser.roles.add(muteRole)

    const embed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark:  ${muteUser.user.username} został **wyciszony** za ${muteReason} `)
    .setColor("BLUE")
        
    const dmEmbed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark:  ${member} zostałeś **wyciszony** na serwerze ${message.guild.name} za ${muteReason}`)
    .setColor("BLUE")

    message.channel.send({ embeds: [embed] })
    muteUser.send({ embeds: [dmEmbed] }).catch(err => {console.log('This user has their DMs off!')})
}


//komenda unmute
if(command === "unmute"){
    const member = message.mentions.members.first() || message.guild.members.cache.get(argument[0]) || message.guild.members.cache.find(x => x.user.username.toLowerCase() === argument.slice(0).join(" ") || x.user.username === argument[0])
    const muteRole = message.guild.roles.cache.find(role => role.name.toLowerCase().includes("muted"))
    const muteUser = message.mentions.members.first()

    if(!argument[0]) return message.channel.send("Musisz kogoś podać...")
    if(!message.member.permissions.has("KICK_MEMBERS")) return message.channel.send("Nie masz permisji do tej komendy!")
    if(!muteUser) return message.channel.send("Kogo mam odciszyć?")

    muteUser.roles.remove(muteRole)

    const embed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark:  ${member} został **odciszony**.`)
    .setColor("BLUE")
    
    const dmEmbed = new Discord.MessageEmbed()
    .setDescription(`:white_check_mark:  ${member} zostałeś **odciszony** na serwerze.`)
    .setColor("BLUE")

    message.channel.send({ embeds: [embed] })
    member.send({ embeds: [dmEmbed] }).catch(err => {console.log('This user has their DMs off!')})
}
});


//sus
client.on('message', message =>{
    if (message.content == "sus"){
        const embed = new Discord.MessageEmbed()
        .setImage('https://i.imgflip.com/5dhb6a.gif')
        message.channel.send({ embeds: [embed] })
    }

    if(message.content == 'siemak'){
        message.channel.send('Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub! Siemak kopiuje unsub!')
    } 
    
})


//powitanie gracza na serwerze - brak zastosowania
client.on("guildMemberAdd", async (member) => {
    const welcomeChannelId = "1036288151708237834";
    member.guild.channels.cache.get(welcomeChannelId).send({
        content: `<@${member.id}> Witaj na serwerze!`,
    })
})




//login bota
client.login(TOKEN)


     
