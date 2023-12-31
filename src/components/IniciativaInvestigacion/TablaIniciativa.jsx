import * as React from "react";
import { Box, Grid } from "@mui/material";
import { DataGrid, GridToolbar, esES } from "@mui/x-data-grid";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import { GridActionsCellItem } from "@mui/x-data-grid";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Tooltip from "@mui/material/Tooltip";

const TablaIniciativa = ({ pids, onDelete, detallePID }) => {
  const formatDate = (date) => {
    return date ? format(new Date(date), "dd/MM/yyyy") : "";
  };

  const myColumns = [
    { field: "denominacion", headerName: "Denominación", width: 400 },
    {
      field: "universidadNombre",
      headerName: "Universidad",
      width: 150,
      valueGetter: (params) => {
        return params.row.universidad?.nombre || "";
      },
    },
    {
      field: "uctDenominacion",
      headerName: "UCT",
      width: 400,
      valueGetter: (params) => {
        return params.row.uct?.denominacion || "";
      },
    },
    {
      field: "tipoPidCodigo",
      headerName: "Tipo PID",
      width: 100,
      valueGetter: (params) => {
        return params.row.tipoPid?.codigo || "";
      },
    },
    {
      field: "fechaDesde",
      headerName: "Fecha Inicio",
      width: 100,
      valueGetter: (params) => formatDate(params.row.fechaDesde),
    },
    {
      field: "fechaHasta",
      headerName: "Fecha Fin",
      width: 100,
      valueGetter: (params) => formatDate(params.row.fechaHasta),
    },

    {
      field: "actions",
      type: "actions",
      headerName: "Acciones",
      width: 100,
      cellClassName: "actions",
      //aca va id porque es el nombre de la columna de la tabla
      getActions: ({ id }) => {
        return [
          <Tooltip title="Ver detalle">
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="Ver Detalle"
              onClick={() => detallePID(id)} // Llamar a la función pasando el ID
              className="textPrimary"
              color="inherit"
            />
          </Tooltip>,
          <Tooltip title="Eliminar">
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              color="inherit"
              onClick={() => onDelete(id)} // Llamar a la función pasando el ID
            />
          </Tooltip>,
        ];
      },
    },
  ];

  if (pids.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "40vh",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "20px" }}>
          No se ha encontrado ningún PID
        </Typography>
      </Box>
    );
  }
  return (
    <DataGrid
      localeText={esES.components.MuiDataGrid.defaultProps.localeText}

      sx={{
        maxWidth: 1,
        maxHeight: 1,
        marginBottom: 20,
        width: { xs: 0.3, md: 1 },
      }}
      initialState={{
        pagination: { paginationModel: { pageSize: 15 } },
      }}
      pageSizeOptions={[15, 20, 30]}
      rows={pids}
      columns={myColumns}
      getRowId={(row) => row.idIniciativaInvestigacion}
      disableDensitySelector
      disableColumnSelector
      disableColumnFilter
      components={{ Toolbar: GridToolbar }}
      componentsProps={{
        toolbar: {
          showQuickFilter: true,
        },
      }}

    />
  );
};

export default TablaIniciativa;
