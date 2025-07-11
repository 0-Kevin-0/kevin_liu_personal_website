// js/translator.js

document.addEventListener('DOMContentLoaded', () => {
  const langSwitcher = document.getElementById('lang-switcher');

  // 1. Function to update text content
  const translatePage = (language) => {
    document.querySelectorAll('[data-key]').forEach(element => {
      const key = element.getAttribute('data-key');
      // Use innerHTML to support the <br> tags in your title
      element.innerHTML = translations[language][key];
    });

    const attributes = translations[language].attributes;
    if (attributes) {
      const cvLinkIntro = document.getElementById('cv-download-link-intro');
      if (cvLinkIntro && attributes.cvLink) {
        cvLinkIntro.setAttribute('href', attributes.cvLink);
      }
  
      const cvLinkFooter = document.getElementById('cv-download-link-footer');
      if (cvLinkFooter && attributes.cvLink) {
        cvLinkFooter.setAttribute('href', attributes.cvLink);
      }
  

      const vrVideoIframes = document.querySelectorAll('.vr-video-iframe');

      if (vrVideoIframes.length > 0 && attributes.vrVideoLink) {
          vrVideoIframes.forEach(iframe => {

              iframe.setAttribute('src', attributes.vrVideoLink);
          });
      }

      const emailLink = document.getElementById('email-link');
      if (emailLink && attributes.emailHref) {
        emailLink.setAttribute('href', attributes.emailHref);
      }

      const phoneLink = document.getElementById('phone-link');
      if (phoneLink && attributes.phoneHref) {
        phoneLink.setAttribute('href', attributes.phoneHref);
      }
    }
  };

  // 2. Function to toggle language and update switcher
  const toggleLanguage = () => {
    // Determine the new language
    let currentLang = localStorage.getItem('lang') || 'en'; // Default to English
    let newLang = currentLang === 'en' ? 'cn' : 'en';

    // Update the page
    translatePage(newLang);

    // Update the switcher text
    langSwitcher.textContent = newLang === 'en' ? '中文' : 'English';

    // Save the new language to localStorage
    localStorage.setItem('lang', newLang);
  };

  // 3. Set initial language on page load
  const setInitialLanguage = () => {
    const savedLang = localStorage.getItem('lang') || 'en';
    translatePage(savedLang);
    langSwitcher.textContent = savedLang === 'en' ? '中文' : 'English';
  };

  // 4. Add event listener to the switcher
  langSwitcher.addEventListener('click', (e) => {
    e.preventDefault(); // Prevent the link from navigating
    toggleLanguage();
  });

  // 5. Call the function to set language when the page loads
  setInitialLanguage();
});