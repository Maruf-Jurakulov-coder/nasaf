process.env["NTBA_FIX_319"] = 1;
const PORT = process.env.PORT || 3000;
var Regex = require("regex");

const TelegramBot = require('node-telegram-bot-api');
const fs = require('fs');
const path = require('path');
const request = require('request');
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});

// replace the value below with the Telegram token you receive from @BotFather
const token = '1104132630:AAGWf0bCt9qF4aUXVsYfd8_nxRU3XgQfM3k';
// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
//*****************************************************************************************************
bot.on('message', msg=> {
console.log(msg)
        var pattern = /[\u0600-\u06FF\u0750-\u077F]/;
        result = pattern.test(msg.from.first_name);
    if(result){
        bot.deleteMessage(msg.chat.id, msg.message_id);
        bot.kickChatMember(msg.chat.id, msg.from.id)
    }
    else

        result1 = pattern.test(msg.from.last_name);
        if(result1){
            bot.deleteMessage(msg.chat.id, msg.message_id);
            bot.kickChatMember(msg.chat.id, msg.from.id)
    }
    else
            result2 = pattern.test(msg.text);
    if(result2){
        bot.deleteMessage(msg.chat.id, msg.message_id);
        bot.kickChatMember(msg.chat.id, msg.from.id)
    }


})



bot.on('message', msg=>{
    if(msg.text==="/start"){
        const reply = fs.readFileSync("baza.txt", "utf8");
        bot.sendMessage( msg.from.id, "Статистика группы Nasaf Med:\n\n Количество вступлений - "+reply);
    }
})

bot.on('message', msg=>{
    if(String(msg.chat.id) == "-1001438737022"){

        var news = msg.new_chat_members.length;
        const schet = fs.readFileSync("baza.txt", "utf8");
        var itog = Number(news)+Number(schet)
        fs.writeFileSync("baza.txt",  String(itog));

    }

})

app.get ('/home', (req, res) => {
    return res.send ('Привет');
});
