describe("Service", () => {
  it("is available on localhost:3000", () => {
    cy.viewport(1280, 800);
    cy.visit("http://localhost:3000");
  });
});
