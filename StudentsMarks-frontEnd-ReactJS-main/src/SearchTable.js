import React, { useState, useEffect } from "react";
import DataTable from "./examples/Tables/DataTable";
import authorsTableData from "./layouts/tables/data/authorsTableData";
import MDBox from "./components/MDBox";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDTypography from "../src/components/MDTypography";

function SearchTable({ searchQuery }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ columns: [], rows: [] });

  useEffect(() => {
    fetchSearchResults(searchQuery);
  }, [searchQuery]);

  const fetchSearchResults = async (query) => {
    try {
      const { columns, rows } = await authorsTableData(query);
      setData({ columns, rows });
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsLoading(false);
    }
  };

  return (
    <MDBox pt={2} pb={3}>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <MDBox
              mx={2}
              mt={-3}
              py={3}
              px={2}
              variant="gradient"
              bgColor="info"
              borderRadius="lg"
              coloredShadow="info"
            >
              <MDTypography variant="h6" color="white">
                Search Result
              </MDTypography>
            </MDBox>
            <MDBox pt={3}>
              {isLoading ? (
                <div>Loading...</div>
              ) : (
                <DataTable
                  table={{ columns: data.columns, rows: data.rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              )}
            </MDBox>
          </Card>
        </Grid>
      </Grid>
    </MDBox>
  );
}

export default SearchTable;