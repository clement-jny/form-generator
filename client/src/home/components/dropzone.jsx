import { useState, useEffect, useCallback, useMemo } from "react";
import { useDropzone } from "react-dropzone";

import styles from "../css/homePage.module.css";
import { baseStyle, acceptStyle, rejectStyle } from "../css/dropzone.css.js";
import { Link } from "react-router-dom";

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

	const dropzoneStyle = useMemo(() => ({
		...baseStyle,
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {})
	}), [isDragAccept, isDragReject]);

	const acceptedFileItems = acceptedFiles.map(file => (
		<li key={file.path}>
			{file.path} - {file.size} bytes
		</li>
	));

	const fileRejectionItems = fileRejections.map(({ file, errors }) => {
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
		<section id="start" className="">

			<div {...getRootProps({ style: dropzoneStyle })}>
				<input {...getInputProps()} />

				<p>Drag 'n' drop here</p>
				<em>(Only 1 .json file will be accepted)</em>

				<button type="button" onClick={open}>
					Open File Dialog
				</button>
			</div>

			<aside>
				<h4>Accepted files</h4>
				<ul>{acceptedFileItems}</ul>
				<h4>Rejected files</h4>
				<ul>{fileRejectionItems}</ul>
			</aside>

			<aside>
				<button onClick={prev => setIsDisabled(!prev)}>Update</button>
				<textarea value={content} onChange={e => setContent(e.target.value)} disabled={isDisabled}></textarea>

				<Link to="/create" state={{ content: content }}>Generate</Link>
			</aside>
		</section>
	);
};