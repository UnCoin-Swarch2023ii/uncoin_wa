import styles from "./page.module.css";
import ModKycApp from "./modalKcy";
import TransApp from "./transaccion";
import FacApp from "./facturas";

export default function Home() {
  return (
    <main className={styles.main}>
      <ModKycApp />
      <TransApp />
    </main>
  );
}
