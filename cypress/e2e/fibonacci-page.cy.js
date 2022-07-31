import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT_COLOR } from "../../src/constants/colors";

const visualizationStepsValues = [
  1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584,
  4181, 6765,
];

describe("Fibonacci page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/fibonacci");
    cy.get("input").as("numberInput");
    cy.get("p").contains("Рассчитать").parent().as("calculateButton");
    cy.get("ul").as("fibonacciNumbersArray");
  });

  it("has empty input and disabled button by default", () => {
    cy.get("@numberInput").should("have.value", "");
    cy.get("@calculateButton").should("be.disabled");
  });

  it("on button click generate fibonacci sequence", () => {
    cy.get("@numberInput").type(19);
    cy.get("@calculateButton").should("not.be.disabled");
    cy.get("@fibonacciNumbersArray").children().should("have.length", 0);

    cy.get("@calculateButton").click();

    visualizationStepsValues.forEach((_, step) => {
      cy.get("div[class^='circle_circle']")
        .should("have.length", step + 1)
        .each(($el, idx) => {
          const value = visualizationStepsValues[idx];
          expect($el).to.have.text(value);
          expect($el).to.have.css("border-color", DEFAULT_COLOR);
          cy.wrap($el).next().should("have.text", idx);
        });

      cy.wait(SHORT_DELAY_IN_MS);
    });
  });
});
