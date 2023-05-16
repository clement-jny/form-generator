import { useState, useEffect, useId } from "react";
import { useLocation } from "react-router-dom";

import styles from "./css/generatePage.module.css";

import { CommonField } from "./components/commonField";
import { CheckboxComponent } from "./components/checkboxComponent";
import { SelectField } from "./components/selectField";
import { RadioField } from "./components/radioField";
import { TextareaField } from "./components/textareatField";
import { RatingField } from "./components/ratingField";
import { Loading } from "./components/loading";

// import formData from "./utils/form.json";

export const GeneratePage = () => {
	//const { state: { content } } = useLocation();
	//console.log(content);
	//if (content) setConfig(content);
	//console.log("config", config);

	const [isLoading, setIsLoading] = useState(false);
	const [config, setConfig] = useState([]);
	const [formFields, setFormFields] = useState({});
	const [formErrors, setFormErrors] = useState({});


	/* Fetch the configuration file and save it into the config state */
	useEffect(() => {
		setIsLoading(true);

		fetch("http://localhost:5173/src/generate/utils/configuration.json")
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw new Error(res.status);
				}
			})
			.then((res) => {
				setIsLoading(false);
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
			case "checkbox":
				return <CheckboxComponent field={field} onChangeField={handleFieldChange} formFields={formFields} formErrors={formErrors} />

			case "select":
				return <SelectField field={field} onChangeField={handleFieldChange} formFields={formFields} />;

			case "radio":
				return <RadioField field={field} onChangeField={handleFieldChange} formFields={formFields} />;

			case "textarea":
				return <TextareaField field={field} onChangeField={handleFieldChange} formFields={formFields} />;

			case "rating":
				return <RatingField field={field} onChangeField={handleFieldChange} formFields={formFields} />;

			default:
				return <CommonField field={field} onChangeField={handleFieldChange} formFields={formFields} formErrors={formErrors} />;
		}
	}


	/* Called when the form trigger 'onSubmit' event */
	const handleFormSubmit = (event) => {
		event.preventDefault();

		const errors = {};

		// Vérifier les champs requis
		config.forEach((block) => {
			block.fields.forEach((field) => {
				/* This code block is checking if a field is required and if its corresponding value in the
				`formFields` state is empty or falsy. If both conditions are true, it adds an error message to
				the `errors` object with the field name as the key and a string message as the value. The error
				message indicates that the field is required and provides the label of the field. This is used
				to validate the form before submission and display error messages for any required fields that
				are not filled out. */
				if (field.required && !formFields[field.name]) {
					errors[field.name] = " This field is required";
				}
			});
		});

		// Mettre à jour les erreurs du formulaire
		setFormErrors(errors);

		// Soumettre le formulaire si aucune erreur n'est présente
		if (Object.keys(errors).length === 0) {
			// Soumettre le formulaire
			console.log("Valid.", formFields);
		} else {
			console.log("Not valid.", formFields);
		}

		// for (const key in formFields) {
		// 	if (formFields[key].trim().length === 0) {

		// 		//console.log(formFields[key] < );
		// 		//console.log(`-${key}: vide`);
		// 		//alert("Some fields are empty!");
		// 		//setShowError(true);
		// 	}
		// }
	};

	return (
		<section className={styles.container}>
			{
				isLoading
					? (<Loading />)
					: (
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
					)
			}
		</section>
	)
};