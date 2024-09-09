// подключение библиотек:
const {HtmlTelegramBot, userInfoToString} = require("./bot");
const ChatGptService = require("./gpt");

class MyTelegramBot extends HtmlTelegramBot {
    constructor(token) {
        super(token);
    }

    async gpt(msg){
        this.mode = 'gpt'
        const text = this.loadMessage('gpt')
        await this.sendImage('gpt')
        await this.sendText(text)
    }

    async gptDialog(msg){
        const text = msg.text;
        const myMessage = await this.sendText('Подождите...')
        const answer = await chatgpt.sendQuestion('Ответьте на вопросы', text)
        await this.editText(myMessage, answer)
    }

    async start (msg){
        this.mode = 'start'
        const text = msg.text;
        //что будет писать бот
        await this.sendText('<b>привет! напиши /gpt что бы пообщаться с ботом!</b>')
        await this.sendText(`Вы написали: ${text}`)
        await this.sendText('<b>hi! write /gpt to chat with bot!</b>')
        await this.sendText(`You're write: ${text}`)
    }

    // Мы будем писать тут наш код
    async hello(msg) {
        if (this.mode === 'gpt')
            await this.gptDialog(msg);
        else{
            await this.start(msg);
        }

    }
}

// обьект телеграмм-бота:
const chatgpt = new ChatGptService('gpt:AI6Jk5emA0osUkc2nivglWTowjq5GNCo2bpddaqxeEU8Jc4C4Zde0k5yHYJFkblB3TZ4vjiZ2EYkjx9hF0XMim3ZuBv5PzgpjMDJRq1trkAElmp9iUdQKCs0HqDc')
const bot = new MyTelegramBot("7346998601:AAE5UACnttm2A_nmQUoZrxeNn8hJFiYD3P8");
// Мы будем писать тут наш код
bot.onCommand( /\/start/ , bot.start)
bot.onCommand( /\/gpt/ , bot.gpt)
//подключаем нашу функцию hello с MyTelegramBot:
bot.onTextMessage(bot.hello)
// ^ - начало строки
// . - любое количество
// * - любые символы

bot.onButtonCallback( /^.*/ , bot.gptDialog)