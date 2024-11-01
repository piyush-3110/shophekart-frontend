import { envConfig } from "@/config/envConfig";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";

export default function useDislikeReview() {
    const { mutateAsync: dislikeReview } = useMutation({
        mutationFn: async ({ userId, reviewId }: { userId?: string, reviewId?: string }) => {
            const response = await axios.patch(
                `${envConfig.BACKEND_URL}/review/increase-dislike/${reviewId}`,
                {
                    userId
                }
            );
            return response
        },

        onSuccess() {
            toast({
                title: "Disliked!",
            });
        },

        onError(error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast({
                        title: "Error disliking",
                        description: error.response.data.message,
                        variant: "destructive"
                    })
                }
                else {
                    toast({
                        title: "Error disliking",
                        variant: "destructive"
                    })
                }
            } toast({
                title: 'Error disliking',
                description: 'An unexpected error occurred.',
                variant: 'destructive'
            });
        }
    }
    )

    return { dislikeReview }
}
