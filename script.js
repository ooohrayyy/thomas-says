// ==UserScript==
// @name         Цитаты Великих Томасов
// @version      0.0.2
// @description  Great Quotes By Great Thomases
// @author       Boris Nikitashov
// @match        https://app.clickup.com/*/notifications
// @grant        none
// ==/UserScript==

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
]

let pageRevisited = false
let quote = getRandomThomasQuote()

const getRandomThomasQuote = () => thomasQuotes[Math.floor(Math.random() * thomasQuotes.length)]

function insertQuote() {
  const authorNode = document.querySelector('.cu-quote__author-text') || null
  const quoteNode = document.querySelector('.cu-quote__text') || null

  if (pageRevisited) {
    quote = getRandomThomasQuote()
  }

  if (authorNode && quoteNode) {
    const newQuoteHtml = `<div class="cu-quote__text ng-star-inserted" style="">
      <div class="cu-quote__double-quote">
        <div class="cu-quote__double-quote-shadow"></div>
        <div class="cu-quote__double-quote-shadow"></div>
        <svg width="54" height="34" xmlns="http://www.w3.org/2000/svg">
          <path d="M23 22.625C23 28.907 17.851 34 11.5 34S0 28.907 0 22.625C0 16.685 3.742 5.13 17.51.273c.519-.183.931.561.544.953-2.454 
            2.491-4.728 5.919-5.751 8.168-.45.989.305 1.858 1.37 2.065C18.968 12.486 23 17.096 23 22.625ZM54 22.625C54 28.907 48.851 34 42.5 
            34S31 28.907 31 22.625C31 16.685 34.742 5.13 48.51.273c.519-.183.931.561.544.953-2.454 2.491-4.728 5.919-5.751 8.168-.45.989.305 
            1.858 1.37 2.065C49.968 12.486 54 17.096 54 22.625Z"
          ></path>
        </svg>
        </div>
        ${quote}
      </div>`

    authorNode.textContent = 'Thomas'
    quoteNode.innerHTML = newQuoteHtml

    pageRevisited = false
  } else {
    setTimeout(() => insertQuote(), 100)
  }
}
