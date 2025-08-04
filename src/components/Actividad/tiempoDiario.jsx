import { useState, useEffect } from "react";
import "../../App.css";

const TiempoDiario = () => {
  const [tiempoDiario, setTiempoDiario] = useState(0);

  useEffect(() => {
    const hoy = new Date();
    const fechaHoy = hoy.toLocaleDateString('en-CA'); 
    console.log("Hoy (fechaHoy):", fechaHoy);

    fetch(`https://movetrack.develotion.com/registros.php?idUsuario=${localStorage.getItem("userid")}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "apikey": localStorage.getItem("apiKey"),
        "iduser": localStorage.getItem("userid"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.codigo === 200) {
          console.log("Registros obtenidos:", data.registros);

          const totalHoy = data.registros.reduce((sum, registro) => {
            const fechaRegistro = registro.fecha.split('T')[0];
            console.log(`Registro fecha: ${fechaRegistro} | Comparando con fechaHoy: ${fechaHoy}`);

            if (fechaRegistro === fechaHoy) {
              const tiempoParseado = parseInt(registro.tiempo);
              console.log("Sumando tiempo:", tiempoParseado);
              return sum + (isNaN(tiempoParseado) ? 0 : tiempoParseado);
            }
            return sum;
          }, 0);

          setTiempoDiario(totalHoy);
          console.log("Tiempo total hoy:", totalHoy);
        } else {
          console.error("Respuesta con código distinto a 200:", data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener registros:", error);
      });
  }, []);

  return (
    <div className="container">
      <h2>Tiempo Registrado Hoy</h2>
      <p>{tiempoDiario} minutos</p>
    </div>
  );
}

export default TiempoDiario;