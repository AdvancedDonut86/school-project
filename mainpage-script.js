// Handle nav button clicks to filter offers
document.addEventListener('DOMContentLoaded', function () {
  const navButtons = Array.from(document.querySelectorAll('nav .nav-btn'));
  const offers = Array.from(document.querySelectorAll('.offer-item'));
  const noResults = document.getElementById('noResults');

  function setActive(button) {
    navButtons.forEach(b => b.classList.remove('active'));
    if (button) button.classList.add('active');
  }


  function filterOffers(filter) {
    let shown = 0;
    offers.forEach(o => {
      const cat = o.dataset.category || '';
      if (filter === 'all' || filter === cat) {
        o.style.display = '';
        shown++;
      } else {
        o.style.display = 'none';
      }
    });

    if (shown === 0) {
      noResults.style.display = 'block';
    } else {
      noResults.style.display = 'none';
    }
  }

  // wire up clicks
  navButtons.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;
      setActive(this);
      filterOffers(filter);
    });
  });

  // Initial state: select first nav (Food)
  const first = navButtons[0];
  if (first) {
    setActive(first);
    filterOffers(first.dataset.filter);
  }
});
