import { withApollo } from "../utils/withApollo";

import dynamic from "next/dynamic";
import { Provider } from "react-redux";
import { store } from "../store/store";
import LoadingSpinner from "@/components/LoadingSpinner";

// import MapPage from "../../components/MapPage";

const MapPage = dynamic(() => import("../components/Map/MapPage"), {
  ssr: false,
  loading: () => <LoadingSpinner />,
});

const WithProvider: any = ({}) => {
  return (
    <Provider store={store}>
      <MapPage />
    </Provider>
  );
};

export default withApollo({ ssr: false })(WithProvider);
