import { Link } from "react-router-dom";
import jsonLogo from "../../assets/jsonlogo.png";
import styles from "../css/fileCard.module.css";

export const FileCard = ({ file }) => {
	const timestamp = file.id;
	const uploadDate = new Date(timestamp).toLocaleDateString("fr-FR", {
		hour: "numeric",
		minute: "numeric"
	});

	return (
		<div className={styles.card}>
			<div className={styles.cardBody}>
				<img src={jsonLogo} className={styles.img} />

				<div className={styles.text}>
					<p>{file.name}</p>

					<p>{uploadDate}</p>
				</div>
			</div>

			<div className={styles.cardAction}>
				<Link to={`/generate/${file.id}`} className={styles.link}>Generate</Link>
			</div>
		</div>
	);
};