import { useQuery } from "@tanstack/react-query";

const useButton = () => {
    const { data: button = [], isLoading, error, refetch } = useQuery({
        queryKey: ["all-button"],
        queryFn: async () => {
            const res = await fetch("https://job-task-nu.vercel.app/api/v1/service-type");
            const data = await res.json();
            console.log(data);
            return data.Data;
        },
    });

    return [button, isLoading, error, refetch];
};

export default useButton;