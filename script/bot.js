// bot fonctionnement
const bot = function () {
  const chatVariables = {
    size: 'XS',
    materials:
      'Acrylic is lightweight, soft, and warm - similar to wool but it is machine washable.',
  };

  const efitterChat = document.getElementById('efitter-chat');
  const container = document.getElementById('efitter-chat-container');
  const inner = document.getElementById('efitter-chat-inner');
  let restartButton = null;

  const sleep = function (ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const scrollContainer = function () {
    inner.scrollTop = inner.scrollHeight;
  };

  const insertNewChatItem = function (elem) {
    efitterChat.appendChild(elem);
    scrollContainer();
    elem.classList.add('activated');
  };

  const printResponse = async function (step) {
    const response = document.createElement('div');
    response.classList.add('chat-response');
    response.innerHTML = mustache.render(step.text, chatVariables);
    insertNewChatItem(response);
    // TODO: create a loading phase
    await sleep(1500);

    if (step.options) {
      const choices = document.createElement('div');
      choices.classList.add('choices');
      step.options.forEach(function (option) {
        const button = document.createElement(option.url ? 'a' : 'button');
        button.classList.add('choice');
        button.innerHTML = option.text;
        if (option.url) {
          button.href = option.url;
        } else {
          button.dataset.next = option.next;
        }
        choices.appendChild(button);
      });
      insertNewChatItem(choices);
    } else if (step.next) {
      printResponse(chat[step.next]);
    }
  };

  const printChoice = function (choice) {
    const choiceElem = document.createElement('div');
    choiceElem.classList.add('chat-ask');
    choiceElem.innerHTML = choice.innerHTML;
    insertNewChatItem(choiceElem);
  };

  const disableAllChoices = function () {
    const choices = document.querySelectorAll('.choice');
    choices.forEach(function (choice) {
      choice.disabled = 'disabled';
    });
  };

  const handleChoice = async function (e) {
    if (!e.target.classList.contains('choice') || e.target.tagName === 'A') {
      const button = e.target.closest('#efitter-chat-container .choice');

      if (button !== null) {
        button.click();
      }

      return;
    }
    e.preventDefault();
    const choice = e.target;

    disableAllChoices();

    printChoice(choice);
    scrollContainer();

    await sleep(1500);

    if (choice.dataset.next) {
      printResponse(chat[choice.dataset.next]);
    }
  };

  const startConversation = function () {
    printResponse(chat[1]);
  };

  const handleRestart = function () {
    startConversation();
  };

  const init = function () {
    container.addEventListener('click', handleChoice);
    restartButton = document.createElement('button');
    restartButton.innerText = 'restart';
    restartButton.classList.add('restart');
    restartButton.addEventListener('click', handleRestart);
    container.appendChild(restartButton);
    startConversation();
  };
  init();
};

bot();

document.getElementById('chatbot_toggle').onclick = function () {
  if (document.getElementById('chatbot').classList.contains('collapsed')) {
    document.getElementById('chatbot').classList.remove('collapsed');
    document.getElementById('chatbot').classList.add('main-card');
    document.getElementById('message-box').style.display = 'flex';
    document.getElementById('chatbot_toggle').children[0].style.display =
      'none';
    document.getElementById('chatbot_toggle').children[1].style.display = '';
  } else {
    document.getElementById('chatbot').classList.add('collapsed');
    document.getElementById('chatbot').classList.remove('main-card');
    document.getElementById('message-box').style.display = 'none';
    document.getElementById('chatbot_toggle').children[0].style.display = '';
    document.getElementById('chatbot_toggle').children[1].style.display =
      'none';
  }
};
