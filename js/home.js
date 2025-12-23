
// Correct local links on the home page (Navbar handling)
function fixLocalLinks() {
  const links = document.querySelectorAll('.navbar-nav a, .dropdown-menu a');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.includes('home.html#')) {
      link.setAttribute('href', href.replace('home.html', ''));
    }
  });
}

// Card Management System (Hover & Click Logic)
document.addEventListener('DOMContentLoaded', () => {

  fixLocalLinks();
  const cards = document.querySelectorAll('.typeOfClasses .class-card');

  // Global variable to track which card is currently clicked
  let pinnedCard = null;

  // Close all cards
  const closeAllCards = () => {
    cards.forEach(c => {
      const collapseElement = c.querySelector('.collapse');
      if (collapseElement) {
        const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseElement, { toggle: false });
        bsCollapse.hide();
      }
    });
  };

  // Open a specific card
  const openCard = (card) => {
    const collapseElement = card.querySelector('.collapse');
    if (collapseElement) {
      const bsCollapse = bootstrap.Collapse.getOrCreateInstance(collapseElement, { toggle: false });
      bsCollapse.show();
    }
  };

  // Main Logic
  cards.forEach(card => {
    const trigger = card.querySelector('[data-bs-toggle="collapse"]');
    if (!trigger) return;

    // HOVER ENTER
    card.addEventListener('mouseenter', () => {
      // If ANY card is currently pinned by a click -> Ignore hover on others
      if (pinnedCard) return;

      // Close everything else and open this one
      closeAllCards();
      openCard(card);
    });

    // HOVER LEAVE
    card.addEventListener('mouseleave', () => {
      if (pinnedCard === card) return;

      closeAllCards();
    });

    // CLICK 
    trigger.addEventListener('click', (e) => {
      e.preventDefault(); // Stop default Bootstrap behavior
      e.stopPropagation();

      if (pinnedCard === card) {
        /* Scenario: Clicking the already pinned card*/
        pinnedCard = null;
        closeAllCards();

      } else {
        /* Scenario: Clicking a new card to pin it*/
        pinnedCard = card;
        closeAllCards();
        openCard(card);
      }
    });
  });

  //Open card from Navbar
  // Checks if the URL has a hash
  const handleDeepLink = () => {
    const hash = window.location.hash;
    if (hash) {
      const targetCollapse = document.querySelector(hash);
      if (targetCollapse) {
        const cardToOpen = targetCollapse.closest('.class-card');
        if (cardToOpen) {
          // Wait slightly for page load, then lock and open
          setTimeout(() => {
            pinnedCard = cardToOpen; // Lock it
            closeAllCards();
            openCard(cardToOpen);
            // Smooth scroll to the card
            cardToOpen.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }, 100);
        }
      }
    }
  };

  handleDeepLink();

  // Run when URL changes 
  window.addEventListener('hashchange', handleDeepLink);
});