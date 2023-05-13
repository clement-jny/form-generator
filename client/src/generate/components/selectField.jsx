{/* <label for="pet-select">Choose a pet:</label>

<select name="pets" id="pet-select">
    <option value="">--Please choose an option--</option>
    <option value="dog">Dog</option>
    <option value="cat">Cat</option>
    <option value="hamster">Hamster</option>
    <option value="parrot">Parrot</option>
    <option value="spider">Spider</option>
    <option value="goldfish">Goldfish</option>
</select> */}

// "label": "Select",
// "name": "selectPets",
// "type": "select",
// "required": false,
// "visibility": null,
// "minChar": null,
// "options": [
// 		{
// 			"text": "dog"
// 		},
// 		{
// 			"text": "cat"
// 		}
// ]

import { useId } from "react"
import { isFieldVisible } from "../helper/isFieldVisible";

export const SelectField = ({ field, onChangeField, formFields }) => {
	const id = useId();

	return (
		<div key={field.name}>
			<label htmlFor={id + "-" + field.name}>
				<span>{field.label}</span>
			</label>

			<select id={id + "-" + field.name} name={field.name} required={field.required} onChange={onChangeField} value={formFields[field.name]}>
			{
				field.options.map((opt) => (
					<option value={opt.value}>{opt.label}</option>
				))
			}
			</select>
		</div>
	);
};