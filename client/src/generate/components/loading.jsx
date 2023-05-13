import styles from "../css/loading.module.css";

export const Loading = () => {
	return (
		<div className={styles.container}>
			<span className={styles.spinner}></span>
		</div>
	);
};