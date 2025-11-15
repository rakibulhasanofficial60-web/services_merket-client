import NextBtn from "../../../components/NextBtn/NextBtn";
import ServiceDetails from "../../../components/ServiceDetails/ServiceDetails";
import Summery from "../../../components/Summery/Summery";
import { useSummary } from "../../../provider/SummaryProvider";

const DateTime = () => {
    const { itemSummary, total, vat, serviceCharge, showInput, setShowInput, address } = useSummary();

    return (
        <div>
            <ServiceDetails title="Date & Time" currentStep={3} />
            <div className="flex gap-8 mt-5">
                <div className="md:w-[60%] mb-4 space-y-4">

                    {/* left column  */}
                    sdkfhgkhfdsk

                </div>
                <Summery address={address} itemSummary={itemSummary} total={total} showInput={showInput} setShowInput={setShowInput} vat={vat} serviceCharge={serviceCharge}></Summery>
            </div>

            {/* ---------- Bottom NEXT Button ---------- */}
            <NextBtn path='/confirmation'></NextBtn>
        </div>);
};

export default DateTime;