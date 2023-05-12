{/* <label for="story">Tell us your story:</label>

<textarea id="story" name="story" rows="5" cols="33">
	It was a dark and stormy night...
</textarea> */}
{/* <textarea cols="50" rows="15" value={content} onChange={e => setContent(e.target.value)} disabled={isDisabled} /> */ }

import { useId } from "react";

export const TextareaField = ({ field, onChangeField, formFields }) => {
	const id = useId();

	return (
		<div key={field.name}>
			<label htmlFor={id}>
				<span>{field.label}</span>
			</label>

			<textarea id={id} name={field.name} />
		</div>
	)
};