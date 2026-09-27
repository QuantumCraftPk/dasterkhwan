// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".site-header nav");

navToggle.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", open);
});

nav.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    nav.classList.remove("open");
    navToggle.setAttribute("aria-expanded", false);
  }
});

// Chat widget (UI only; replace getReply() with a call to the AI agent backend)
const launcher = document.querySelector(".chat-launcher");
const panel = document.querySelector(".chat-panel");
const closeBtn = document.querySelector(".chat-close");
const form = document.querySelector(".chat-form");
const messages = document.querySelector(".chat-messages");

function setChatOpen(open) {
  panel.hidden = !open;
  launcher.setAttribute("aria-expanded", open);
  if (open) form.message.focus();
}

launcher.addEventListener("click", () => setChatOpen(panel.hidden));
closeBtn.addEventListener("click", () => setChatOpen(false));

function addMessage(text, from) {
  const el = document.createElement("div");
  el.className = `msg msg-${from}`;
  el.textContent = text;
  messages.appendChild(el);
  messages.scrollTop = messages.scrollHeight;
}

async function getReply(message) {
  // TODO: POST the message to the AI agent endpoint and return its reply
  return "Thanks! Our assistant isn't connected yet. Please call us for now.";
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const text = form.message.value.trim();
  if (!text) return;
  addMessage(text, "user");
  form.reset();
  addMessage(await getReply(text), "bot");
});
