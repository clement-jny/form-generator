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