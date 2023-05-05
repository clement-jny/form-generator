// export const Input = ({ label, name, type, required, visibility, onChangeEv }) => {
// 	{/* if type === "rating" -> Rating component */}

// 	if (visibility !== null) {
// 		console.log(visibility)
// 	}
// 	return (
// 		<>
// 			<label>
// 				{label}
// 				<input name={name} type={type} required={required} onChange={onChangeEv} />
// 			</label>
// 		</>
// 	);
// }

export const Input = ({ input }) => {
	return (<>isInputVisible</>);
};


const isInputVisible = (input) => {
	if (input.visibility === null) {
		return true;
	}

	const [dependency, value] = input.visibility.split('=');
	return formInputs[dependency] === value;
}