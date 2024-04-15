import { useContext } from "react";
import DataContext from "../contexts/DevicesDataProvider";

const useDevicesData = () => {
    return useContext(DataContext);
}

export default useDevicesData;