// {
// 	"type": "date",

// 	"label": "Date",
// 	"name": "date",

// 	"required": false,
// 	"visibility": null,
// 	"minChar": null
// },

// {
// 	"type": "email",

// 	"label": "Mail",
// 	"name": "mail",

// 	"required": false,
// 	"visibility": null,
// 	"minChar": null
// },

//<p>Tous ce qui est text, (password,) number, date, email, checkbox</p>

import { useId } from "react";
import { isFieldVisible } from "../helper/isFieldVisible";

export const CommonField = ({ field, onChangeField, formFields }) => {
	const id = useId();

	return (
		<div key={field.name}>
			<label htmlFor={id + "-" + field.name}>
				<span>{field.label}</span>
			</label>

			<input
				id={id + "-" + field.name}
				type={isFieldVisible(field, formFields) ? field.type : "hidden"}
				name={field.name}
				required={field.required}
				onChange={onChangeField}
				value={formFields[field.name]}
				checked={field.defaultChecked}
			// style={{ display: isFieldVisible(field, formFields) ? 'block' : 'none' }}
			/>
		</div>
	);
};