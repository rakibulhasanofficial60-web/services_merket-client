import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import Summery from "../../../components/Summery/Summery";
import { useSummary } from "../../../provider/SummaryProvider";
import Selectmap from '../../pages/Address/Map/Selectmap';
import NextBtn from "../../../components/NextBtn/NextBtn";

const Address = () => {
    const { itemSummary, total, vat, serviceCharge, showInput, setShowInput } = useSummary();

    return (
        <div>
            <ServiceDetails title="Address" currentStep={2} />
            <div className="flex gap-8 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4">
                    <Selectmap />
                </div>
                <Summery itemSummary={itemSummary} total={total} showInput={showInput} setShowInput={setShowInput} vat={vat} serviceCharge={serviceCharge}></Summery>
            </div>

            {/* ---------- Bottom NEXT Button ---------- */}
           <NextBtn  path='/date-time'></NextBtn>
        </div>
    );
};

export default Address;