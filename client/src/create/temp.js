
<Input label={input.label} name={input.name} type={input.type} required={input.required} visibility={input.visibility} onChangeEv={handleInputChange} />


{/* formData.inputs.map((input) => (
					<div key={input.name} style={{ display: isInputVisible(input, formState) ? 'block' : 'none' }}>
						<label>{input.label}</label>
						<input
							type={input.type}
							name={input.name}
							required={input.required}
							value={formState[input.name]}
							onChange={handleInputChange}
						/>
					</div>
				)) */}






{
	form.map((block) => (
		<ul>
			{
				block.inputs.map((input) => (
					<>
						{/* <li>{input.label}</li>
							<li>{input.name}</li>
							<li>{input.type}</li> */}
						<Input label={input.label} name={input.name} type={input.type} required={input.required} visibility={input.visibility} onChangeEv={handleInputChange} />
						{/* <li>{input.required ? "oui" : "non"}</li> */}
						<li>{input.visibility || "null"}</li>
					</>
				))}</ul>
	))
}