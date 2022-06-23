import React, { useState, Fragment } from 'react';
import {
  ChakraProvider,
  Box,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  theme,
  Flex,
  Text,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import './App.css';

const App = () => {
  const [p, setP] = useState(450000);
  const [r, setR] = useState(3);
  const [n, setN] = useState(25);
  const [d, setD] = useState(135000);

  const slider = (min, max, def, updateFunc, value, title, label, order) => {
    return (
      <Fragment>
        <Flex direction="column" w="100%" align="left">
          <Box p="5">
            <Text fontSize="md">
              {order === 1
                ? title + ' ' + label + ' ' + value.toLocaleString('fr')
                : title + ' ' + value.toLocaleString('fr') + ' ' + label}
            </Text>
            <Slider
              aria-label="slider-ex-6"
              onChange={val => updateFunc(val)}
              min={min}
              max={max}
              defaultValue={def}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
          </Box>
        </Flex>
      </Fragment>
    );
  };
  return (
    <ChakraProvider theme={theme}>
      <Box
        w="100vw"
        h="100vh"
        justify="center"
        style={{ background: '#EDEEF6', display: 'flex' }}
      >
        <Box
          fontSize="xl"
          style={{
            background: '#EDEEF6',
            border: '5px solid white',
            borderRadius: '5px',
            display: 'flex',
            flexDirection: 'column',
          }}
          m="auto"
          padding="30px"
          w={1200}
          h={400}
          justify="center"
        >
          <Text fontSize="3xl" mb="10px">
            Mortgage calculator
          </Text>
          <Flex>
            {slider(0, 1000000, p, setP, p, 'Purchase price: ', 'CHF', 1)}
            {slider(0, 1000000, d, setD, d, 'Down payment: ', 'CHF', 1)}
            {slider(0, 30, n, setN, n, 'Repayment time: ', 'years')}
          </Flex>
          <Flex>
            <Box width="100%">
              {slider(0, 100, r, setR, r, 'Interest rate: ', '%')}
            </Box>
            <Box w="100%" p="5" align="right">
              <Text fontSize="sm">Loan amount</Text>
              <Text fontSize="xl">CHF {(p - d).toLocaleString('fr')}</Text>
            </Box>
            <Box w="100%" p="5" align="right">
              <Text fontSize="sm">Estimated pr. month</Text>
              <Text fontSize="xl">
                CHF{' '}
                {Math.round(
                  (p - d) *
                    (((r / 1200) * Math.pow(1 + r / 1200, n * 12)) /
                      (Math.pow(1 + r / 1200, n * 12) - 1))
                ).toLocaleString('fr')}
              </Text>
            </Box>
          </Flex>
        </Box>
      </Box>
    </ChakraProvider>
  );
};

export default App;
