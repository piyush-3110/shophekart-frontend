import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
import { envConfig } from "@/config/envConfig";
import { useMutation } from "@tanstack/react-query";

export default function useLikeReview() {
    const { mutateAsync: likeReview } = useMutation({
        mutationFn: async ({ userId, reviewId }: { userId?: string, reviewId?: string }) => {
            const response = await axios.patch(
                `${envConfig.BACKEND_URL}/review/increase-like/${reviewId}`,
                {
                    userId
                }
            );
            return response
        },

        onSuccess() {
            toast({
                title: "Liked!",
            });
        },

        onError(error) {
            if (error instanceof AxiosError) {
                if (error.response?.status === 400) {
                    toast({
                        title: "Error liking",
                        description: error.response.data.message,
                        variant: "destructive"
                    })
                }
                else {
                    toast({
                        title: "Error liking",
                        variant: "destructive"
                    })
                }
            } toast({
                title: 'Error liking',
                description: 'An unexpected error occurred.',
                variant: 'destructive'
            });
        }
    }
    )
    return { likeReview }
}
