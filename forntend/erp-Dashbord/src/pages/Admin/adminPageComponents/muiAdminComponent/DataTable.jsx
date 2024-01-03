import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function DataTable(
                    {
                      columns,
                      rows,
                      hideFooterPagination=true,
                      hideFooter=true,
                      disableColumnMenu=true,
                      disableColumnSelector=true
                    }) 
                    {
  return (
    <>
      <Box sx={{height: 400, width: '100%' ,}}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
          hideFooterPagination={hideFooterPagination}
          hideFooter={hideFooter}
          disableColumnMenu={disableColumnMenu}
          disableColumnSelector={disableColumnSelector}
        />
      </Box>
    </>
  );
}