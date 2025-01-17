const memoryForm = document.getElementById('memory-form');
const memoryList = document.getElementById('memory-list');

function saveMemoryToLocalStorage(memory) {
  const memories = JSON.parse(localStorage.getItem('memories')) || [];
  memories.push(memory);
  localStorage.setItem('memories', JSON.stringify(memories));
}

function loadMemoriesFromLocalStorage() {
  const memories = JSON.parse(localStorage.getItem('memories')) || [];
  memories.forEach(renderMemory);
}

function renderMemory(memory) {
  const memoryCard = document.createElement('div');
  memoryCard.classList.add('memory-card');
  memoryCard.innerHTML = `
    <img src="${memory.image}" alt="Memory Image">
    <p>${memory.description}</p>
    <p><strong>Location:</strong> ${memory.location}</p>
    <button onclick="deleteMemory('${memory.id}')">Delete</button>
  `;
  memoryList.appendChild(memoryCard);
}

function deleteMemory(id) {
  let memories = JSON.parse(localStorage.getItem('memories')) || [];
  memories = memories.filter(memory => memory.id !== id);
  localStorage.setItem('memories', JSON.stringify(memories));
  memoryList.innerHTML = '';
  loadMemoriesFromLocalStorage();
}

memoryForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const description = document.getElementById('description').value;
  const imageFile = document.getElementById('image').files[0];
  const location = document.getElementById('location').value;

  if (!description || !imageFile || !location) return alert('Please fill all fields!');

  const reader = new FileReader();
  reader.onload = function (event) {
    const memory = {
      id: Date.now().toString(),
      description,
      image: event.target.result,
      location,
    };
    saveMemoryToLocalStorage(memory);
    renderMemory(memory);
    memoryForm.reset();
  };
  reader.readAsDataURL(imageFile);
});

loadMemoriesFromLocalStorage();
