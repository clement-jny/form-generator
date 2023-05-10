export const Rating = ({ input, onChange, formInputs }) => {
	return (
		<div key={input.name}>
			<label>{input.label}
				<input
					type="radio"
					name={input.name}
					required={input.required}
					// checked={formInputs[input.name]}
					onChange={onChange}
				/>
				<input
					type="radio"
					name={input.name}
					required={input.required}
					// checked={formInputs[input.name]}
					onChange={onChange}
				/>
				<input
					type="radio"
					name={input.name}
					required={input.required}
					// checked={formInputs[input.name]}
					onChange={onChange}
				/>
				<input
					type="radio"
					name={input.name}
					required={input.required}
					// checked={formInputs[input.name]}
					onChange={onChange}
				/>
				<input
					type="radio"
					name={input.name}
					required={input.required}
					// checked={formInputs[input.name]}
					onChange={onChange}
				/>
			</label>
		</div>
	);
};