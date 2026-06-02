// ========== TYPING ANIMATION ==========
const typedSpan = document.querySelector('.typed-text');
if (typedSpan) {
  const words = ['a developer', 'a ministry leader', 'an athlete', 'a CS student', 'a servant'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typedSpan.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedSpan.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDele
