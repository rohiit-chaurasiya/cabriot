// Chakra imports
import { SimpleGrid, Text, useColorModeValue } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import React from "react";
import Information from "views/admin/profile/components/Information";

// Assets
export default function GeneralInformation(props) {
  const { ...rest } = props;
  // Chakra Color Mode
  const textColorPrimary = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "gray.400";
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );
  return (
    <Card mb={{ base: "0px", "2xl": "20px" }} {...rest}>
      <Text
        color={textColorPrimary}
        fontWeight='bold'
        fontSize='2xl'
        mt='10px'
        mb='4px'>
        About the Kitchen A
      </Text>
      <Text color={textColorSecondary} fontSize='md' me='26px' mb='40px'>
      Cabriot Kitchen is on a mission to deliver 100,000 meals by
      March 2025, and we invite you to be a crucial part of this
      impactful journey.
      </Text>
      <SimpleGrid columns='2' gap='20px'>
        <Information
          boxShadow={cardShadow}
          title='Location'
          value='Bengaluru'
        />
        <Information
          boxShadow={cardShadow}
          title='Active Users'
          value='1.2k+'
        />
        <Information
          boxShadow={cardShadow}
          title='Category'
          value='Veg, Non-Veg'
        />
        
      </SimpleGrid>
    </Card>
  );
}
