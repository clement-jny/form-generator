import { useState } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import styles from "../css/dropzone.module.css";

export const Dropzone = () => {
	const [content, setContent] = useState([]);
	const [errorMessage, setErrorMessage] = useState("");
	// const [isDisabled, setIsDisabled] = useState(true);

	const { open, getRootProps, getInputProps, isDragAccept, isDragReject } = useDropzone(
		{
			onDropAccepted: acceptedFiles => {
				setErrorMessage("");
				const reader = new FileReader();

				reader.onabort = () => console.log('file reading was aborted');
				reader.onerror = () => console.log('file reading has failed');

				if (acceptedFiles[0]) reader.readAsText(acceptedFiles[0]);

				reader.onload = () => setContent(reader.result);
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
					<input {...getInputProps()} />

					<p className={styles.title}>Drop a file here</p>
					<em className={styles.subtitle}>(Only 1 .json file will be accepted)</em>

					<span className={styles.separator}>OR</span>

					<button type="button" onClick={open} className={styles.button}>Choose a file</button>
				</div>
			</div>

			{
				content.length > 0 && (
					<div>
						{/* <textarea cols="50" rows="15" value={content} onChange={e => setContent(e.target.value)} disabled={isDisabled} /> */}
						<Link to="/generate" state={{ content: content }} className={styles.link}>Generate</Link>
					</div>
				)
			}
		</section>
	);
};