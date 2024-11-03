import { toast } from "@/hooks/use-toast";

const customToast = {
	error(title: string, description?: string) {
		toast({
			title,
			description,
			variant: "destructive",
		});
	},
	success(title: string, description?: string) {
		toast({ title, description });
	},
};

export default customToast;
