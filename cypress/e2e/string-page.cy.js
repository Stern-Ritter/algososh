import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  DEFAULT_COLOR,
  CHANGING_COLOR,
  MODIFIED_COLOR,
} from "../../src/constants/colors";

const visualizationStepsValues = [
  [
    { value: "h", color: DEFAULT_COLOR },
    { value: "e", color: DEFAULT_COLOR },
    { value: "l", color: DEFAULT_COLOR },
    { value: "l", color: DEFAULT_COLOR },
    { value: "o", color: DEFAULT_COLOR },
  ],
  [
    { value: "h", color: CHANGING_COLOR },
    { value: "e", color: DEFAULT_COLOR },
    { value: "l", color: DEFAULT_COLOR },
    { value: "l", color: DEFAULT_COLOR },
    { value: "o", color: CHANGING_COLOR },
  ],
  [
    { value: "o", color: MODIFIED_COLOR },
    { value: "e", color: CHANGING_COLOR },
    { value: "l", color: DEFAULT_COLOR },
    { value: "l", color: CHANGING_COLOR },
    { value: "h", color: MODIFIED_COLOR },
  ],
  [
    { value: "o", color: MODIFIED_COLOR },
    { value: "l", color: MODIFIED_COLOR },
    { value: "l", color: MODIFIED_COLOR },
    { value: "e", color: MODIFIED_COLOR },
    { value: "h", color: MODIFIED_COLOR },
  ],
];

describe("String page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/recursion");

    cy.get("input").as("stringInput");
    cy.get("p").contains("Развернуть").parent().as("reverseButton");
    cy.get("ul").as("charArray");
  });

  it("has empty input and disabled button by default", () => {
    cy.get("@stringInput").should("have.value", "");
    cy.get("@reverseButton").should("be.disabled");
  });

  it("on button click reverse input value", () => {
    cy.get("@charArray").children().should("have.length", 0);
    cy.get("@stringInput").type("hello");
    cy.get("@reverseButton").should("not.be.disabled");

    cy.get("@reverseButton").click();

    visualizationStepsValues.forEach((expectedValues) => {
      cy.get("div[class^='circle_circle']")
        .should("have.length", 5)
        .each(($el, idx) => {
          const { value, color } = expectedValues[idx];
          expect($el).to.have.text(value);
          expect($el).to.have.css("border-color", color);
        });

      cy.wait(DELAY_IN_MS);
    });
  });
});
