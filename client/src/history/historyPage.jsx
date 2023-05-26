import { useGetFiles } from "../hooks/use-get-files";
import { Loading } from "../utils/loading";
import styles from "./css/historyPage.module.css";

export const HistoryPage = () => {
	const { data, isLoading } = useGetFiles();

	return (
		<section className={styles.container}>
			{
				isLoading
					? (<Loading />)
					: (
						<div>
							<h2>Liste des fichiers :</h2>
							<h3>{data.count}</h3>
							<ul>
								{
									data.results.map((file) => (
										<li key={file.id}>{file.name}, {file.id}, {file.path}</li>
									))
								}
							</ul>
						</div>
					)
			}
		</section>
	);
};