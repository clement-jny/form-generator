import { useState } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";
import { usePostFile } from "../../hooks/use-post-file";
import { toast } from "react-hot-toast";

import styles from "../css/dropzone.module.css";

export const Dropzone = () => {
	const { mutate } = usePostFile();
	const [isUploaded, setIsUploaded] = useState(false);
	const [fileId, setFileId] = useState(null);
	const [errorMessage, setErrorMessage] = useState("");

	const { open, getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone(
		{
			onDropAccepted: acceptedFiles => {
				setErrorMessage("");

				if (acceptedFiles[0]) {
					const formData = new FormData();
					formData.append('file', acceptedFiles[0]);

					mutate(formData, {
						onSuccess: (data) => {
							toast.success(data.message);
							setIsUploaded(true);
							setFileId(data.id);
						}
					});
				}
			},
			onDropRejected: fileRejections => {
				setErrorMessage(fileRejections[0].errors[0].message);
			},
			noClick: true,
			noKeyboard: true,
			accept: {
				"application/json": [".json"]
			},
			maxFiles: 1,
			multiple: false
		}
	);

	return (
		<section id="start" className={styles.container}>
			<div>
				<p className={styles.error}>{errorMessage}</p>

				<div {...getRootProps()} className={`${styles.dropzone} ${isDragAccept ? styles.dropzoneAccept : isDragReject ? styles.dropzoneReject : ""}`}>  {/* { style: dropzoneStyle } */}
					<input {...getInputProps()} id="fileInput" name="fileInput" />

					<p className={styles.title}>Drop a file here</p>
					<em className={styles.subtitle}>(Only 1 .json file will be accepted)</em>

					<span className={styles.separator}>OR</span>

					<button type="button" onClick={open} className={styles.button}>Choose a file</button>
				</div>
			</div>

			{
				isUploaded && (
					<div>
						<Link to={`/generate/${fileId}`} className={styles.link}>Generate</Link>
					</div>
				)
			}
		</section>
	);
};