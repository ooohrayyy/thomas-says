// ==UserScript==
// @name         Цитаты Великих Томасов
// @version      0.1.0
// @description  Great Quotes By Great Thomases
// @author       Boris Nikitashov, Alex Mazurenko
// @match        https://app.clickup.com/*
// @updateURL    https://raw.githubusercontent.com/ooohrayyy/thomas-says/main/script.js
// @downloadURL  https://raw.githubusercontent.com/ooohrayyy/thomas-says/main/script.js
// @supportURL   https://github.com/ooohrayyy/thomas-says
// @homepage     https://github.com/ooohrayyy/thomas-says
// ==/UserScript==

const checkHref = () => window.location.href.endsWith('notifications')

const getRandomThomasQuote = async () => fetch(`https://thomas-says-api.vercel.app/api/quote/random`).then(r => r.json())

const showLoadingDots = node => {
  let i = 0

  const showDots = () => {
    node.textContent = '.'.repeat(i % 3 + 1)
    i++
  }

  showDots()

  return setInterval(showDots, 100)
}

const insertQuote = async () => {
  const TEXT_NODE_TYPE = 3

  const quoteNode = document.querySelector('.cu-quote__text')
  const quoteTextNode = quoteNode?.childNodes &&
    [...quoteNode.childNodes].filter(n => n.nodeType === TEXT_NODE_TYPE)?.[0]

  const authorNode = document.querySelector('.cu-quote__author-text')

  if (quoteTextNode && authorNode) {
    authorNode.textContent = ''

    const intervalToken = showLoadingDots(quoteTextNode)

    const { text, authorName } = await getRandomThomasQuote()

    clearInterval(intervalToken)

    quoteTextNode.textContent = text
    authorNode.textContent = authorName
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
