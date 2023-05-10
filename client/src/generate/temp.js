
<Input label={input.label} name={input.name} type={input.type} required={input.required} visibility={input.visibility} onChangeEv={handleInputChange} />
{/* input.type === "rating"
? (<Rating input={input} />)
: (<Input input={input} onChange={handleInputChange} formInputs={formInputs} />) */}

input.type === "rating"
	? (<Rating input={input} onChange={handleInputChange} />)
	: (<Input input={input} onChange={handleInputChange} formInputs={formInputs} />)

	,
{
	"label": "Note",
	"name": "rate",
	"type": "rating",
	"required": false,
	"visibility": null,
	"minChar": null
}



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