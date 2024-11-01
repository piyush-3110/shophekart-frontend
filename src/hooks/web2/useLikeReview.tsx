/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosError } from "axios";
import { toast } from "../use-toast";
import { envConfig } from "@/config/envConfig";
import { useMutation } from "@tanstack/react-query";

export default function useLikeReview() {
    const { mutateAsync: likeReview } = useMutation({
        mutationFn: async ({ userId, reviewId, alreadyLiked }: { userId?: string, reviewId?: string, alreadyLiked: boolean }) => {
            const response = await axios.patch(
                `${envConfig.BACKEND_URL}/review/increase-like/${reviewId}`,
                {
                    userId
                },
                {
                    withCredentials: true
                }
            );
            return response
        },

        onSuccess(_, { alreadyLiked }) {
            toast({
                title: alreadyLiked ? "Unliked" : "Liked",
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
                else if (error.response?.status === 401) {
                    toast({
                        title: "Error liking",
                        description: "please login before liking.",
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
