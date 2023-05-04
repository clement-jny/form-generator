import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import { HomePage } from "../homePage";


describe("Test for HomePage", () => {
	it("Render 'Hello World!'", () => {
		//Arrange
		render(<HomePage />);

		//Act
		//User input, ...

		//Expect
		// check if HomePage components renders heading
		expect(screen.getByRole("heading", {
			level: 1
		})
		).toHaveTextContent("Hello World!");

		//screen.debug();
	});
});