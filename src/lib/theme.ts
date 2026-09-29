export type Theme = "dark" | "light";

export const THEME_KEY = "echogpt-theme";

export const NO_FLASH_SCRIPT = `(function(){try{if(window.localStorage.getItem(${JSON.stringify(
  THEME_KEY,
)})==="light"){document.documentElement.setAttribute("data-theme","light");}}catch(e){}})();`;
