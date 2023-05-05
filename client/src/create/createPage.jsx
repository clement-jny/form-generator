import { useState, useEffect } from "react";
import { Input } from "./components/input";
// import formData from "./utils/form.json";

export const CreatePage = ({ blocks = null }) => {
	const [config, setConfig] = useState([]);
	// const [isReady, setIsReady] = useState(false);
	const [formInputs, setFormInputs] = useState({});

	useEffect(() => {
		fetch("http://localhost:5173/src/create/utils/form.json")
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
			//const inputElements = document.getElementById("form").getElementsByTagName("input");
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

		for (const key in formInputs) {
			if (formInputs[key].trim().length === 0) {
				//console.log(`-${key}: vide`);
				//alert("Some fields are empty!");
				//setShowError(true);
			}
		}

		//alert(inputs.firstname, inputs.age);
		console.log(formInputs);
	};



	const isInputVisible = (input) => {
		if (input.visibility === null) {
			return true;
		}

		if (input.visibility.includes("&")) {
			const conditions = input.visibility.split("&");

			return conditions.every((condition) => {
				const [dependency, value] = condition.split('=');
				return formInputs[dependency] === value;
			});
		} else {
			const [dependency, value] = input.visibility.split('=');
			return formInputs[dependency] === value;
		}
	}


	return (
		<>
		{
			config.length > 0 ? 
			
				<form id="form" onSubmit={handleFormSubmit}>
				{

					config.map((block) => (
						<fieldset key={block.id}>
							<legend>{block.title}</legend>

							
								{
									block.inputs.map((input) => (
										<div key={input.name} style={{ display: isInputVisible(input) ? 'block' : 'none' }}>
											<label>{input.label}</label>
											<input
												type={input.type}
												name={input.name}
												required={input.required}
												onChange={handleInputChange}
												value={formInputs[input.name]}
												style={{ display: isInputVisible(input) ? 'block' : 'none' }}
											/>
										</div>
									))
								}

								
							
						</fieldset>
					))
				}
				<button type="submit">Submit</button>
				</form>
			: <p>pas encore</p>
		}
		</>
	);
};