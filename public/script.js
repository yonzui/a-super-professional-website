document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.emotions button');
  const emojiContainer = document.querySelector('.emoji-container');
    const recommendationDiv = document.getElementById('recommendation');
    const emotionsDiv = document.querySelector('.emotions');
    const recommendBtn = document.getElementById('recommendBtn');

    const emotionRecommendations = {
        stressed: [
            { title: 'Chill Mix', desc: 'Calming, chill songs to help you focus, and relax.' },
        ],
        depressed: [
            { title: 'Sad Mix', desc: 'Soft songs to match your mood.' },
        ],
        angry: [
            { title: 'High-Energy Mix', desc: 'Guitars and high-energy beats to get you hype.' },
        ],
        happy: [
            { title: 'Energetic Mix', desc: 'Upbeat songs to start your day with.' },
        ],
        hungry: [
            { title: 'Café Mix', desc: 'Smooth, slow songs to vibe to.' },
        ]
    };


const blobs = ['--x1','--y1','--x2','--y2','--x3','--y3','--x4','--y4'];
const blobTargets = { '--x1':20, '--y1':30, '--x2':70, '--y2':25, '--x3':50, '--y3':75, '--x4':30, '--y4':70 };
const blobVelocities = { '--x1':0, '--y1':0, '--x2':0, '--y2':0, '--x3':0, '--y3':0, '--x4':0, '--y4':0 };

document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth) * 100;
  const y = (e.clientY / window.innerHeight) * 100;

  blobTargets['--x1'] = x + 10; blobTargets['--y1'] = y - 5;
  blobTargets['--x2'] = x - 10; blobTargets['--y2'] = y + 5;
  blobTargets['--x3'] = x + 5; blobTargets['--y3'] = y + 10;
  blobTargets['--x4'] = x - 5; blobTargets['--y4'] = y - 10;
});

function animateBlobs() {
  blobs.forEach(variable => {
    const current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(variable));
    blobVelocities[variable] += (blobTargets[variable] - current) * 0.1; // easing factor
    blobVelocities[variable] *= 0.8; // damping
    const next = current + blobVelocities[variable];
    document.documentElement.style.setProperty(variable, next + '%');
  });
  requestAnimationFrame(animateBlobs);
}

animateBlobs();



// Start the animation loop
animateBlobs();


function updateBlob(variable, target) {
    const current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue(variable));
    const next = current + (target - current) * 0.12;
    document.documentElement.style.setProperty(variable, next + "%");
}

  buttons.forEach(btn => {

      btn.addEventListener('mouseenter', () => {
          const emoji = btn.dataset.emoji || "🎉"; 
          createEmojiEcho(btn, emoji);
      });

      // Show a recommendation only when an emotion button is clicked
      btn.addEventListener('click', () => {
          const emotionKey = btn.innerText.trim().toLowerCase();
          const recs = emotionRecommendations[emotionKey];
          const rec = recs[Math.floor(Math.random() * recs.length)];
          if (recommendationDiv) {
              recommendationDiv.innerHTML =
              `<strong">${rec.title}</strong><p>${rec.desc}</p>`;

          
              recommendationDiv.classList.remove('hidden');
              recommendationDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
  });

      btn.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              btn.click();
          }
      });
  });

  function createEmojiEcho(buttonEl, emojiType) {
      for (let i = 0; i < 20; i++) {
          createSingleEmoji(buttonEl, emojiType);
      }
  }

  function createSingleEmoji(buttonEl, emojiType) {
      const emoji = document.createElement('div');
      emoji.classList.add('emoji');
      emoji.textContent = emojiType;

      const rect = buttonEl.getBoundingClientRect();
      emoji.style.left = `${rect.left + rect.width / 2}px`;
      emoji.style.top  = `${rect.top + rect.height / 2}px`;

      const dx = (Math.random() - 0.5) * window.innerWidth;
      const dy = (Math.random() - 0.5) * window.innerHeight;

      emoji.style.setProperty('--dx', `${dx}px`);
      emoji.style.setProperty('--dy', `${dy}px`);

      emojiContainer.appendChild(emoji);

      emoji.addEventListener('animationend', () => emoji.remove());
  }

  // Recommendation button logic: reveal emotion choices only
  if (recommendBtn) {
      recommendBtn.addEventListener('click', () => {
          if (emotionsDiv) {
              emotionsDiv.classList.remove('hidden');
              emotionsDiv.setAttribute('aria-hidden', 'false');
              const firstBtn = emotionsDiv.querySelector('button');
              if (firstBtn) firstBtn.focus();
          }
          recommendBtn.setAttribute('aria-expanded', 'true');
      });
  }
});


function playSong() {
  const player = document.getElementById("player");
  player.play();
};




const songs = [
  { title: "Cece's Interlude - Drake", 
    tags: "chill sad emotional soft piano mellow", 
    url: "songs/cece.mp3" },

  { title: "Guess - Charli XCX & Billie Eilish", 
    tags: "energetic fun hype dance club fast", 
    url: "songs/guess.mp3" },

  { title: "Stateside - PinkPantheress", 
    tags: "aesthetic cute whimsical girly soft", 
    url: "songs/stateside.mp3" },

  { title: "Just Wanna Rock - Lil Uzi Vert", 
    tags: "intense hype mad dance angry energetic", 
    url: "songs/justwannarock.mp3" },

  { title: "No Hands - Waka Flocka Flame", 
    tags: "dance club hype party", 
    url: "songs/nohands.mp3" },

  { title: "Fly Me to the Moon", 
    tags: "jazz study calm smooth", 
    url: "songs/flyme.mp3" },

  { title: "Life Will Be - Cleo Sol", 
    tags: "calm peaceful zen soft relaxing", 
    url: "songs/lifewill.mp3" },

  { title: "La Mentira", 
    tags: "jazz global calm relaxing", 
    url: "songs/lamentira.mp3" },

  { title: "Numb - Men I Trust", 
    tags: "sad depressed emotional crying soft", 
    url: "songs/numb.mp3" },

  { title: "Paint the Town Blue - Ashnikko", 
    tags: "rock powerful villain guitar strong", 
    url: "songs/paintthe.mp3" }
];


function extractTags(text) {
  return text.toLowerCase().split(" ");
}


function pickSong(tags) {
  let best = null;
  let bestScore = -1;

  songs.forEach(song => {
    let score = 0;

    tags.forEach(tag => {
      if (song.tags.includes(tag)) score++;
    });

    if (score > bestScore) {
      bestScore = score;
      best = song;
    }
  });

  return best || songs[0];
}

function addMessage(text, type) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = type;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

function sendMessage() {
  const input = document.getElementById("input");
  const text = input.value.trim();
  if (!text) return;

  addMessage("You: " + text, "user");
  input.value = "";

  addMessage("Thinking...", "bot");

  const tags = extractTags(text);

  const song = pickSong(tags);

  document.querySelector(".bot:last-child").textContent =
    "AI: I recommend → " + song.title;

  const player = document.getElementById("player");
  player.src = song.url;
  player.play();
};
