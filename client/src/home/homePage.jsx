import { Button } from "./components/button";

export const HomePage = () => {
	return (
		<>
			<h1>Hello World!</h1>

			<Button link="/create" text={"Get Started"} />
			<Button link="/history" text={"History"} />
			<Button link="/create" text={"About"} />
		</>
	)
};