import { useQuery } from "@tanstack/react-query";

const useAllServices = () => {
    const { data: services = [], isLoading, error, refetch } = useQuery({
        queryKey: ["all-services"],
        queryFn: async () => {
            const res = await fetch("/service.json");
            const data = await res.json();
            return data;
        },
    });
    
    return [services, isLoading, error, refetch];
};

export default useAllServices;