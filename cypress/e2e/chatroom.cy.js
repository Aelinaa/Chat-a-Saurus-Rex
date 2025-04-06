describe("chatroom", () => {
    beforeEach(() => {
        cy.visit("https://localhost:7191/Identity/Account/Login");

        cy.get("input[name='Input.EmailOrUsername']").type("AdminDino");
        cy.get("input[name='Input.Password']").type("uCKPiijTXGw9@8w");
        cy.get("button[type='submit']").click();

        cy.url().should("not.include", "/Login");
        cy.contains("Say hi!").should("be.visible");
     });

    it("should allow receiving and sending messages", () => {

        cy.get("#messageInput").type("Cypress is testing!");

        cy.contains("button", "Send").click();

        cy.get("#messagesList")
            .find("chat-bubble")
            .shadow()
            .should("contain.text", "Cypress is testing!");

    
    });
});
