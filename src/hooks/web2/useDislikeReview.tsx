import { envConfig } from "@/config/envConfig";
import { useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";

export default function useDislikeReview() {
    const { mutateAsync: dislikeReview } = useMutation({
        mutationFn: async ({ userId, reviewId , alreadyDisliked}: { userId?: string, reviewId?: string, alreadyDisliked:boolean }) => {
            const response = await axios.patch(
                `${envConfig.BACKEND_URL}/review/increase-dislike/${reviewId}`,
                {
                    userId
                },
                { withCredentials: true }
            );
            return response
        },

        onSuccess(_, {alreadyDisliked}) {
            toast({
                title: alreadyDisliked ? "Undisliked!" : "Disliked!",
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
                else if (error.response?.status === 401) {
                    toast({
                        title: "Please login before disliking.",
                        description: "Please login before disliking.",
                        variant: "destructive"
                    })
                }
                else {
                    toast({
                        title: "Error disliking",
                        variant: "destructive"
                    })
                }
                return
            }
            toast({
                title: 'Error disliking',
                description: 'An unexpected error occurred.',
                variant: 'destructive'
            });
        }
    }
    )

    return { dislikeReview }
}
