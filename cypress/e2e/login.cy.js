describe("logging in", () => {

    it("should allow logging in", () => {

        cy.visit("https://localhost:7191/Identity/Account/Login");

        cy.get("input[name='Input.EmailOrUsername']").type("AdminDino");
        cy.get("input[name='Input.Password']").type("uCKPiijTXGw9@8w");
        cy.get("button[type='submit']").click();

        cy.url().should("not.include", "/Login");
        cy.contains("Say hi!").should("be.visible");

    });
});
