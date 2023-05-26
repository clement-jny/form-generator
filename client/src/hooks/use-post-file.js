import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const usePostFile = () => {
	return useMutation({
		mutationKey: ['postFile'],
		mutationFn: async (formData) => {
			try {
				const { data } = await axios.post("http://localhost:3001/upload", formData);
				return data;
			} catch (error) {
				console.error("use-post-file: ", error);
				toast.error("Something went wrong with our server!");
			}
		}
	})
}