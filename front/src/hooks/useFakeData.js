import { useMemo, useState } from "react";
import { getFakeData } from "../poductions/services/productionsApiService";
// import { getFakeData } from "../../poductions/services/productionsApiService";

export default function useFakeData() {
  const [fakeUsers, setFakeUsers] = useState([]);
  const [fakeProdType, setFakeProdType] = useState([]);
  const [fakeLocations, setFakeLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const callFakeData = async () => {
    console.log(" calling fake data for development purposes");
    setIsLoading(true);
    try {
      const data = await getFakeData();
      const { users, prodType, location } = data;
      setFakeUsers(users);
      setFakeProdType(prodType);
      setFakeLocations(location);
      setIsLoading(false);

      console.log("data uploaded succsesfuly ");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fakeValue = useMemo(() => {
    return { isLoading, fakeUsers, fakeProdType, fakeLocations };
  }, [isLoading, fakeUsers, fakeProdType, fakeLocations]);

  return { fakeValue, callFakeData };
}
