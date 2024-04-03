import Html5QrcodePlugin from '../../components/scanner';

const Escanear = (props) => {

    const onNewScanResult = (decodedText, decodedResult) => {

        // handle decoded results here
    };

    return(
        <div className="App">
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




    