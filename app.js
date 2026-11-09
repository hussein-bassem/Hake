
const form = document.getElementById("booking-form");
const list = document.getElementById("queue-list");
const toast = document.getElementById("toast");

const queue = [];
let nextNumber = 1;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function renderQueue() {
  document.getElementById("waiting-count").textContent =
    queue.length;

  document.getElementById("wait-time").textContent =
    `${queue.length * 15} د`;

  document.getElementById("chair-count").textContent = "3";

  if (queue.length === 0) {
    list.innerHTML =
      '<div class="empty-state">ماكو أدوار معروضة حالياً.</div>';
    return;
  }

  list.innerHTML = queue.map(person => `
    <article class="queue-row">
      <div>
        <strong>${escapeHtml(person.name)}</strong>
        <small>${escapeHtml(person.service)}</small>
      </div>

      <span class="queue-number">
        #${String(person.number).padStart(3, "0")}
      </span>
    </article>
  `).join("");
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
}

form.addEventListener("submit", event => {
  event.preventDefault();

  const name = form.elements.name.value.trim();
  const service = form.elements.service.value;

  if (!name) return;

  queue.push({
    name: name,
    service: service,
    number: nextNumber++
  });

  renderQueue();

  form.reset();

  showToast("تمت إضافة دورك بنجاح في النسخة التجريبية.");
});

renderQueue();
