const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const moodSection = document.getElementById('moodSection');
const nameSection = document.getElementById('nameSection');
const nameInput = document.getElementById('name');
const submitNameBtn = document.getElementById('submitName');
const greeting = document.getElementById('greeting');
const timeDisplay = document.getElementById('time');
const quoteDisplay = document.getElementById('quote');
const refreshQuoteBtn = document.getElementById('refreshQuote');

const todoInput = document.getElementById("todo-input");
const addTaskBtn = document.getElementById("add-task-btn");
const todoList = document.getElementById("todo-list");

const focusSection = document.getElementById('focus-section');
const focusForm = document.getElementById('focus-form');
const focusInput = document.getElementById('focus-input');
const focusDisplay = document.getElementById('focus-display');

const editQuoteBtn = document.getElementById('editQuoteBtn');
const saveQuoteBtn = document.getElementById('saveQuoteBtn');
const quoteEditInput = document.getElementById('quoteEditInput');
const quoteControls = document.getElementById('quote-controls');

let timeInterval = null;

let currentMood = "";

const quotesByMood = {
  happy: [
    "Ang saya mo ah, sana all!",
    "Keep shining. You're amazing!",
    "Joy is contagious, spread it!",
    "Happiness is in the little things.",
    "Today is your day to sparkle!"
  ],
  sad: [
    "It's okay to feel sad. Healing takes time.",
    "Tears are proof that you're strong enough to feel.",
    "This too shall pass.",
    "Even the darkest night will end and the sun will rise.",
    "You are not alone. You are deeply loved."
  ],
  overwhelmed: [
    "Breathe. You’re doing the best you can.",
    "One step at a time, that’s all you need.",
    "You've handled tough days before, you'll handle this one too.",
    "You are capable of amazing things.",
    "Focus on what you can control."
  ],
  idk: [
    "It’s okay not to have all the answers right now.",
    "Sometimes not knowing leads to beautiful surprises.",
    "Uncertainty is the first step to discovery.",
    "Wandering doesn't mean you're lost.",
    "You are on your way, even if you don’t see it yet."
  ]
};

function selectMood(mood) {
  currentMood = mood.toLowerCase();
  moodSection.classList.add('hidden');
  nameSection.classList.remove('hidden');
  themeToggle.classList.remove('hidden');
}

// User Story 1: Allow the user to enter their name
submitNameBtn.addEventListener('click', () => {
  const name = nameInput.value.trim();
  if (!name) return alert("Please enter your name.");

  nameInput.classList.add('hidden');
  submitNameBtn.classList.add('hidden');

  // User Story 3: Display greeting using user's name
  greeting.textContent = `Hi, ${name}!`;
  greeting.classList.remove('hidden');
  timeDisplay.classList.remove('hidden');
  quoteDisplay.classList.remove('hidden');
  refreshQuoteBtn.classList.remove('hidden');
  quoteControls.classList.remove('hidden');
  document.getElementById("todo-section").classList.remove("hidden");
  focusSection.classList.remove('hidden');

  updateTime();
  clearInterval(timeInterval);
  timeInterval = setInterval(updateTime, 1000);

  updateQuote();

  updateBackgroundImageBasedOnTheme();
});

refreshQuoteBtn.addEventListener('click', updateQuote);

// User Story 2: Show current time
function updateTime() {
  const now = new Date();
  const options = {
    timeZone: 'Asia/Manila',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };
  const time = now.toLocaleTimeString('en-US', options);
  timeDisplay.textContent = `${time}`;
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark');

  themeToggle.textContent = body.classList.contains('dark') ? '☀️' : '🌙';

  if (body.classList.contains('third-view')) {
    updateBackgroundImageBasedOnTheme();
  }
});

// Set background image based on current theme
function updateBackgroundImageBasedOnTheme() {
  body.classList.add('third-view');

  if (body.classList.contains('dark')) {
    body.style.backgroundImage = "url('img/darkmode.jpg')";
  } else {
    body.style.backgroundImage = "url('img/lightmode3.jpeg')";
  }

  body.style.backgroundSize = "cover";
  body.style.backgroundPosition = "center";
  body.style.backgroundRepeat = "no-repeat";
}

// User Story 6: Add items to a to-do list
addTaskBtn.addEventListener("click", () => {
  const taskText = todoInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.classList.add("todo-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";

  const label = document.createElement("label");
  label.textContent = taskText;

  checkbox.addEventListener("change", () => {
    li.classList.toggle("completed", checkbox.checked);
  });

  li.appendChild(checkbox);
  li.appendChild(label);
  todoList.appendChild(li);

  todoInput.value = "";
});

// User Story 4: Let user input their main focus for the day
focusForm.addEventListener('submit', (e) => {
  e.preventDefault(); // Prevent form from refreshing the page
  const focus = focusInput.value.trim();
  if (!focus) return;

  focusDisplay.textContent = `Today: ${focus}`;
  focusDisplay.classList.remove('hidden');
  focusForm.classList.add('hidden');
  focusInput.value = '';
});

// User Story 5: Display a random quote depending on mood
function updateQuote() {
  const moodQuotes = quotesByMood[currentMood] || quotesByMood.idk;
  const randomIndex = Math.floor(Math.random() * moodQuotes.length);
  quoteDisplay.textContent = moodQuotes[randomIndex];
}

// User Story 7: Add, edit and save a custom quote
editQuoteBtn.addEventListener('click', () => {
  quoteEditInput.value = quoteDisplay.textContent;
  quoteEditInput.classList.remove('hidden');
  saveQuoteBtn.classList.remove('hidden');
  editQuoteBtn.classList.add('hidden');
});

saveQuoteBtn.addEventListener('click', () => {
  const editedQuote = quoteEditInput.value.trim();
  if (!editedQuote) return alert("Please enter a quote.");

  quoteDisplay.textContent = editedQuote;
  quoteEditInput.classList.add('hidden');
  saveQuoteBtn.classList.add('hidden');
  editQuoteBtn.classList.remove('hidden');
});
