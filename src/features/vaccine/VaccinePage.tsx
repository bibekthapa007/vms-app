import { Box } from "@chakra-ui/layout";

import DashboardLayout from "../../components/DashboardLayout";
import VaccineList from "../../components/VaccineList";

export default function VaccinePage() {
  return (
    <DashboardLayout bgColor="white">
      <Box pt={2}>
        <VaccineList />
      </Box>
    </DashboardLayout>
  );
}
