import { useId } from "react";
import { isFieldVisible } from "../helper/isFieldVisible";
import styles from "../css/textareaField.module.css";

export const TextareaField = ({ field, onChangeField, formFields, formErrors }) => {
	const id = useId();

	return (
		<div className={isFieldVisible(field, formFields) ? styles.inputContainer : styles.notInputContainer}>
			<label htmlFor={id + "-" + field.name} className={styles.label}>
				<span>{field.label}</span>
				{field.required && <span className={styles.required}> *</span>}
			</label>

			<textarea id={id + "-" + field.name} name={field.name} className={`${styles.input} ${formErrors[field.name] ? styles.error : ""}`} onChange={onChangeField} value={formFields[field.name]} />

			<span className={styles.errorMessage}>{formErrors[field.name]}</span>
		</div>
	)
};