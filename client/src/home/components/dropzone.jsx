import { useState } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import styles from "../css/dropzone.module.css";

export const Dropzone = () => {
	const [content, setContent] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");

	const { open, getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone(
		{
			onDropAccepted: acceptedFiles => {
				setErrorMessage("");
				const reader = new FileReader();

				reader.onabort = () => console.log('file reading was aborted');
				reader.onerror = () => console.log('file reading has failed');

				if (acceptedFiles[0]) reader.readAsText(acceptedFiles[0]);

				//reader.onload = () => setContent(reader.result);

				const formData = new FormData();
				formData.append('file', acceptedFiles[0]);

				fetch("http://localhost:3001/upload", {
					method: "POST",
					headers: {
						"Content-Type": "application/json"
					},
					body: formData
				})
					.then(response => response.json())
					.then(data => alert(data.message))
					.catch(error => console.error(error))
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
				content.length > 0 && (
					<div>
						{/* <Link to="/generate" state={{ content: content }} className={styles.link}>Generate</Link> */}
						<button type="button" onClick={sendFile}>Send File</button>
					</div>
				)
			}
		</section>
	);
};