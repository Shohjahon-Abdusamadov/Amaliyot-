import { useEffect } from "react";

import HeroSection from "../components/HeroSection";
import {
  Table,
  TableBody,
  TableHead,
  TableHeadCell,
  Drawer,
} from "flowbite-react";

export default function Countries() {
  useEffect(() => {
    async function fetchCountries() {}

    fetchCountries();
  }, []);

  return (
    <div>
      <Drawer open={false}>
        <Drawer.Items>Drawer item</Drawer.Items>
      </Drawer>

      <HeroSection />

      <div className='max-w-[1140px] mx-auto mt-4'>
        <Table striped>
          <TableHead>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Population</TableHeadCell>
            <TableHeadCell>Capital</TableHeadCell>
            <TableHeadCell>
              <span className='sr-only'>Edit</span>
            </TableHeadCell>
          </TableHead>
          <TableBody className='divide-y'></TableBody>
        </Table>
      </div>
    </div>
  );
}
