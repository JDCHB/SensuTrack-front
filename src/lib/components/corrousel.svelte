    
        <div id="carouselE1" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
                <button type="button" data-bs-target="#carouselE1" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselE1" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselE1" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="/producto1.jpg" class="d-block w-100" alt="">
                    <div class="carousel-caption">
                        <h5 class="text-dark fw-bold">Los mejores collares</h5>
                        <p class="text-dark fw-bold">Los mejores collares con GPS para tu mascota</p>
                        <p><a href="#!" class="btn btn-primary mt-3">Leer más</a></p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/Producto3.jpg" class="d-block w-100" alt="">
                    <div class="carousel-caption">
                        <h5 class="text-warning fw-bold">Los mejores collares</h5>
                        <p class="text-dark fw-bold">Los mejores collares con GPS para tu mascota</p>
                        <p><a href="#!" class="btn btn-primary mt-3">Leer más</a></p>
                    </div>
                </div>
                <div class="carousel-item">
                    <img src="/imagen1c.jpg" class="d-block w-100" alt="">
                    <div class="carousel-caption">
                        <h5 class="text-dark fw-bold">Los mejores collares</h5>
                        <p class="text-dark fw-bold">Los mejores collares con GPS para tu mascota</p>
                        <p><a href="#!" class="btn btn-primary mt-3">Leer más</a></p>
                    </div>
                </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselE1" data-bs-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Anterior</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#carouselE1" data-bs-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="visually-hidden">Siguiente</span>
            </button>
        </div>
        <style>
            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');
        *{
        font-family: "Poppins", sans-serif;
        font-weight: 100;
        font-style: normal;
        }
        .carousel-item{
            min-height: 400px;

        }
        .carousel-caption{
            bottom: 220px;
            z-index: 2;
        }
        .carousel-caption h5{
            font-size: 70px;
            font-weight: 600;
            text-transform: uppercase;
            margin-top: 25px;
        }
        .carousel-caption p{
            width: 60%;
            margin: 10px auto;
            font-size: 18px;
        }
        .carousel-inner::before{
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
        }
        </style>
