import { Link } from "react-router-dom";
import styles from "../css/homePage.module.css";

export const Landing = () => {
	return (
		<section className={styles.flex}>
				<h1 className={styles.blue}>Form Generator</h1>

				<div>
					<a href="#start">Get Started!</a>

					<Link to="/create">Get </Link>
					<Link to="/history">History</Link>

				</div>

				

			</section>
	);
};