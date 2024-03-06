import Navigation from "../Navigation/Navigation";
import styles from "./Header.module.css";

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.title}>SHOP</div>
        <Navigation />
      </div>
    </header>
  );
}

export default Header;
