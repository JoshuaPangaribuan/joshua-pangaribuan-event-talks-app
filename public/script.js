
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('scheduleContainer');
  const searchInput = document.getElementById('searchInput');
  let talks = [];

  // Fetch talk data from the API
  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
    })
    .catch(error => {
      console.error('Error fetching talks:', error);
      scheduleContainer.innerHTML = '<p>Error loading schedule. Please try again later.</p>';
    });

  // Search functionality
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTalks = talks.filter(talk => 
      talk.category.some(cat => cat.toLowerCase().includes(searchTerm))
    );
    renderSchedule(talks, searchTerm);
  });

  function renderSchedule(allTalks, searchTerm = '') {
    scheduleContainer.innerHTML = ''; // Clear existing schedule
    let currentTime = new Date();
    currentTime.setHours(10, 0, 0, 0); // Event starts at 10:00 AM

    allTalks.forEach((talk, index) => {
      // Add talk session
      const startTime = new Date(currentTime);
      const endTime = new Date(startTime.getTime() + talk.duration * 60000);
      const sessionEl = createSessionElement(talk, startTime, endTime);
      
      // Filter logic
      const isVisible = searchTerm === '' || talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
      if (!isVisible) {
          sessionEl.classList.add('hide');
      }

      scheduleContainer.appendChild(sessionEl);

      // Move time for the next session
      currentTime = endTime;

      // Add lunch break after the 3rd talk
      if (index === 2) {
        const lunchStartTime = new Date(currentTime);
        const lunchEndTime = new Date(lunchStartTime.getTime() + 60 * 60000);
        scheduleContainer.appendChild(createBreakElement('Lunch Break', lunchStartTime, lunchEndTime));
        currentTime = lunchEndTime;
      }
      // Add transition between talks
      else if (index < allTalks.length - 1) {
        const transitionStartTime = new Date(currentTime);
        const transitionEndTime = new Date(transitionStartTime.getTime() + 10 * 60000);
        scheduleContainer.appendChild(createBreakElement('Transition', transitionStartTime, transitionEndTime));
        currentTime = transitionEndTime;
      }
    });
  }

  function createSessionElement(talk, startTime, endTime) {
    const sessionDiv = document.createElement('div');
    sessionDiv.className = 'session';

    sessionDiv.innerHTML = `
      <div class="session-time">
        ${formatTime(startTime)} - ${formatTime(endTime)}
      </div>
      <div class="session-details">
        <h2>${talk.title}</h2>
        <div class="speakers">By: ${talk.speakers.join(', ')}</div>
        <div class="category">
          ${talk.category.map(cat => `<span>${cat}</span>`).join('')}
        </div>
        <p>${talk.description}</p>
      </div>
    `;
    return sessionDiv;
  }

  function createBreakElement(title, startTime, endTime) {
      const breakDiv = document.createElement('div');
      breakDiv.className = 'session break';
      breakDiv.innerHTML = `
        <div class="session-time">
            ${formatTime(startTime)} - ${formatTime(endTime)}
        </div>
        <div class="session-details">
            ${title}
        </div>
      `;
      return breakDiv;
  }

  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });
  }
});
