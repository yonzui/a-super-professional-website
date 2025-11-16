document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.emotions button');
  const emojiContainer = document.querySelector('.emoji-container');
    const recommendationDiv = document.getElementById('recommendation');
    const emotionsDiv = document.querySelector('.emotions');
    const recommendBtn = document.getElementById('recommendBtn');

    const emotionRecommendations = {
        stressed: [
            { title: 'Lo-fi Chill Mix', desc: 'Calming lo-fi beats to help you breathe and focus.' },
            { title: 'Instrumental Calm — Rainy Study', desc: 'Gentle piano and ambient textures.' }
        ],
        depressed: [
            { title: 'Ambient Comfort', desc: 'Soft soundscapes and gentle vocals to soothe.' },
            { title: 'Warm Folk', desc: 'Acoustic tracks with intimate storytelling.' }
        ],
        angry: [
            { title: 'High-Energy Rock', desc: 'Aggressive guitars and cathartic drums.' },
            { title: 'Electronic Bass Drop', desc: 'Hard-hitting beats to vent along to.' }
        ],
        happy: [
            { title: 'Feel-Good Pop', desc: 'Upbeat tracks that put you in a good mood.' },
            { title: 'Sunshine Indie', desc: 'Bright melodies and jangly guitars.' }
        ],
        hungry: [
            { title: 'Café Jazz', desc: 'Smooth background jazz — great for cooking.' },
            { title: 'Latin Grooves', desc: 'Rhythmic tunes that pair well with food prep.' }
        ]
    };

    const genericRecs = [ { title: 'Discover Weekly', desc: 'A mix of fresh picks curated for you.' } ];

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
          const recs = emotionRecommendations[emotionKey] || genericRecs;
          const rec = recs[Math.floor(Math.random() * recs.length)];
          if (recommendationDiv) {
              recommendationDiv.innerHTML =
              
              `<strong>${rec.title}</strong><p>${rec.desc}</p>
              ${rec.song}`;

              
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




// AI Song

const songs = [
  {
    title: "Cece's Interlude - Drake",
    tags: "chill sad emotional soft piano slow indie",
    url: "songs/cece.mp3"
  },
  {
    title: "Guess - Charli XCX & Billie Eilish",
    tags: "energetic fun high energy club bass boost",
    url: "songs/romeo.mp3"
  },
  {
    title: "Stateside - PinkPantheress",
    tags: "majestic whimsical unique girly aesthetic",
    url: "songs/stateside.mp3"
  },
  {
    title: "Thunderstruck – AC/DC",
    tags: "rock intense powerful angry high energy guitar",
    url: "songs/thunderstruck.mp3"
  }
];


function addMessage(text, sender) {
  const chat = document.getElementById("chat");
  const msg = document.createElement("div");
  msg.className = sender;
  msg.textContent = text;
  chat.appendChild(msg);
  chat.scrollTop = chat.scrollHeight;
}

async function askGPT(prompt) {
  const apiKey = "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"

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "Extract music tags from user descriptions." },
        { role: "user", content: prompt }
      ]
    })
  });

  const data = await response.json();
  return data.choices[0].message.content.toLowerCase();
}

function pickSong(tags) {
  let best = null;
  let bestScore = -1;

  songs.forEach(song => {
    let score = 0;

    tags.split(" ").forEach(tag => {
      if (song.tags.includes(tag)) score += 1;
    });

    if (score > bestScore) {
      bestScore = score;
      best = song;
    }
  });

  return best;
}

async function sendMessage() {
  const input = document.getElementById("input");
  const prompt = input.value.trim();
  if (!prompt) return;

  addMessage("You: " + prompt, "user");
  input.value = "";

  addMessage("Thinking...", "bot");

  const tags = await askGPT(prompt);
  const song = pickSong(tags);

  // Update chat message
  document.querySelector(".bot:last-child").textContent =
    "AI: I recommend → " + song.title;

  // --- Audio Playback ---
  const player = document.getElementById("player");
  player.src = song.url;

  try {
    await player.play(); // Works because sendMessage() happens from a user click
    console.log("Playing:", song.title);
  } catch (e) {
    console.log("Autoplay blocked:", e);
  }
}