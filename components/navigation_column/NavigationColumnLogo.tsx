import React from "react";
import { Heading, Image } from "@chakra-ui/react";

function NavigationColumnLogo() {
  return (
    <>
      <Heading
        mt={30}
        mb={[25, 50, 100]}
        fontSize={["4xl", "4xl", "2xl", "3xl", "4xl"]}
        alignSelf="center"
        letterSpacing="tight"
      >
        M.
      </Heading>
    </>
  );
}

export default NavigationColumnLogo;
