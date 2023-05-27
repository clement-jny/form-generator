// ,
// {
// 	"type": "rating",

// 	"label": "Rate",
// 	"name": "rate",
	
// 	"required": false,
// 	"visibility": null,
// 	"minChar": null
// }

import { useId } from "react";
import { isFieldVisible } from "../helper/isFieldVisible";

export const RatingField = ({ field, onChangeField, formFields, formErrors }) => {
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