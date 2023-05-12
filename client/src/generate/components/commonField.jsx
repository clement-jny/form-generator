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

export const CommonField = ({ field, onChangeField, formFields }) => {
	const id = useId();

	return (
		<div key={field.name} style={{ display: "flex", flexDirection: "column"}}>
			<label >{/*htmlFor={id}*/}
				<span>{field.label}</span>
</label>
				<input
					// id={id}
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

const isFieldVisible = (field, formFields) => {
	if (field.visibility === null) {
		return true;
	}

	if (field.visibility.includes("&")) {
		const conditions = field.visibility.split("&");

		return conditions.every((condition) => {
			const [dependency, value] = condition.split('=');
			return formFields[dependency] === value;
		});
	} else {
		const [dependency, value] = field.visibility.split('=');
		return formFields[dependency] === value;
	}
}