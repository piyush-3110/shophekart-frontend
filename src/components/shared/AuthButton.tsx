// "use client";

// import { useSiweSignIn } from "@/hooks";
// import { toast } from "@/hooks/use-toast";
// import { cn } from "@/lib/utils";
// import { UserService } from "@/services";
// import { useUserStore } from "@/store";
// import { useQuery } from "@tanstack/react-query";
// import React, { useEffect } from "react";

// type TAuthButtonProps = {
//   className?: string;
// } & React.HtmlHTMLAttributes<HTMLButtonElement>;

// const AuthButton: React.FC<TAuthButtonProps> = ({ className, ...props }) => {
//   const { handleSignIn, isPending, isSuccess } = useSiweSignIn();
//   const { setUser } = useUserStore();

//   const { data: user, error } = useQuery({
//     queryKey: ["user"],
//     queryFn: UserService.getProfile,
//     enabled: isSuccess,
//   });

//   useEffect(() => {
//     if (isSuccess && user) setUser(user);

//     if (error) toast({ title: "There was some problem signing in" });
//   }, [error, isSuccess, user, setUser]);

//   return (
//     <button
//       onClick={handleSignIn}
//       {...props}
//       className={cn(
//         "border border-[#022AFF] text-[#022AFF]",
//         "hover:bg-blue-100/50 py-2 px-4 rounded-sm",

//         className
//       )}
//     >
//       {isPending ? "Signing in" : "Sign in"}
//     </button>
//   );
// };

// export default AuthButton;
