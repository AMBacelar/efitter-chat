// crée la conversation
const chat = {
  1: {
    text: "Hey! 👋  I'm efitter. I'm here to help you shop 😁",
    next: 2,
  },
  2: {
    text: 'How can I help you?',
    options: [
      {
        text: 'Which size is best for me?',
        next: 3,
      },
      {
        text: 'What is the material like?',
        next: 4,
      },
    ],
  },
  3: {
    text: 'Based on your shopping history, size {{size}} normally works for you...',
    next: 7,
  },
  4: {
    text: '{{materials}}',
    options: [
      {
        text: 'Great!',
        next: 5,
      },
      {
        text: 'Which size is best for me?',
        next: 3,
      },
    ],
  },
  5: {
    text: "Fab! Don't forget to add your item to your basket 💃",
  },
  6: {},
  7: {
    text: 'Size {{size}} should fit you fine!',
    next: 8,
  },
  8: {
    text: 'Does this prediction seem right to you?',
    options: [
      {
        text: "It's spot on!",
        next: 9,
      },
      {
        text: "Hmm I'm not sure...",
        next: 10,
      },
    ],
  },
  9: {
    text: `Great! 💃<br/><br/>To make efitter even better, please fill out this survey (we'll email you in a few days in case you want to wait for your items to arrive) 😊`,
    options: [
      {
        text: "What's the material like?",
        next: 4,
      },
    ],
  },
  10: {
    text: 'No worries. efitter gets smarter over time so please fill out this survey to make it even better 😊',
    next: 11,
  },
};
