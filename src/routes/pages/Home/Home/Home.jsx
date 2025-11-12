import AddressSelection from "../../Map/Map";
// import MapComponent from "../../Map/SelectMap";
import Services from "../../Services/Services";

const Home = () => {
    return (
        <div className="">
            <Services />
            {/* <MapComponent></MapComponent> */}
            <AddressSelection />
        </div>
    );
};

export default Home;