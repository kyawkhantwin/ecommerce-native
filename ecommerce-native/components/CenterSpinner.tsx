import { Box, Spinner } from "@gluestack-ui/themed";

const CenterSpinner = () => {
  return (
    <Box justifyContent="center" alignItems="center" display="flex">
      <Spinner />
    </Box>
  );
};

export default CenterSpinner;
