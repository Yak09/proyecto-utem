import Html5QrcodePlugin from '../../components/scanner';

import MiniDrawer from '../../components/drawer.tsx'

const Escanear = (props) => {

    const onNewScanResult = (decodedText, decodedResult) => {

        // handle decoded results here
    };

    return(
        <div className="App" >
            <MiniDrawer />
            <Html5QrcodePlugin
                fps={10}
                qrbox={250}
                disableFlip={false}
                qrCodeSuccessCallback={onNewScanResult}
            />
        </div>
    )
    
    }
    
    export default Escanear




    