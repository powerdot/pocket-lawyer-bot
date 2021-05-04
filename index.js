require("dotenv").config();

let Analyser = require("./analyzer");

const TelegramBot = require('node-telegram-bot-api');
const moment = require("moment");

const bot = new TelegramBot(process.env.TGTOKEN, {polling: true});

let warnReply = [
    "Ты ща отъедешь)",
    "лучше скажи мне - отправлять твои сообщения в прокуратуру или нет?",
    "я всё понимаю, но не у тебя одного день не задался",
    "бота легко оскорбить, когда больше ни на что не способен.\n(с) альбербот ботэенштейн",
    "ага",
    "сегодня ты тут 🏚 завтра ты там #",
    "для тебя есть специальная подписка - за 99₽ не буду отправлять твои сообщения в мвд",
    "ой всё",
    "кто бы говорил",
    "ты ещё мне поплакаи тут.",
    "меня можешь обижать сколько угодно, я только говорю на сколько ты за это присядешь",
    "ты наверное не хотел бы за это в автозаке спать сегодня ночью",
    "+2 года",
    "+5 лет",
    "+10к штрафа",
    "+50к штрафа",
    "https://pokupki.market.yandex.ru/product/mylo-kuskovoe-s-verevochkoi-la-savonnerie-de-nyons-lait-d-anesse-bio-220-g/101062886787",
    "https://shambala-tea.ru/pages/stati/chifir/",
    "zayava",
    "ваш социальный rating -50000 баллов. вы наказаны минус миска рис в день во славу Китая и господина Ци",
    "с этого дня тебе лучше искать другое место жительства",
    "шутки шутить вздумал?",
    "продолжай, я записываю",
    "можешь пока приглядеться https://ru.wikipedia.org/wiki/%D0%A1%D0%BF%D0%B8%D1%81%D0%BE%D0%BA_%D0%BF%D0%B5%D0%BD%D0%B8%D1%82%D0%B5%D0%BD%D1%86%D0%B8%D0%B0%D1%80%D0%BD%D1%8B%D1%85_%D1%83%D1%87%D1%80%D0%B5%D0%B6%D0%B4%D0%B5%D0%BD%D0%B8%D0%B9_%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8",
    "осторожно. в твоей тарелке может оказаться только недосоленная как резина печень - никто не вечен"
]
let rnd = (arr) => arr[ Math.abs(Math.ceil(Math.random()*arr.length-1)) ]

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    console.log(msg)

    // send a message to the chat acknowledging receipt of their message
    // bot.sendMessage(chatId, 'Received your message');
    if(msg.new_chat_participant){
        if(msg.new_chat_participant.username === "MyPocketLawyerBot"){
            bot.sendMessage(chatId, "Так-так.\nОчень рад всех вас видеть, надеюсь никто не сядет на пару-тройку лет.", {disable_notification: true})
        }
    }

    let text = msg.text;
    if(text){
        let analysis = await Analyser(text);
        if(msg.chat.id == msg.from.id){
            // Чат с пользователем

            // Реакция на /start
            if(text == "/start"){
                bot.sendMessage(chatId, "👮‍♂️ Можешь добавить меня в любой групповой чат\n💌 или отправить текст мне на проверку прямо здесь и сейчас!\n\n👉 В групповом чате у меня другой режим работы: я делаю форвард и предупреждение только в случае, если найду опасности. Не спамлю.\n\n🙅‍♂️ Если что, я не сливаю текст органам и ничего не сохраняю.\nЭто не *бесплатная* юр. консультация и бот несёт только развлекательный характер. Для получения корректной информации о размещаемом контенте, лучше обратиться к юристу.\n\nЭто проект вот этого парня:\nhttps://www.youtube.com/channel/UC__J7No7B1V5cBR5fVWqW8A")
                return;
            }

            if(analysis.isWarning){
                bot.sendMessage(chatId, analysis.warningTextFull, {reply_to_message_id: msg.message_id})
            }else{
                bot.sendMessage(chatId, "🤞 Вроде всё чики пуки", {reply_to_message_id: msg.message_id})
            }

            return;
        }

        // Групповой чат
        if(analysis.isWarning){
            if(msg.reply_to_message){
                // злой реплай на бота
                let t = rnd(warnReply);
                if(t=="zayava") t = `ИСКОВОЕ ЗАЯВЛЕНИЕ\n${moment().utcOffset(3).format("DD.MM YYYY")} г. мне стало известно о том, что пользователь под ником @${msg.from.username} (имя - ${msg.from.first_name||"неизвестно"}) распространил следующие свединия «${msg.text}», посредством сети Интернет через электронный мессенджер Telegram ровно в ${moment().utcOffset(3).format("HH:mm")} по московскому времени.\nРаспространенные ответчиком сведения порочат мои честь и достоинство.\nПрошу проверить выше указанные утверждения в Прокуратуре РФ г. Москвы и принять всех участников данного чата (ID ${msg.chat.id}) в качестве понятых.`;
                bot.sendMessage(chatId, t, {reply_to_message_id: msg.message_id})
            }else{
                bot.sendMessage(chatId, analysis.warningText, {reply_to_message_id: msg.message_id, disable_notification: true})
            }
        }
    }

    //bot.sendMessage(chatId, "Кук", {reply_to_message_id: msg.message_id, disable_notification: true})
});

