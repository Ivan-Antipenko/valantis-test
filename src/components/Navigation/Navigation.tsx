import styles from "./Navigation.module.css";

function Navigation() {
  return (
    <nav className={styles.nav}>
      <ul className={styles.list}>
        <li className={styles.menu}>Menu</li>
        <li className={styles.menu}>Menu</li>
        <li className={styles.menu}>Menu</li>
        <li className={styles.menu}>Menu</li>
        <li className={styles.menu}>Menu</li>
      </ul>
    </nav>
  );
}

export default Navigation;
