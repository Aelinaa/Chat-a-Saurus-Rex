class ChatBubble extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%;
                }

                .chat-wrapper {
                    display: flex;
                    justify-content: flex-start;
                    margin-bottom: 8px;
                }

                .chat-bubble {
                    background: #FFC0CB;
                    color: white;
                    padding: 10px;
                    border-radius: 10px;
                    max-width: 60%;
                    min-width: 25%;
                    word-wrap: break-word;
                    display: inline-block;
                    margin-bottom: 8px;
                    position: relative;
                }

                .chat-name {
                    font-size: 14px;
                    font-weight: bold;
                    display: block;
                    margin-bottom: 5px;
                    position: absolute;
                    top: -10px;
                    left: 10%; 
                    transform: translateX(-50%);
                    background: #FFC0CB;
                    padding: 5px 10px;
                    border-radius: 15px; 
                    font-size: 12px;
                    color: white;
                }

                .my-message {
                    background: #D3D3D3; 
                }

                .my-message-wrapper {
                    display: flex;
                    justify-content: flex-end;
                }

                .chat-wrapper.left {
                    justify-content: flex-start;
                }

                .chat-wrapper.right {
                    justify-content: flex-end;
                }
            </style>

            <div class="chat-wrapper">
                <div class="chat-bubble">
                    <span class="chat-name"></span>
                    <p class="message-text"></p>
                </div>
            </div>
        `;
    }

    connectedCallback() {
        const user = this.getAttribute("user");
        const message = this.getAttribute("message");
        const isCurrentUser = this.getAttribute("currentUser") === "true";

        this.shadowRoot.querySelector(".chat-name").textContent = user;
        this.shadowRoot.querySelector(".message-text").textContent = message;

        const chatWrapper = this.shadowRoot.querySelector(".chat-wrapper");
        const chatBubble = this.shadowRoot.querySelector(".chat-bubble");
        const chatName = this.shadowRoot.querySelector(".chat-name");

        if (isCurrentUser) {
            // Voeg de juiste stijl toe voor eigen producten
            chatBubble.classList.add("my-message");
            chatWrapper.classList.add("right");
            chatName.style.background = "#D3D3D3";
        } else {
            chatWrapper.classList.add("left");
        }
    }
}

customElements.define("chat-bubble", ChatBubble);
