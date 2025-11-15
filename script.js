document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.emotions button');
  const emojiContainer = document.querySelector('.emoji-container');

  buttons.forEach(btn => {

      btn.addEventListener('mouseenter', () => {
          const emoji = btn.dataset.emoji || "🎉"; 
          createEmojiEcho(btn, emoji);
      });

      btn.addEventListener('click', () => {
          alert('You feel: ' + btn.innerText);
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
});
