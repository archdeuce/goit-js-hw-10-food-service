import './styles.css';
import menuData from './menu.json';
import menuTemplate from './templates/menu.hbs';

const refs = {
  body: document.querySelector('body'),
  menu: document.querySelector('.js-menu'),
  //themeSwitcherControl: document.querySelector('.theme-switch__control'),
  themeSwitchTogller: document.querySelector('#theme-switch-toggle'),
};

const THEME = {
  LIGHT: 'light-theme',
  DARK: 'dark-theme',
};

const markupMaker = menu => {
  return menu.map(menuItem => menuTemplate(menuItem)).join(' ');
};

const setLightTheme = () => {
  refs.body.classList.remove(THEME.DARK);
  refs.body.classList.add(THEME.LIGHT);
};

const setDarkTheme = () => {
  refs.body.classList.remove(THEME.LIGHT);
  refs.body.classList.add(THEME.DARK);
};

const switchTheme = e => {
  if (refs.themeSwitchTogller.checked) {
    setDarkTheme();
    saveConfig(THEME.DARK);
  } else {
    setLightTheme();
    saveConfig(THEME.LIGHT);
  }
};

const readConfig = () => {
  return localStorage.getItem('theme');
};

const saveConfig = theme => {
  localStorage.setItem('theme', theme);
};

refs.themeSwitchTogller.addEventListener('change', switchTheme);

const renderMarkup = markup => (refs.menu.innerHTML = markup);
const markup = markupMaker(menuData);

renderMarkup(markupMaker(menuData));

const config = readConfig();

if (!config || config === THEME.LIGHT) {
  setLightTheme();
  saveConfig(THEME.LIGHT);
} else {
  setDarkTheme();
  saveConfig(THEME.DARK);
  refs.themeSwitchTogller.checked = true;
}
