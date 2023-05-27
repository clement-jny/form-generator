import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useGetFile } from "../hooks/use-get-file";

import { CommonField } from "./components/commonField";
import { CheckboxField } from "./components/checkboxField";
import { SelectField } from "./components/selectField";
import { RadioField } from "./components/radioField";
import { TextareaField } from "./components/textareatField";
import { RatingField } from "./components/ratingField";
import { Loading } from "../utils/loading";

import styles from "./css/generatePage.module.css";

export const GeneratePage = () => {
	const { fileId } = useParams();
	const { data, isLoading } = useGetFile(fileId);
	const [formFields, setFormFields] = useState({});
	const [formErrors, setFormErrors] = useState({});

	/* When data, get the form element and then get all inputs, selects, textarea. Save the name into a new state */
	useEffect(() => {
		if (data) {
			toast.success("Successfully generated");

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
	}, [data]);

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
				return <CheckboxField field={field} onChangeField={handleFieldChange} formFields={formFields} formErrors={formErrors} />

			case "select":
				return <SelectField field={field} onChangeField={handleFieldChange} formFields={formFields} formErrors={formErrors} />;

			case "radio":
				return <RadioField field={field} onChangeField={handleFieldChange} formFields={formFields} formErrors={formErrors} />;

			case "textarea":
				return <TextareaField field={field} onChangeField={handleFieldChange} formFields={formFields} formErrors={formErrors} />;

			case "rating":
				return <RatingField field={field} onChangeField={handleFieldChange} formFields={formFields} formErrors={formErrors} />;

			default:
				return <CommonField field={field} onChangeField={handleFieldChange} formFields={formFields} formErrors={formErrors} />;
		}
	}

	/* Called when the form trigger 'onSubmit' event */
	const handleFormSubmit = (event) => {
		event.preventDefault();

		const errors = {};

		// Vérifier les champs requis
		data.forEach((block) => {
			block.fields.forEach((field) => {
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
			toast.success("Successfully validated, check your console");
		} else {
			console.log("Not valid.", formFields);
			toast.error("Some fields are missing");
		}
	};

	return (
		<section className={styles.container}>
			{
				isLoading
					? (<Loading />)
					: (
						<form id="form" className={styles.form} onSubmit={handleFormSubmit}>
							{
								data.map((block) => (
									<fieldset key={block.id} className={styles.fieldset}>
										<legend>{block.title}</legend>
										{
											block.fields.map(field => renderField(field))
										}
									</fieldset>
								))
							}

							<button type="submit" className={styles.submit}>Submit</button>
						</form>
					)
			}
		</section>
	)
};