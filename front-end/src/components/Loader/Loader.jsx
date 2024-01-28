import { RingLoader } from "react-spinners";

const loaderStyles = {
  display: "block",
  margin: "auto",
};

const Loader = ({
  color = "#36d7b7"
}) => {
  return <RingLoader color={color} cssOverride={loaderStyles} />
} 

export default Loader;