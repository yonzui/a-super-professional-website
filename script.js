document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.emotions button');
  const emojiContainer = document.querySelector('.emoji-container');

  buttons.forEach(btn => {

      btn.addEventListener('mouseenter', () => {
          const emoji = btn.dataset.emoji || "🎉"; 
          createEmojiEcho(btn, emoji);
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

  // Recommendation button logic: show a random recommendation and reveal emotions
  const recommendBtn = document.getElementById('recommendBtn');
  const recommendationDiv = document.getElementById('recommendation');
  const emotionsDiv = document.querySelector('.emotions');

  const recommendations = [
      { title: 'Men I Trust — Show Me How', desc: 'Dreamy indie-electronic track with warm vocals.' },
      { title: 'Khruangbin — Time (You and I)', desc: 'Groovy instrumental with psychedelic vibes.' },
      { title: 'Faye Webster — Kingston', desc: 'Mellow alt-pop with soulful storytelling.' },
      { title: 'Tame Impala — The Less I Know The Better', desc: 'Psychedelic pop with an infectious bassline.' },
      { title: 'Arlo Parks — Euphoric Recall', desc: 'Intimate lyricism and soft R&B production.' }
  ];

  if (recommendBtn && recommendationDiv) {
      recommendBtn.addEventListener('click', () => {
          const rec = recommendations[Math.floor(Math.random() * recommendations.length)];
          recommendationDiv.innerHTML = `<strong>${rec.title}</strong><p>${rec.desc}</p>`;
          recommendationDiv.classList.remove('hidden');
          if (emotionsDiv) {
              emotionsDiv.classList.remove('hidden');
              emotionsDiv.setAttribute('aria-hidden', 'false');
          }
          recommendBtn.setAttribute('aria-expanded', 'true');
          recommendationDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
  }
});
