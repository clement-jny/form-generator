import { useState, useEffect, useCallback, useMemo } from "react";
import { Link } from "react-router-dom";
import { useDropzone } from "react-dropzone";

import styles from "../css/homePage.module.css";

export const Dropzone = () => {
	const [content, setContent] = useState([]);
	const [isDisabled, setIsDisabled] = useState(true);

	const { open, getRootProps, getInputProps, isDragAccept, isDragReject, acceptedFiles, fileRejections } = useDropzone(
		{
			onDrop: acceptedFiles => {
				acceptedFiles.forEach((file) => {
					const reader = new FileReader();

					reader.onabort = () => console.log('file reading was aborted');
					reader.onerror = () => console.log('file reading has failed');

					if (file) reader.readAsText(file);

					reader.onload = () => setContent(reader.result);
				});
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

	// const dropzoneStyle = useMemo(() => ({
	// 	...baseStyle,
	// 	...(isDragAccept ? acceptStyle : {}),
	// 	...(isDragReject ? rejectStyle : {})
	// }), [isDragAccept, isDragReject]);

	const acceptedFileItems = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	const fileRejectionItems = fileRejections.map(({ file, errors }) => {
		console.log(errors);
		return (
			<li key={file.path}>
				{file.path} - {file.size} bytes
				<ul>
					{errors.map(e => <li key={e.code}>{e.message}</li>)}
				</ul>
			</li>
		)
	});

	return (
		<section id="start" className={styles.container}>
			<div {...getRootProps()} className={`${styles.baseStyle} ${isDragAccept ? styles.acceptStyle : isDragReject ? styles.rejectStyle : ""}`}>  {/* { style: dropzoneStyle } */}
				<input {...getInputProps()} />

				<p className={styles.title}>Drag 'n' drop here</p>
				<em>(Only 1 .json file will be accepted)</em>

				<button type="button" onClick={open}>Open File Dialog</button>
			</div>

			<aside>
				<h4>Accepted files</h4>
				<ul>{acceptedFileItems}</ul>
				<h4>Rejected files</h4>
				<ul>{fileRejectionItems}</ul>
			</aside>

			{
				acceptedFiles ? (
					<div>
						{/* <button onClick={prev => setIsDisabled(!prev)}>Update</button> */}
						<button onClick={console.log(content[1])}>Update</button>
						<textarea cols="50" rows="15" value={content} onChange={e => setContent(e.target.value)} disabled={isDisabled} />

						<Link to="/create" state={{ content: content }}>Generate</Link>
					</div>
				) : (<p>11</p>)
			}

			
		</section>
	);
};