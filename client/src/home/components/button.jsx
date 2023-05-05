import { Link } from "react-router-dom"

export const Button = ({ link, text}) => {
	return (<Link to={link}>{text}</Link>);
}