import { useState, useEffect, useId } from "react";
import { useLocation } from "react-router-dom";

import { CommonField } from "./components/commonField";
import { SelectField } from "./components/selectField";
import { RadioField } from "./components/radioField";
import { TextareaField } from "./components/textareatField";
import { RatingField } from "./components/ratingField";

// import formData from "./utils/form.json";

export const GeneratePage = () => {
	//const { state: { content } } = useLocation();
	//console.log(content);
	//if (content) setConfig(content);
	//console.log("config", config);

	const [config, setConfig] = useState([]);
	const [formFields, setFormFields] = useState({});

	/* Fetch the configuration file and save it into the config state */
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
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	/* When config, get the form element and then get all inputs, selects, textarea. Save the name into a new state */
	useEffect(() => {
		if (config) {
			const formElement = document.getElementById("form");
			if (!formElement) return;

			const inputElements = formElement.getElementsByTagName("input");
			const selectElements = formElement.getElementsByTagName("select");
			const textareaElements = formElement.getElementsByTagName("textarea");

			const inputNames = {};
			const selectNames = {};
			const textareaNames = {};

			if (inputElements.length > 0) {
				for (const element of inputElements) {
					inputNames[element.name] = "";
				}
			}

			if (selectElements.length > 0) {
				for (const element of selectElements) {
					selectNames[element.name] = "";
				}
			}

			if (textareaElements.length > 0) {
				for (const element of textareaElements) {
					textareaNames[element.name] = "";
				}
			}

			setFormFields({ ...structuredClone(inputNames), ...structuredClone(selectNames), ...structuredClone(textareaNames) });
		}
	}, [config]);


	/* Called when a field trigger 'onChange' event */
	const handleFieldChange = (event) => {
		const { name, value, type, checked } = event.target;
		const newValue = type === 'checkbox' ? checked : value;
		setFormFields({ ...formFields, [name]: newValue });
	};

	/* Render a specific field based on the type */
	const renderField = (field) => {
		switch (field.type) {
			case "select":
				return <SelectField field={field} onChangeField={handleFieldChange} formFields={formFields} />;
				break;

			case "radio":
				return <RadioField field={field} onChangeField={handleFieldChange} formFields={formFields} />;
				break;

			case "textarea":
				return <TextareaField field={field} onChangeField={handleFieldChange} formFields={formFields} />;
				break;

			case "rating":
				return <RatingField field={field} onChangeField={handleFieldChange} formFields={formFields} />;
				break;

			default:
				return <CommonField field={field} onChangeField={handleFieldChange} formFields={formFields} />;
				break;
		}
	}


	/* Called when the form trigger 'onSubmit' event */
	const handleFormSubmit = (event) => {
		event.preventDefault();

		// for (const key in formFields) {
		// 	if (formFields[key].trim().length === 0) {

		// 		//console.log(formFields[key] < );
		// 		//console.log(`-${key}: vide`);
		// 		//alert("Some fields are empty!");
		// 		//setShowError(true);
		// 	}
		// }

		//alert(inputs.firstname, inputs.age);
		console.log(formFields);
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
										block.fields.map(field => renderField(field))
									}
								</fieldset>
							))
						}

						<button type="submit">Submit</button>
					</form>
				) : (<p>Loading data...</p>)
			}
		</section>
	)
};