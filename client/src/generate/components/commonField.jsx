import { useId } from "react";
import { isFieldVisible } from "../helper/isFieldVisible";
import styles from "../css/commonField.module.css";

export const CommonField = ({ field, onChangeField, formFields, formErrors }) => {
	const id = useId();

	return (
		<div className={isFieldVisible(field, formFields) ? styles.inputContainer : styles.notInputContainer}>
			<label htmlFor={id + "-" + field.name} className={styles.label}>
				<span>{field.label}</span>
				{field.required && <span className={styles.required}> *</span>}
			</label>

			<input id={id + "-" + field.name} type={isFieldVisible(field, formFields) ? field.type : "hidden"} name={field.name} className={`${styles.input} ${formErrors[field.name] ? styles.error : ""}`} value={formFields[field.name]} onChange={onChangeField} placeholder={field.label} />
			
			<span className={styles.errorMessage}>{formErrors[field.name]}</span>
		</div>
	);
};