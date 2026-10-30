import { Link } from 'react-router-dom';
import Brand from '../site/Brand';
import { channels } from '../site/channels';
export default function Footer() { return <footer className="site-footer"><Link className="logo" to="/" aria-label="CODERSA — início"><Brand/></Link><span>Software, automação e IA aplicada.</span><a href={`mailto:${channels.email}`}>{channels.email}</a><span>© 2026 CODERSA</span></footer>; }
