import { useGetFiles } from "../hooks/use-get-files";
import { Loading } from "../utils/loading";
import { FileList } from "./components/fileList";
import styles from "./css/historyPage.module.css";

export const HistoryPage = () => {
	const { data, isLoading } = useGetFiles();

	return (
		<section className={styles.container}>
			{
				isLoading ? (<Loading />) : (<FileList data={data} />)
			}
		</section>
	);
};