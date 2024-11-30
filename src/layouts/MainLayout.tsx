import { Link, NavLink, Outlet } from 'react-router-dom';
import './MainLayout.scss';
import gatosSinHogarNavLogo from '@assets/logos/navLogo.png';
import { Button, ButtonType } from '@components/Button/Button';

const MainLayout = () => {
  return (
    <div className="mainLayout">
      <header>
        <nav className="mainLayout__nav">
          <img src={gatosSinHogarNavLogo} alt="" height={55} />
          <div className="mainLayout__navLinks">
            <ul>
              <li>
                <NavLink to="/adopta">Adopta</NavLink>
              </li>
              <li>
                <NavLink to="/voluntarios">Voluntariado</NavLink>
              </li>
              <li>
                <NavLink to="/dona">Dona</NavLink>
              </li>
              <li>
                <NavLink to="/sobre-nosotros">Sobre nosotros</NavLink>
              </li>
            </ul>
            <Button
              buttonType={ButtonType.PRIMARY}
              text="Login"
              onClick={() => console.log('Adopt button clicked')}
            />
          </div>
        </nav>
      </header>
      <main className="mainLayout__children">
        <Outlet />
      </main>
      <footer className="mainLayout__footer">
        <div className="mainLayout__footerSocials">
          <Link to="/facebook">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/facebook-new.png"
              alt="Facebook"
            />
          </Link>
          <Link to="/instagram">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/instagram-new.png"
              alt="Instagram"
            />
          </Link>
          <Link to="/twitter">
            <img
              src="https://img.icons8.com/ios-glyphs/30/000000/twitter.png"
              alt="Twitter"
            />
          </Link>
        </div>
        <p className="mainLayout__copy">
          &copy; 2024 Gatos Sin Hogar Gran Canaria
        </p>
      </footer>
    </div>
  );
};

export default MainLayout;
