import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import Summery from "../../../components/Summery/Summery";
import { useSummary } from "../../../provider/SummaryProvider";
import NextBtn from "../../../components/NextBtn/NextBtn";
import LocationPicker from "../LocationPicker/LocationPicker";

const Address = () => {
    const { itemSummary, total, vat, serviceCharge, showInput, setShowInput, address, setAddress } = useSummary();

    const handleLocation = (coords) => {
        // console.log("Selected Location:", coords);
        setAddress('ECB Chattar, Dhaka')
    };

    return (
        <div>
            <ServiceDetails title="Address" currentStep={2} />
            <div className="flex gap-8 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4">
                    <LocationPicker onLocationSelect={handleLocation} />
                </div>
                <Summery address={address} itemSummary={itemSummary} total={total} showInput={showInput} setShowInput={setShowInput} vat={vat} serviceCharge={serviceCharge}></Summery>
            </div>

            <div className="hidden md:block">
                <NextBtn />
            </div>
        </div>
    );
};

export default Address;