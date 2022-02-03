// ==UserScript==
// @name         Цитаты Великих Томасов
// @version      0.0.3
// @description  Great Quotes By Great Thomases
// @author       Boris Nikitashov, Alex Mazurenko
// @match        https://app.clickup.com/*
// @updateURL    https://raw.githubusercontent.com/ooohrayyy/thomas-says/main/script.js
// @downloadURL  https://raw.githubusercontent.com/ooohrayyy/thomas-says/main/script.js
// @supportURL   https://github.com/ooohrayyy/thomas-says
// @homepage     https://github.com/ooohrayyy/thomas-says
// ==/UserScript==

const THOMAS_NAME = 'Thomas Zaporozhtsev'

const thomasQuotes = [
  'совет всем норм челам - не надо париться из-за хуйни, если вы норм челы, значит все хорошо!',
  'failure is not an option for us my friend',
  'все по кайфу будет, братишка',
  'если ты с таской жестко ебешься, то все хорошо будет (по секрету - с девушками тоже работает)',
  'Работать!',
  'Земля говном тому кто это придумал',
  'Ггггго',
  'За выполнение - лайк и спасибо',
  'неравенство - это данность, и даже хорошо, есть куда стремиться',
  'Ну так можно не работать где не нравится',
  'го покурим',
  'тейк ит изи',
  'че как там с багами в ims?',
  'все будет как будет, а будет ништяк. ко всем приходит чувак депресняк',
  'ну ваще да, странновато все это выглядит',
  'Подкинули пму срань какую-то',
  'Ребята, у всех кликап лагает?',
  'мне недавно снился Кластерикс',
  'завтра созвон в 12, работяги',
  'если понадобятся цитаты - обращайся',
  'мне Ахмад тоже не отвечает',
  'там еще в таске надо что-то мне писать или ты все написал уже?)',
  'Супер, красава, чемпион, лучший, топ-бой 😎',
  'сейчас будем тестинг лить на прод. не удивляйся, если что',
  'ну ты потом разберись с этой задачей по-быстренькому',
  'у нас не так все жестко',
  'дякую',
  'это вери супер уржент если шо',
  'ееебоиии',
  'чемпион людей, чемпион зверей',
  'это же много времени не займет?)',
  'убираем за собой, не мусорим)',
  'с одной стороны - заебно, с другой говно делать не хочется',
  'вообще там Борис должен валидаторы из ИМС интегрировать',
  'ты как думаешь? можем пока оставить как есть?',
  'ну бывает) ничего) такая работа у программистов)',
  'что тут не так? можешь объяснить ламеру?)',
  'прилетит добрый дядя волшебник на голубом вертолете и все баги пофиксятся сами)',
  'слава богу, у нас sc(r)um',
  'рили покс лол',
  'пить курить не буду',
  'мое почтение',
  'как обстановка на фронте?',
  'как раз хотел спросить не кончились ли у тебя таски и не хочешь ли добавки)',
  'всегда приятно когда CEO так вовлечен в процесс',
  'адьямо фумаре',
  'много багов(',
  'уржент баги сами себя до конца некст недели не пофиксят',
  '4:20 go?',
  'суть в том, чтобы сделать как в немецких компаниях, 1 в 1',
]

const checkHref = () => window.location.href.endsWith('notifications')
const getRandomThomasQuote = () => thomasQuotes[Math.floor(Math.random() * thomasQuotes.length)]

const insertQuote = () => {
  const TEXT_NODE_TYPE = 3

  const quoteNode = document.querySelector('.cu-quote__text')
  const quoteTextNode = quoteNode?.childNodes && 
    [...quoteNode.childNodes].filter(n => n.nodeType === TEXT_NODE_TYPE)?.[0]

  const authorNode = document.querySelector('.cu-quote__author-text')

  if (quoteTextNode && authorNode) {
    quoteTextNode.textContent = getRandomThomasQuote()
    authorNode.textContent = THOMAS_NAME
  }
}

const observerCallback = (mutationsList) => {
  const isOnNotificationsPage = checkHref()

  if (isOnNotificationsPage) {
    [...mutationsList]
      .filter(m => m.target.classList?.contains('cu-notifications__body'))
      .forEach(m => {
        [...m.addedNodes]
          .filter(n => n.classList?.contains('cu-quote'))
          .forEach(_ => insertQuote())
      })
  }
}

const observeOptions = {
  childList: true,
  subtree: true,
}

const observer = new MutationObserver(observerCallback)
observer.observe(document.body, observeOptions)
