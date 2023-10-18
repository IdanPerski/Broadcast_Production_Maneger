import { useMemo, useState } from "react";
import { getFakeData } from "../../poductions/services/productionsApiService";

export default function useFakeUsers() {
  const [fakeUsers, setFakeUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const callFakeUser = async () => {
    console.log(" calling fake data for development purposes");
    setIsLoading(true);
    try {
      const data = await getFakeData();
      setFakeUsers(data);
      setIsLoading(false);
      console.log("data uploaded succsesfuly");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const fakeValue = useMemo(() => {
    return { isLoading, fakeUsers };
  }, [isLoading, fakeUsers]);

  return { fakeValue, callFakeUser };
}
