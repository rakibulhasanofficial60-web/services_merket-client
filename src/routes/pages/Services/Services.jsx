import useAllServices from "../../../hooks/useAllServices";

const Services = () => {
    const [services] = useAllServices();

    return (
        <div className="md:flex gap-10 bg-amber-400">
            <div className="w-[60%]">
                    
            </div>

            <div className="w-[25%] bg-red-700">

            </div>
        </div>
    );
};

export default Services;