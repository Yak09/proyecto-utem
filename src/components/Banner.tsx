
export const Banner = () => {
  return (
    <div className="containerBanner" style={{marginTop:20, marginBottom:20}}>

                <div id="carouselExampleIndicators" className="carousel slide">
        <div className="carousel-indicators">
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
            <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
        </div>
        <div className="carousel-inner">
            <div className="carousel-item active">
            <img src="https://noticias.utem.cl/wp-content/uploads/2021/06/portada_appmiutem.jpg" className="d-block w-20" alt="..." style={{maxHeight: '300px', width: 'auto'}}/>
            </div>
            <div className="carousel-item">
            <img src="https://noticias.utem.cl/wp-content/uploads/2021/06/portada_appmiutem.jpg" className="d-block w-20" alt="..." style={{maxHeight: '300px', width: 'auto'}}/>
            </div>
            <div className="carousel-item">
            <img src="https://noticias.utem.cl/wp-content/uploads/2021/06/portada_appmiutem.jpg" className="d-block w-20" alt="..." style={{maxHeight: '300px', width: 'auto'}}/>
            </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Anterior</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Siguiente</span>
        </button>
        </div>

    </div>
  )
}
