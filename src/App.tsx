

import "./index.css"
import { BarraNavegacion } from './hooks/BarraNavegacion';
import { Inicio } from './hooks/Inicio';
import { Servicios } from './hooks/Servicios';
import { Contactanos } from './hooks/Contactanos';
import { Trabajos } from './hooks/Trabajos';
import Chatbot from "./hooks/Chatbot";
import { Footer } from "./hooks/Footer";

export const App = () => {
  return (
    <div className="App">
      <BarraNavegacion />
      <main>
        <Inicio />
        <Servicios />
        <Trabajos />
        <Contactanos />
      </main>
       <Chatbot /> 
      
    <Footer></Footer>
    </div>
  );
};

