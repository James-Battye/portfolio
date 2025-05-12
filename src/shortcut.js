document.addEventListener('keydown', function (event) {
  // Check for Cmd+K (macOS) or Ctrl+K (Windows/Linux)
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault(); // prevent browser's default behavior (e.g. browser search)
    const link = document.querySelector('.nav_wrap a');
    if (link) {
      link.click();
      console.log('yes');
    }
  }
});