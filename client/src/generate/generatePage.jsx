import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Input } from "./components/input";
import { Rating } from "./components/rating";
// import formData from "./utils/form.json";

export const GeneratePage = () => {
	//const { state: { content } } = useLocation();
	//console.log(content);

	const [config, setConfig] = useState([]);

	//if (content) setConfig(content);
	//console.log("config", config);

	// const [isReady, setIsReady] = useState(false);
	const [formInputs, setFormInputs] = useState({});

	useEffect(() => {
		fetch("http://localhost:5173/src/generate/utils/configuration.json")
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error(res.status);
				}
			})
			.then((res) => {
				setConfig(res);
				// setIsReady(true);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);


	useEffect(() => {
		if (config) {
			const formElement = document.getElementById("form");
			if (!formElement) return;

			const inputElements = formElement.getElementsByTagName("input");
			const inputsName = {};

			for (const element of inputElements) {
				inputsName[element.name] = "";
			}

			setFormInputs(structuredClone(inputsName));
		}
	}, [config]);


	const handleInputChange = (event) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === 'checkbox' ? checked : value;
		setFormInputs({ ...formInputs, [name]: newValue });
	};

	const handleFormSubmit = (event) => {
		event.preventDefault();

		// for (const key in formInputs) {
		// 	if (formInputs[key].trim().length === 0) {

		// 		//console.log(formInputs[key] < );
		// 		//console.log(`-${key}: vide`);
		// 		//alert("Some fields are empty!");
		// 		//setShowError(true);
		// 	}
		// }

		//alert(inputs.firstname, inputs.age);
		console.log(formInputs);
	};

	return (
		<section>
			{
				config.length > 0 ? (
					<form id="form" onSubmit={handleFormSubmit}>
						{
							config.map((block) => (
								<fieldset key={block.id}>
									<legend>{block.title}</legend>
									{
										block.inputs.map((input) => (
											<Input input={input} onChange={handleInputChange} formInputs={formInputs} />
										))
									}
								</fieldset>
							))
						}
						<button type="submit">Submit</button>
					</form>
				) : (<p>Chargement en cours...</p>)
			}
		</section>
	)
};