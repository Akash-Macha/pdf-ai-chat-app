import { RingLoader } from "react-spinners";

const loaderStyles = {
  display: "block",
  margin: "auto",
};

const loaders =  {
  "RingLoader": RingLoader,
}

const Loader = ({
  type = "RingLoader",
  color = "#36d7b7",
  size = 50,
  cssOverride,
}) => {
  const Loader = loaders[type];
  return <Loader color={color} size={size} cssOverride={{...loaderStyles, ...cssOverride }} />
} 

export default Loader;