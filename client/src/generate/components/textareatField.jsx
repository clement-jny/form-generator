{/* <label for="story">Tell us your story:</label>

<textarea id="story" name="story" rows="5" cols="33">
	It was a dark and stormy night...
</textarea> */}

import { useId } from "react";
import { isFieldVisible } from "../helper/isFieldVisible";

export const TextareaField = ({ field, onChangeField, formFields }) => {
	const id = useId();

	return (
		<div key={field.name}>
			<label htmlFor={id + "-" + field.name}>
				<span>{field.label}</span>
			</label>

			<textarea id={id + "-" + field.name} name={field.name} cols={field.cols} rows={field.rows} required={field.required} onChange={onChangeField} value={formFields[field.name]} />
		</div>
	)
};