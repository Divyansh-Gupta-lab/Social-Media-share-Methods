const loadTwitterScript = () => {
    return new Promise((resolve, reject) => {
      if (window.twttr) {
        resolve(window.twttr);
        return;
      }
  
      const script = document.createElement('script');
      script.src = "https://platform.twitter.com/widgets.js";
      script.async = true;
      script.onload = () => {
        if (window.twttr) {
          resolve(window.twttr);
        } else {
          reject(new Error('Twitter widgets script failed to load'));
        }
      };
      script.onerror = () => reject(new Error('Twitter widgets script failed to load'));
      document.body.appendChild(script);
    });
  };
  
  export default loadTwitterScript;