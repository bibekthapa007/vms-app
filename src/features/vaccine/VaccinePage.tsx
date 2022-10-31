import { useEffect } from 'react';
import { Box } from '@chakra-ui/layout';
import { Spinner, Heading } from '@chakra-ui/react';

import DashboardLayout from '../../components/DashboardLayout';
import VaccineList from '../../components/VaccineList';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchVaccines } from './VaccineSlice';

export default function VaccinePage() {
  const dispatch = useAppDispatch();
  const { vaccines, vaccinesLoading, vaccinesError } = useAppSelector(state => state.vaccine);

  useEffect(() => {
    dispatch(fetchVaccines());
  }, [dispatch]);

  const VaccineHandler = () => {
    if (vaccinesLoading)
      return (
        <Heading>
          Loading <Spinner size="md" />
        </Heading>
      );
    if (vaccinesError) return <h1>Error {vaccinesError} </h1>;
    if (vaccines?.length === 0) return <h1>No Vaccine Found.</h1>;
    return <VaccineList />;
  };

  return (
    <DashboardLayout bgColor="white">
      <Box pt={2}>
        <VaccineHandler />
      </Box>
    </DashboardLayout>
  );
}
