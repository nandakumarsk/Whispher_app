import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  const { data: authUser, isLoading } = useQuery({ queryKey: ["authUser"] });
  return { authUser, isLoading };
};

export default useAuthUser;
