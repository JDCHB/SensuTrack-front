<script>
    let v_sender = "";
    let v_message = "";
    let error = "";
    let showChat = false;
    let mensajes = [];
    let isTyping = false;

    function mostrarChat() {
        showChat = !showChat;
    }

    async function ChatBot() {
        if (v_message.trim() === "") return;

        // Esto muestra el mensaje en el chat
        mensajes = [...mensajes, { text: v_message, from: "user" }];

        // Mostrar indicador de que el bot está escribiendo
        isTyping = true;
        try {
            const response = await fetch(
                "http://localhost:5005/webhooks/rest/webhook",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sender: v_sender,
                        message: v_message,
                    }),
                },
            );

            if (response.ok) {
                const data = await response.json();
                console.log(data[0].text); // Aquí ya está definida la variable 'data'
                isTyping = false;

                console.log("ChatBot: " + data[0].text);

                if (data.length > 0 && data[0].text) {
                    console.log("ChatBot: " + data[0].text);
                    mensajes = [
                        ...mensajes,
                        { text: data[0].text, from: "bot" },
                    ];
                }
            } else {
                isTyping = false;
                console.log("Error");
            }
        } catch (e) {
            isTyping = false;
            error = e.message;
            console.log("Error en la solicitud: " + error);
            Swal.fire({
                title: "Error",
                text: "Lo sentimos, ahora mismo no está activa la función de ChatBot (Solo está de manera Local)",
                icon: "error",
                customClass: {
                    title: "custom-title", // Aplica la clase al título
                },
                background: "white", // Establece el fondo a blanco
                willOpen: () => {
                    document.querySelector(".swal2-title").style.color =
                        "black"; // Cambia el color del título a negro
                },
            });
        }

        // Limpiar el mensaje después de enviarlo
        v_message = "";
    }
</script>

<button
    class="chat-button"
    on:click={mostrarChat}
    aria-label="Abrir Chatbot"
    on:keydown={(e) =>
        e.key === "Enter" || e.key === " " ? toggleChat() : null}
>
    💬
</button>

<div
    class={showChat ? "chat-window" : "chat-window hidden"}
    aria-hidden={!showChat}
>
    <div class="chat-header">
        <span>Chatbot</span>
        <button
            class="close-button"
            on:click={mostrarChat}
            aria-label="Cerrar Chatbot">❌</button
        >
    </div>

    <div class="chat-body">
        {#each mensajes as mensaje}
            <div
                class="chat-message"
                style="text-align: {mensaje.from === 'user'
                    ? 'right'
                    : 'left'};"
            >
                <span
                    class="message-bubble"
                    style="background: {mensaje.from === 'user'
                        ? '#007bff'
                        : '#e0e0e0'}; color: {mensaje.from === 'user'
                        ? 'white'
                        : 'black'};"
                >
                    {mensaje.text}
                </span>
            </div>
        {/each}

        {#if isTyping}
            <div class="chat-message" style="text-align: left;">
                <span class="typing-indicator">
                    <span class="dot"></span>
                    <span class="dot"></span>
                    <span class="dot"></span>
                </span>
            </div>
        {/if}
    </div>

    <div class="chat-footer">
        <input
            bind:value={v_message}
            type="text"
            placeholder="Escribe tu mensaje..."
            on:keydown={(e) => (e.key === "Enter" ? ChatBot() : null)}
        />
        <button on:click={ChatBot}>Enviar</button>
    </div>
</div>

<style>
    /* ESTILOS DEL TYPING */
    .typing-indicator {
        display: inline-flex;
        padding: 10px 15px;
        background: #e0e0e0;
        border-radius: 20px;
        align-items: center;
    }

    .dot {
        width: 8px;
        height: 8px;
        background-color: #666;
        border-radius: 50%;
        margin: 0 3px;
        animation: typing-animation 1.5s infinite ease-in-out;
    }

    .dot:nth-child(1) {
        animation-delay: 0s;
    }

    .dot:nth-child(2) {
        animation-delay: 0.3s;
    }

    .dot:nth-child(3) {
        animation-delay: 0.6s;
    }

    @keyframes typing-animation {
        0% {
            transform: translateY(0);
            opacity: 0.5;
        }
        50% {
            transform: translateY(-5px);
            opacity: 1;
        }
        100% {
            transform: translateY(0);
            opacity: 0.5;
        }
    }

    /* HASTA AQUI */
    .chat-button {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #007bff;
        color: white;
        width: 60px;
        height: 60px;
        border: none;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        cursor: pointer;
        font-size: 24px;
        z-index: 1000;
        outline: none;
        transition: background-color 0.3s;
    }

    .chat-button:hover {
        background-color: #0056b3;
    }

    .chat-window {
        position: fixed;
        bottom: 100px;
        right: 20px;
        width: 300px;
        height: 400px;
        background: #ffffff;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        border-radius: 12px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        z-index: 999;
        transition: opacity 0.3s ease-in-out;
        transform: translateY(20px);
        animation: slide-up 0.5s forwards;
    }

    @keyframes slide-up {
        from {
            transform: translateY(20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .hidden {
        display: none;
    }

    .chat-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background: #007bff;
        color: white;
        padding: 10px;
        font-size: 16px;
        font-weight: bold;
        border-radius: 12px 12px 0 0;
    }

    .close-button {
        background: none;
        border: none;
        color: white;
        font-size: 20px;
        cursor: pointer;
    }

    .chat-body {
        flex: 1;
        padding: 10px;
        overflow-y: auto;
    }

    .chat-message {
        margin-bottom: 10px;
    }

    .message-bubble {
        display: inline-block;
        padding: 8px 15px;
        border-radius: 20px;
        max-width: 80%;
        word-wrap: break-word;
        line-height: 1.4;
        box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    .chat-footer {
        display: flex;
        padding: 10px;
        background: #f1f1f1;
        align-items: center;
    }

    .chat-footer input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 20px;
        margin-right: 10px;
    }

    .chat-footer button {
        padding: 8px 15px;
        background: #007bff;
        color: white;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        font-size: 14px;
    }

    .chat-footer button:hover {
        background: #0056b3;
    }
</style>
