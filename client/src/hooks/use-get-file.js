import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

export const useGetFile = (fileId) => {
	return useQuery({
		queryKey: ['getFile', fileId],
		queryFn: async () => {
			try {
				const { data } = await axios.get(`http://localhost:3001/upload/${fileId}`);
				return data;
			} catch (error) {
				console.error(error);
				toast.error("Something went wrong with our server!");
			}
		}
	})
}