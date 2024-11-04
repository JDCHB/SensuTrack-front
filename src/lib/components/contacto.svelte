<div class="container mt-3 mb-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div
                class="contact-section bg-light p-4 rounded"
                style="margin-top: 10%; margin-bottom: 10%;"
            >
                <h2 class="text-center">Formulario de Contacto</h2>
                <form
                    action="https://formsubmit.co/turibq123@gmail.com"
                    method="POST"
                >
                    <div class="form-group">
                        <i class="fa-solid fa-user"></i>
                        <input
                            type="text"
                            class="form-control"
                            required
                            placeholder="Nombre y apellido"
                            name="name"
                        />
                    </div>
                    <div class="form-group">
                        <i class="fa-solid fa-envelope"></i>
                        <input
                            type="email"
                            class="form-control"
                            required
                            placeholder="Correo electrónico"
                            name="email"
                        />
                    </div>
                    <div class="form-group">
                        <i class="fa-solid fa-pen-to-square"></i>
                        <textarea
                            cols="30"
                            class="form-control"
                            rows="10"
                            placeholder="Escribe tu mensaje"
                            name="message"
                        ></textarea>
                    </div>
                    <div class="submit-container text-center">
                        <button
                            type="submit"
                            class="btn btn-primary"
                            data-toggle="modal"
                            data-target="#successModal">Enviar mensaje</button
                        >
                    </div>
                    <input
                        type="hidden"
                        name="_next"
                        value="http://localhost:8000/html/contactox.html"
                    />
                    <input type="hidden" name="_captcha" value="false" />
                    <input type="hidden" name="_formsubmit_id" value="form" />
                    <!-- Agregamos el atributo "value" -->
                </form>
                <!-- Move this line here -->
            </div>
        </div>
    </div>
</div>
