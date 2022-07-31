describe("Routing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });

  it("should open menu page by default", () => {
    cy.contains("МБОУ АЛГОСОШ");
  });

  it("should open string page", () => {
    cy.get("a[href*='recursion']").click();
    cy.contains("Строка");
  });

  it("should open fibonacci page", () => {
    cy.get("a[href*='fibonacci']").click();
    cy.contains("Последовательность Фибоначчи");
  });

  it("should open sorting page", () => {
    cy.get("a[href*='sorting']").click();
    cy.contains("Сортировка массива");
  });

  it("should open stack page", () => {
    cy.get("a[href*='stack']").click();
    cy.contains("Стек");
  });

  it("should open queue page", () => {
    cy.get("a[href*='queue']").click();
    cy.contains("Очередь");
  });

  it("should open linked list page", () => {
    cy.get("a[href*='list']").click();
    cy.contains("Связный список");
  });
});
