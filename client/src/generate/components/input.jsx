export const Input = ({ input, onChange, formInputs }) => {
	return (
		<div key={input.name}>
			<label>{input.label}
				<input
					type={isInputVisible(input, formInputs) ? input.type : "hidden"}
					name={input.name}
					required={input.required}
					onChange={onChange}
					value={formInputs[input.name]}
					// style={{ display: isInputVisible(input, formInputs) ? 'block' : 'none' }}
				/>
			</label>
		</div>
	);
};

{/* if type === "rating" -> Rating component */}
const isInputVisible = (input, formInputs) => {
	if (input.visibility === null) {
		return true;
	}

	if (input.visibility.includes("&")) {
		const conditions = input.visibility.split("&");

		return conditions.every((condition) => {
			const [dependency, value] = condition.split('=');
			return formInputs[dependency] === value;
		});
	} else {
		const [dependency, value] = input.visibility.split('=');
		return formInputs[dependency] === value;
	}
}