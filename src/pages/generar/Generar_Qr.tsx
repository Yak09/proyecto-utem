import { useState } from 'react';
import QRCode from 'qrcode.react';


import MiniDrawer from '../../components/drawer.tsx'

const Generar_Qr = () => {
    const [text, setText] = useState('');

    const handleInputChange = (event) => {
      setText(event.target.value);
    };
  
    return (
      <div>
        <MiniDrawer />
        <h2>Generador de Código QR</h2>
        <input
          type="text"
          placeholder="Introduce el texto para generar el código QR"
          value={text}
          onChange={handleInputChange}
        />
        {text && (
          <div style={{ marginTop: '20px' }}>
            <QRCode value={text} />
          </div>
        )}
      </div>
    );
  
}

export default Generar_Qr