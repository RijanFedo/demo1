import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import clsx from "clsx";
import { Box } from "@mui/material";

function App() {
  const plotsArr = ["D1", "D2", "D3", "D4", "D5"];
  const motorsArr = ["M1", "M2"];
  let startTime = "060000";
  let endTime = "070000";
  const [load, setLoad] = useState(true);
  const [data, setData] = useState([]);
  // const startTime =
  const date = new Date();
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "plot", headerName: "Plot", width: 130 },
    { field: "motor", headerName: "Motor", width: 130 },
    { field: "startTime", headerName: "Start Time", width: 130 },
    {
      field: "endTime",
      headerName: "End Time",
      width: 130,
    },
    {
      field: "status",
      headerName: "Status",
      width: 130,
      cellClassName: (params) => {
        if (params.value == null) {
          return "";
        }

        return clsx("super-app", {
          completed: params.value == "Completed",
          progress: params.value == "Progress",
          notStarted: params.value == "Not Started",
        });
      },
    },
  ];

  useEffect(() => {
    let i = 1;
    let emptyArr = [];
    let updatedTime = startTime;
    let a = startTime.split("");
    let a1 = a.slice(0, 2).join("");
    let a2 = a.slice(2, 4).join("");
    let a3 = a.slice(4, 6).join("");
    let startConvoTime = [a1, a2, a3].join(":");
    let b = endTime.split("");
    let b1 = a.slice(0, 2).join("");
    let b2 = a.slice(2, 4).join("");
    let b3 = a.slice(4, 6).join("");
    let endConvoTime = [b1, b2, b3].join(":");
    motorsArr.map((m) => {
      updatedTime = Number(updatedTime) + 500;
      plotsArr.map((p) => {
        emptyArr.push({
          id: i,
          motor: m,
          plot: p,
          startTime: updatedTime,
          endTime: Number(updatedTime) + 500,
          status:
            i % 3 == 1 ? "Progress" : i % 3 == 2 ? "Completed" : "Not Started",
        });
        i += 1;
      });
    });
    console.log(date.setMinutes(date.getMinutes() + 30));
    setData(emptyArr);
    setLoad(false);
  }, []);
  return (
    <div className="App" style={{ height: "100vh", width: "100%" }}>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          "& .super-app.completed": {
            color: "green",
            fontWeight: "600",
          },
          "& .super-app.progress": {
            color: "yellow",
            fontWeight: "600",
          },
          "& .super-app.notStarted": {
            color: "red",
            fontWeight: "600",
          },
        }}
      >
        {!load && (
          <DataGrid columns={columns} rows={data} checkboxSelection sx />
        )}
      </Box>
    </div>
  );
}

export default App;
