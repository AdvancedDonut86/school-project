// Category filter + favorites persistence (light theme only)
(function () {
  const filterButtons = document.querySelectorAll('[data-filter]');
  const cards = document.querySelectorAll('.card');
  const yearSpan = document.getElementById('year');

  // Set current year
  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  // Filtering
  function applyFilter(category) {
    cards.forEach((card) => {
      const c = card.getAttribute('data-category');
      const show = category === 'all' || c === category;
      card.classList.toggle('hidden', !show);
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter') || 'all';
      applyFilter(category);
    });
  });

  // Favorites persistence
  const FAVORITES_KEY = 'favorites:v1';
  function readFavorites() {
    try { return JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]'); }
    catch { return []; }
  }
  function writeFavorites(ids) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
  }

  function getCardId(card) {
    // synthesize a stable id from heading text
    const title = card.querySelector('h3')?.textContent?.trim() || '';
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }

  function hydrateFavorites() {
    const favorites = new Set(readFavorites());
    document.querySelectorAll('.card').forEach((card) => {
      const id = getCardId(card);
      const button = card.querySelector('.favorite');
      const active = favorites.has(id);
      button?.classList.toggle('btn-outline', !active);
      button && (button.textContent = active ? '♥ Favorited' : '♡ Favorite');
    });
  }

  document.querySelectorAll('.favorite').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.card');
      if (!card) return;
      const id = getCardId(card);
      const favorites = new Set(readFavorites());
      if (favorites.has(id)) favorites.delete(id); else favorites.add(id);
      writeFavorites(Array.from(favorites));
      hydrateFavorites();
    });
  });

  hydrateFavorites();
})();


