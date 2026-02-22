try {
  Object.defineProperty(document, 'cookie', {
    get() {
      return '';
    },
    set() {
      return true;
    }
  });
} catch (e) {
  // Ignore errors in case the environment doesn't allow overriding document.cookie (e.g. strict Content Security Policy)
}