import React from "react";
import { useHistory } from "react-router-dom";

// Chakra imports
import {
  Box,
  Button,
  Flex,
  Grid,
  Link,
  Text,
  useColorModeValue,
  SimpleGrid,
} from "@chakra-ui/react";

// Custom components
import NFT from "components/card/NFT";
import { MdOutlinePlaylistAdd } from "react-icons/md";

// Assets
import k1image from "assets/img/kitchens/k1.jpg"
import k2image from "assets/img/kitchens/k2.jpg"
import k3image from "assets/img/kitchens/k3.jpg"
import k4image from "assets/img/kitchens/k4.jpg"


export default function Marketplace() {
  const history = useHistory();
  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.500", "white");
  const handleAddKitchen = () => {
    // Navigate to the "Add Kitchen" route
    history.push("/admin/kitchen/add-kitchen");
  };
  return (
    <Box pt={{ base: "80px", md: "80px", xl: "80px" }}>
      {/* Main Fields */}
      <Grid
        mb='20px'
        gridTemplateColumns={{ xl: "repeat(3, 1fr)", "2xl": "1fr 0.46fr" }}
        gap={{ base: "20px", xl: "20px" }}
        display={{ base: "block", xl: "grid" }}>
        <Flex
          flexDirection='column'
          gridArea={{ xl: "1 / 1 / 2 / 4" }}>
          {/* <Banner /> */}
          <Flex direction='column'>
            <Flex
              mt='45px'
              mb='20px'
              justifyContent='space-between'
              direction={{ base: "column", md: "row" }}
              align={{ base: "start", md: "center" }}>
              <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                All Kitchens
              </Text>
              <Flex
                align='center'
                me='20px'
                ms={{ base: "24px", md: "0px" }}
                mt={{ base: "20px", md: "0px" }}>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#art'>
                  Bengaluru
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#music'>
                  Delhi
                </Link>
                <Link
                  color={textColorBrand}
                  fontWeight='500'
                  me={{ base: "34px", md: "44px" }}
                  to='#collectibles'>
                  Pune
                </Link>
                <Link color={textColorBrand} fontWeight="500">
                  <Button
                    leftIcon={<MdOutlinePlaylistAdd />}
                    colorScheme="messenger"
                    onClick={handleAddKitchen}
                  >
                    Add Kitchen
                  </Button>
                </Link>
              </Flex>
            </Flex>
            <SimpleGrid columns={{ base: 1, md: 3 }} gap='20px'>
              <NFT
                name='Kitchen A'
                author='By CabriotEat'
                image={k1image}
              />
              <NFT
                name='Kitchen B'
                author='By CabriotEat'
                image={k2image}
              />
              <NFT
                name='Kitchen C'
                author='By CabriotEat'
                image={k3image}
              />
              <NFT
                name='Kitchen D'
                author='By CabriotEat'
                image={k4image}
              />
            </SimpleGrid>
            
          </Flex>
        </Flex>
        {/* <Flex
          flexDirection='column'
          gridArea={{ xl: "2 / 1 / 2 / 4" }}
          style={{ marginTop: '20px' }}>
          <Card px='0px' mb='20px'>
            <TableTopCreators
              tableData={tableDataTopCreators}
              columnsData={tableColumnsTopCreators}
            />
          </Card>
        </Flex> */}
      </Grid>
      {/* Delete Product */}
    </Box>
  );
}
