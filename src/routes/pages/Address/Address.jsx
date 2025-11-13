import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import Summery from "../../../components/Summery/Summery";
import Selectmap from '../../pages/Address/Map/Selectmap';

const Address = () => {
    return (
        <div>
            <ServiceDetails title="Address" currentStep={2} />
            <div className="md:w-[60%] mb-4 space-y-4">
                <Selectmap />
            </div>
            {/* <Summery></Summery> */}
        </div>
    );
};

export default Address;