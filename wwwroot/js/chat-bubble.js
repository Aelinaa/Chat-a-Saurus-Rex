class ChatBubble extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    width: 100%; /* Zorgt ervoor dat de chatbubbels de volledige breedte gebruiken */
                }

                .chat-bubble {
                    background: #0078ff;
                    color: white;
                    padding: 10px;
                    border-radius: 15px;
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
                }

                /* ✅ Standaard links uitgelijnd (voor andere gebruikers) */
                .chat-wrapper {
                    display: flex;
                    justify-content: flex-start;
                }

                /* ✅ Zelf verzonden berichten rechts uitlijnen */
                .my-message {
                    background: #34c759;
                }

                .my-message-wrapper {
                    display: flex;
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

        if (isCurrentUser) {
            this.shadowRoot.querySelector(".chat-bubble").classList.add("my-message");
            this.shadowRoot.querySelector(".chat-wrapper").classList.add("my-message-wrapper");
        }
    }
}

customElements.define("chat-bubble", ChatBubble);
