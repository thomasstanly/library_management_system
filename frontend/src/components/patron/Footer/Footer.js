import styles from './Footer.module.scss';

const Footer = () => (
  <div className={styles.footer}>
    <div className={styles['footer-column']}>
      <p className={`${styles['footer-column-title']} ${styles.title}`}>About Us</p>
      <p className={styles['footer-column-text']}>
        Ombrulla is an AI-driven company providing specialized services like AI Visual Inspection,
        AI People Tracking, AI Defect Detection, AI Infrastructure Inspection, and AI Data Analytics.
        Our tailored solutions empower businesses with data-driven decisions, automation, and improved bottom lines.
        PETRAN, our cutting-edge tracking solution, utilizes AI and IoT to monitor assets, machinery, equipment, people,
        and facilities, enabling comprehensive performance management and environmental sustainability.
      </p>
    </div>
    <div className={styles['footer-column']}>
      <p className={styles['footer-column-title']}>Our Service</p>
      <p className={styles['footer-column-text']}>AI Infrastructure Inspection</p>
      <p className={styles['footer-column-text']}>AI Visual Inspection</p>
      <p className={styles['footer-column-text']}>AI Data Analytics</p>
      <p className={styles['footer-column-text']}>AI People Tracking</p>
    </div>
    <div className={styles['footer-column']}>
      <p className={styles['footer-column-title']}>Our Solutions</p>
      <p className={styles['footer-column-text']}>Asset Performance Management</p>
      <p className={styles['footer-column-text']}>RTLS - Workplace Safety</p>
      <p className={styles['footer-column-text']}>Environmental Sustainability</p>
    </div>
    <div className={styles['footer-column']}>
      <p className={styles['footer-column-title']}>Reach Us</p>
      <p className={styles['footer-column-text']}>United Kingdom,7 <br /> Bell Yard London, <br />WC2A 2JR +44 7879 993892</p>
      <p className={`${styles['footer-column-text']} ${styles['footer-column-address']}`}>Germany, <br />Schützenstraße 51A Lübeck,<br /> 23558 +49 179 512 5812</p>
      <p className={styles['footer-column-text']}>India, No. 154/20,<br /> Royal SpaceThird Floor TI,<br />  HSR Layout, Bangalore, Karnataka 560102 +91 85900 56435</p>
    </div>
  </div>
);

export default Footer;
