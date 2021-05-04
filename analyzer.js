const triggers = require("russian-text-tagger/test/triggers");
let Analysis = require("russian-text-tagger")({triggers, uniq_markers: true});
const laws = require("russian-text-tagger/test/laws");

let be_warn = [
    "Будь осторожен.",
    "Ох опасненько...",
    "Не хочу пугать, но...",
    "Знаешь, здесь такое дело...",
    "Кхм)",
    "Друзья! Вот отличный пример как делать НЕ нужно.",
    "И здесь в игру вступаю я. Пс...",
    "ОХОХО Осторожненько!",
    "Ай яй яй!"
];

let may_be_asked = [
    "Тебе могут предложить",
    "Тебе могут вменить",
    "Есть варик"
];

let sit = [
    "присесть",
    "сесть",
    "изолироваться",
    "уйти на нары",
    "улететь в места не столь отдаленные",
    "переехать к зекам",
    "релоцироваться в тюрьму",
    "временно переехать куда-нибудь"
];

let pen = [
    "заплатить штраф",
    "поделиться деньгами с бюджетом",
    "расшарить баблишко",
    "потерять денежную невинность",
    "проститься с money",
    "попрощаться с денюшками"
];

let find = [
    "обнаружить",
    "найти",
    "откопать",
    "заподозрить"
];

let Independent_experts = [
    "Независимые эксперты могут",
    "Некоторые люди могут",
    "Люди в погонах могут",
    "Органы правопорядка могут",
    "Опасные человечки могут",
    "Люди без чувства юмора могут",
    "Добрые люди с Лубянки могут",
    "Герои РКН могут",
    "Кое-кто может"
];

function full_double_variant(law_collection, sum_penalty, sum_days){
    let text = '';
    text += "Возможно, что данный текст можно будет привязать к следующим статьям:";
    text += lawsList(law_collection, 'laws');
    text += `\nНекоторые эксперты могут обнаружить в нём ` + lawsList(law_collection, 'exprets', false);
    text += '\nМожет грозить штраф до '+penalty_format(sum_penalty[1])+' и срок до '+days_format(sum_days[1])+'.';
    return text;
};
let double_variants = [
    function(law_collection, sum_penalty, sum_days){
        let text = '';
        text += rnd(be_warn);
        text += ` ${rnd(may_be_asked)} как ${rnd(sit)}, так и ${rnd(pen)}.`
        text += `\n` + lawsList(law_collection, 'exprets', true);
        text += '\nИ тебе может грозить штраф до '+penalty_format(sum_penalty[1])+' и срок до '+days_format(sum_days[1])+'.';
        return text;
    },
    function(law_collection, sum_penalty, sum_days){
        let text = '';
        text += rnd(be_warn);
        text += ` ${rnd(may_be_asked)} как ${rnd(sit)}, так и ${rnd(pen)}.`
        text += `\n` + lawsList(law_collection, 'laws', true);
        text += '\nИ тебе может грозить штраф до '+penalty_format(sum_penalty[1])+' и срок до '+days_format(sum_days[1])+'.';
        return text;
    },
    function(law_collection, sum_penalty, sum_days){
        let text = '';
        text += rnd(be_warn);
        text += ' Тебе может грозить штраф до '+penalty_format(sum_penalty[1])+' и срок до '+days_format(sum_days[1])+'.';
        return text;
    },
];

function full_penalty_variant(law_collection, sum_penalty){
    let text = '';
    text += rnd(be_warn);
    text += ` ${rnd(may_be_asked)} ${rnd(pen)}.`
    text += `\n` + lawsList(law_collection, 'exprets', true);
    text += '\nТебе может грозить штраф до '+penalty_format(sum_penalty[1])+'.'
    return text;
}

let penalty_vairants = [
    function(law_collection, sum_penalty){
        let text = '';
        text += rnd(be_warn);
        text += ` ${rnd(may_be_asked)} ${rnd(pen)}.`
        text += `\n` + lawsList(law_collection, 'exprets', true);
        text += '\nТебе может грозить штраф до '+penalty_format(sum_penalty[1])+'.'
        return text;
    },
    function(law_collection, sum_penalty){
        let text = '';
        text += rnd(be_warn);
        text += ` ${rnd(may_be_asked)} ${rnd(pen)}.`
        text += `\n` + lawsList(law_collection, 'laws', true);
        text += '\nТебе может грозить штраф до '+penalty_format(sum_penalty[1])+'.'
        return text;
    },
    function(law_collection, sum_penalty){
        let text = '';
        text += rnd(be_warn);
        text += ' Тебе может грозить штраф до '+penalty_format(sum_penalty[1])+'.'
        return text;
    }
]

function full_sit_variant(law_collection, sum_days){
    let text = '';
    text += rnd(be_warn);
    text += ` ${rnd(may_be_asked)} ${rnd(sit)}.`
    text += `\n` + lawsList(law_collection, 'exprets', true);
    text += '\nТебе может грозить срок до '+days_format(sum_days[1])+'.'
    return text;
}

let sit_vairants = [
    function(law_collection, sum_days){
        let text = '';
        text += rnd(be_warn);
        text += ` ${rnd(may_be_asked)} ${rnd(sit)}.`
        text += `\n` + lawsList(law_collection, 'exprets', true);
        text += '\nТебе может грозить срок до '+days_format(sum_days[1])+'.'
        return text;
    },
    function(law_collection, sum_days){
        let text = '';
        text += rnd(be_warn);
        text += ` ${rnd(may_be_asked)} ${rnd(sit)}.`
        text += `\n` + lawsList(law_collection, 'laws', true);
        text += '\nТебе может грозить срок до '+days_format(sum_days[1])+'.'
        return text;
    },
    function(law_collection, sum_days){
        let text = '';
        text += rnd(be_warn);
        text += ' Тебе может грозить срок до '+days_format(sum_days[1])+'.'
        return text;
    }
]

let rnd = (arr) => arr[ Math.abs(Math.ceil(Math.random()*arr.length-1)) ]

module.exports = async function(text){
    let results = await Analysis(text);

    let law_collection = [];
    for(let marker of results.markers){
        law_collection.push( laws.find(x=>x.id==marker) );
    }
    let sum_days = sum(law_collection, 'days');
    let sum_penalty = sum(law_collection, 'penalty');
    let warningText = "";
    let warningTextFull = "";

    let isWarning = law_collection.length != 0;

    // Добавить другие варианты формирования справки
    if(law_collection.length != 0){
        if(sum_days[1] && sum_penalty[1]){
            warningText = rnd(double_variants)(law_collection, sum_penalty, sum_days);
            warningTextFull = full_double_variant(law_collection, sum_penalty, sum_days);
        }
        if(!sum_days[1] && sum_penalty[1]){
            warningText = rnd(penalty_vairants)(law_collection, sum_penalty);
            warningTextFull = full_penalty_variant(law_collection, sum_penalty);
        }
        if(sum_days[1] && !sum_penalty[1]){
            warningText = rnd(sit_vairants)(law_collection, sum_days);
            warningTextFull = full_sit_variant(law_collection, sum_days);
        }
    }

    return {
        warningTextFull,
        warningText,
        isWarning
    }
};


/**
 * 
 * @param {*} law_collection 
 * @param {('laws'|'exprets')} mode 
 * @param {*} exprets_can_find 
 * @returns 
 */
function lawsList(law_collection, mode = 'laws', exprets_can_find = false){
    let text = "";
    if(exprets_can_find) text += `${rnd(Independent_experts)} ${rnd(find)} ${rnd(['тут', 'здесь', 'выше'])} `;
    for(let i =0;i<=law_collection.length-1; i++){
        let l = law_collection[i];
        if(mode === 'exprets'){
            text += l.name_desc + (i<=law_collection.length-3?", ":(i==law_collection.length-1?".":" и "));
        }else{
            text += `\n- ${l.codex}${i==law_collection.length-1?'.':';'}`;
        }
    }
    return text;
}

function sum(array, key){
    let result = [0, 0];
    for(let item of array){
        if(!item[key]) continue;
        result[0] += item[key][0];
        result[1] += item[key][1];
    }
    return result;
}

function days_format(days){
    let years_amount = Math.ceil(days/365);
    if(years_amount>=1) return years_amount + ' ' + declOfNum(years_amount, ['года', 'лет', 'лет']);
    return days + declOfNum(days, ['суток', 'суток', 'суток'])
}

function penalty_format(p){
    return p.toLocaleString('RU-ru')+" "+declOfNum(p, ['рубль', 'рубля', 'рублей'])
}

function declOfNum(number, titles) {  
    let cases = [2, 0, 1, 1, 1, 2];  
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];  
}