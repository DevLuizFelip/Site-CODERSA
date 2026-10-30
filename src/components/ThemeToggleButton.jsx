import { useTheme } from '../context/ThemeContext';
export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro'}><span aria-hidden="true">{theme === 'light' ? '◐' : '☼'}</span></button>;
}
