import { Landing } from "./components/landing";
import { Dropzone } from "./components/dropZone";
import { useLayoutEffect } from "react";

export const HomePage = () => {
	useLayoutEffect(() => {
		const link = document.querySelector('a[href="#start"]');

		link.addEventListener('click', function (event) {
			event.preventDefault();

			const section = document.getElementById('start');
			section.scrollIntoView({
				behavior: 'smooth'
			});
		});
	}, []);

	return (
		<>
			<Landing />
			<Dropzone />
		</>
	);
};