import { FileCard } from "./fileCard";
import styles from "../css/fileList.module.css";

export const FileList = ({ data }) => {
	return (
		<>
			<div className={styles.titles}>
				<h2 className={styles.title}>Here are your previous uploads - {data.count} files</h2>
				<h3 className={styles.subtitle}>You can re-generate from here</h3>
			</div>

			<div className={styles.grid}>
				{
					data.results.map(file => (
						<FileCard file={file} />
					))
				}
			</div>
		</>
	);
};