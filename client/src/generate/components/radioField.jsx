import { useId } from "react";
import { isFieldVisible } from "../helper/isFieldVisible";
import styles from "../css/radioField.module.css";

export const RadioField = ({ field, onChangeField, formFields, formErrors }) => {
	const id = useId();

	return (
		<div className={isFieldVisible(field, formFields) ? styles.inputContainer : styles.notInputContainer}>
			<label className={styles.label}>
				<span>{field.label}</span>
				{field.required && <span className={styles.required}> *</span>}
			</label>

			<div className={styles.choices}>
				{
					field.choices.map((choice) => (
						<div>
							<label htmlFor={id + "-" + choice.value}>
								<span>{choice.label}</span>
							</label>

							<input id={id + "-" + choice.value} type={field.type} name={field.name} className={`${styles.input} ${formErrors[field.name] ? styles.error : ""}`} onChange={onChangeField} value={choice.value} />
						</div>
					))
				}
			</div>

			<span className={styles.errorMessage}>{formErrors[field.name]}</span>
		</div>
	);
};