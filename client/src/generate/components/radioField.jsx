{/* <fieldset>
	<legend>Select a maintenance drone:</legend>

	<div>
		<input type="radio" id="huey" name="drone" value="huey"
			checked>
			<label for="huey">Huey</label>
	</div>

	<div>
		<input type="radio" id="dewey" name="drone" value="dewey">
			<label for="dewey">Dewey</label>
	</div>

	<div>
		<input type="radio" id="louie" name="drone" value="louie">
			<label for="louie">Louie</label>
	</div>
</fieldset> */}


// {
// 	"label": "Radiooo",
// 	"name": "radioPets",
// 	"type": "radio",
// 	"required": false,
// 	"visibility": null,
// 	"minChar": null,
// 	"choice": [
// 		{
// 			"text": "dog"
// 		},
// 		{
// 			"text": "cat"
// 		}
// 	]
// }

import { useId } from "react";
import { isFieldVisible } from "../helper/isFieldVisible";

export const RadioField = ({ field, onChangeField, formFields }) => {
	const id = useId();
	// console.log(id + "-dog");

	return (
		<div key={field.name}>
			<p>{field.label}</p>
			{
				field.choices.map((choice) => (
					<>
						<label htmlFor={id + "-" + choice.value}>
							<span>{choice.label}</span>
						</label>

						<input id={id + "-" + choice.value} type={field.type} name={field.name} required={field.required} onChange={onChangeField} value={choice.value} />
					</>
				))
			}
		</div>
	);
};