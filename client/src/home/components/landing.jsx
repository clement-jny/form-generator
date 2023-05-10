import { Link } from "react-router-dom";
import styles from "../css/landing.module.css";

export const Landing = () => {
	return (
		<section className={styles.container}>
			<div className={styles.heading}>
				<h1 className={styles.title}>Form Generator</h1>

				<q className={styles.quote}>Create forms easily from a JSON file!</q>
			</div>

			<span className={styles.separator}></span>

			<div className={styles.linksContainer}>
				<a href="#start" className={styles.link}>Get Started</a>

				<Link to="/history" className={styles.link}>History</Link>
			</div>
		</section>
	);
};