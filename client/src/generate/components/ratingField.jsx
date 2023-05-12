import { useId } from "react";

export const RatingField = ({ field, onChangeField, formFields }) => {
	const id = useId();

	return (
		<div key={field.name}>
			<label>{field.label}
				<input
					type="radio"
					name={field.name}
					required={field.required}
					// checked={formInputs[field.name]}
					onChange={onChangeField}
				/>
				<input
					type="radio"
					name={field.name}
					required={field.required}
					// checked={formInputs[field.name]}
					onChange={onChangeField}
				/>
				<input
					type="radio"
					name={field.name}
					required={field.required}
					// checked={formInputs[field.name]}
					onChange={onChangeField}
				/>
				<input
					type="radio"
					name={field.name}
					required={field.required}
					// checked={formInputs[field.name]}
					onChange={onChangeField}
				/>
				<input
					type="radio"
					name={field.name}
					required={field.required}
					// checked={formInputs[field.name]}
					onChange={onChangeField}
				/>
			</label>
		</div>
	);
}