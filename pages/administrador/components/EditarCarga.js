import React, { useEffect, useState } from "react";
import { Autocomplete } from "@mui/material";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import PopupConfirmacion from "../../components/PopupConfirmacion";
import { getCookie } from "cookies-next";
import axios from "axios";
import PopupError from "@/pages/components/PopupError";

function EditarCarga({ datos, setDatos, fetchData }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [selectedOrigen, setSelectedOrigen] = useState([]);
  const [selectedFlota, setSelectedFlota] = useState([]);
  const [valueFechaInicio, setValueFechaInicio] = React.useState(null);
  const [valueFechaFin, setValueFechaFin] = React.useState(null);
  const [factorDeCarga, setFactorDeCarga] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [showError, setShowError] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionsOrigen, setOptionsOrigen] = useState([]);
  const handleDialogOpen = () => {
    setDialogOpen(true);
    setOverlayOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setOverlayOpen(false);
    setSelectedOrigen([]);
    setSelectedFlota([]);
    setValueFechaInicio(null);
    setValueFechaFin(null);
    setFactorDeCarga("");
    fetchData();

  };
  const changeFlota = async (origen) => {
    console.log(origen);
    setSelectedOrigen(origen);
    try {
      const url = `${process.env.NEXT_PUBLIC_API_URL}admin/getFlotas`;
      const response = await axios.post(
        url,
        {
          origen: origen,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
            Authorization: `${getCookie("token")}`,
          },
        }
      );
      setOptions(response.data.flotas);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditarCarga = async () => {
    try {
      console.log(selectedFlota);
      const url = `${process.env.NEXT_PUBLIC_API_URL}admin/insertFactor`;
      const response = await axios.post(
        url,
        {
          flota: selectedFlota,
          origen: selectedOrigen,
          factor: factorDeCarga,
          fecha_inicio: `${valueFechaInicio.$y}-${valueFechaInicio.$M}-${valueFechaInicio.$D}`,
          fecha_fin: `${valueFechaFin.$y}-${valueFechaFin.$M}-${valueFechaFin.$D}`,
        },
        {
          headers: {
            "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
            "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
            Authorization: `${getCookie("token")}`,
          },
        }
      );
      setDialogOpen(false);
      setOverlayOpen(false);
      setShowPopup(true);
      setSelectedOrigen([]);
      setSelectedFlota([]);
      setValueFechaInicio(null);
      setValueFechaFin(null);
      setFactorDeCarga("");
      fetchData();
      console.log(response.data);
    } catch (error) {
      console.log(error);
      setDialogOpen(false);
      setOverlayOpen(false);
      setShowError(true);
    }
  };

  useEffect(() => {
    const fetchOptionsFlotas = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}admin/getFlotas`;
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
              Authorization: `${getCookie("token")}`,
            },
          }
        );
        setOptions(response.data.flotas);
      } catch (error) {
        console.log(error);
      }
    };
    const fetchOptionsOrigen = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_API_URL}admin/getOrigenes`;
        const response = await axios.post(
          url,
          {},
          {
            headers: {
              "Access-Control-Allow-Origin": "*", // Permitir cualquier origen
              "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE", // Métodos HTTP permitidos
              "Access-Control-Allow-Headers": "Content-Type, Authorization", // Encabezados permitidos
              Authorization: `${getCookie("token")}`,
            },
          }
        );
        setOptionsOrigen(response.data.nombres);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOptionsOrigen();
    //fetchOptionsFlotas(); // Llama a la función para obtener las opciones cuando el componente se monte
  }, []);

  return (
    <div>
      <button onClick={handleDialogOpen}>Editar Carga</button>

      {overlayOpen && (
        <div className="overlay">
          <div className="popup">
            <div className="bg-MainLight dark:bg-MainDark rounded-lg p-8 max-w-lg">
              <h2 className="text-2xl font-bold mb-1 text-TextHover">
                Nuevo Facto de Carga
              </h2>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark">
                  Origen
                </label>
                <Autocomplete
                  className="bg-white"
                  options={optionsOrigen}
                  value={selectedOrigen}
                  onChange={(event, value) => changeFlota(value)} //(event, value) => setSelectedOrigen(value)
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Seleccione el origen"
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-input": {
                          padding: "12px 16px",
                          fontSize: "1rem",
                        },
                      }}
                    />
                  )}
                  sx={{
                    width: "100%",
                    minWidth: "300px",
                    minHeight: "48px",
                  }}
                />
              </div>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark">
                  Flota
                </label>
                <Autocomplete
                  className="bg-white"
                  options={options}
                  value={selectedFlota}
                  onChange={(event, value) => setSelectedFlota(value)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      placeholder="Seleccione la flota"
                      sx={{
                        width: "100%",
                        "& .MuiOutlinedInput-input": {
                          padding: "12px 16px",
                          fontSize: "1rem",
                        },
                      }}
                    />
                  )}
                  sx={{
                    width: "100%",
                    minWidth: "300px",
                    minHeight: "48px",
                  }}
                />
              </div>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark">
                  Fecha Inicio
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="bg-white"
                    value={valueFechaInicio}
                    onChange={(newValue) => setValueFechaInicio(newValue)}
                    sx={{
                      width: "100%",
                      minWidth: "300px",
                      minHeight: "48px",
                    }}
                  />
                </LocalizationProvider>
              </div>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark">
                  Fecha Fin
                </label>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    className="bg-white"
                    value={valueFechaFin}
                    onChange={(newValue) => setValueFechaFin(newValue)}
                    sx={{
                      width: "100%",
                      minWidth: "300px",
                      minHeight: "48px",
                      borderColor: "blue",
                    }}
                  />
                </LocalizationProvider>
              </div>

              <div className="mb-0">
                <label className="block font-bold mb-1 text-TextLight dark:text-TextDark ">
                  Factor de Carga
                </label>
                <TextField
                  className="bg-white"
                  placeholder="Ingrese un Numero"
                  variant="outlined"
                  value={factorDeCarga}
                  onInput={(e) => {
                    const value = e.target.value.trim();
                    if (/^[0-9]*$/.test(value)) {
                      setFactorDeCarga(value);
                    }
                  }}
                  sx={{
                    width: "100%",
                    minWidth: "300px",
                    minHeight: "48px",
                  }}
                />
              </div>
              <div>
                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-2"
                  onClick={handleEditarCarga}
                >
                  Ingresar
                </button>
              </div>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-2"
                onClick={handleDialogClose}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .overlay {
          position: fixed;
          inset: 0;
          z-index: 10;
          background-color: rgba(0, 0, 0, 0.5);
        }

        .popup {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }
      `}</style>

      {showPopup && (
        <PopupConfirmacion
          message="¡Factor de carga cambiado correctamente!"
          onClose={() => setShowPopup(false)}
        />
      )}
      {showError && (
        <PopupError
          message="¡No se ha podido editor el factor de carga!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}

export default EditarCarga;
