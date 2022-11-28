import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT_COLOR, CHANGING_COLOR } from "../../src/constants/colors";

const addElementInputActionSteps = ["s", null, "u", null, "n", null];
const addElementVisualizationSteps = [
  [{ value: "s", color: CHANGING_COLOR }],
  [{ value: "s", color: DEFAULT_COLOR }],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: CHANGING_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: DEFAULT_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: DEFAULT_COLOR },
    { value: "n", color: CHANGING_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: DEFAULT_COLOR },
    { value: "n", color: DEFAULT_COLOR },
  ],
];

const deleteElementDeleteActionSteps = [true, false, true, false];
const deleteElementVisualizationSteps = [
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: DEFAULT_COLOR },
    { value: "n", color: CHANGING_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: DEFAULT_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: CHANGING_COLOR },
  ],
  [{ value: "s", color: DEFAULT_COLOR }],
];

describe("Stack page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/stack");

    cy.get("input").as("elementInput");
    cy.get("p").contains("Добавить").parent().as("addButton");
    cy.get("p").contains("Удалить").parent().as("deleteButton");
    cy.get("p").contains("Очистить").parent().as("clearButton");
    cy.get("ul").as("stackElements");
  });

  it("has empty input and disabled buttons by default", () => {
    cy.get("@elementInput").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("on add button click add element in stack", () => {
    cy.get("@stackElements").children().should("have.length", 0);

    addElementVisualizationSteps.forEach((expectedValues, step) => {
      const inputValue = addElementInputActionSteps[step];
      if (inputValue) {
        cy.get("@elementInput").type(inputValue);
        cy.get("@addButton").click();

        cy.get("div[class^='circle_circle']").each(($el, idx, arr) => {
          const { value, color } = expectedValues[idx];
          expect($el).to.have.text(value);
          expect($el).to.have.css("border-color", color);

          if (idx === arr.length - 1) {
            cy.wrap($el).prev().should("have.text", "top");
          }
          cy.wrap($el).next().should("have.text", idx);
        });
        cy.wait(SHORT_DELAY_IN_MS);
      }
    });
  });

  it("on delete button click add element in stack", () => {
    addElementInputActionSteps
      .filter((input) => input !== null)
      .forEach((inputValue) => {
        cy.get("@elementInput").type(inputValue);
        cy.get("@addButton").click();
      });

    deleteElementVisualizationSteps.forEach((expectedValues, step) => {
      const isDeleting = deleteElementDeleteActionSteps[step];
      if (isDeleting) {
        cy.get("@deleteButton").click();
      }

      cy.get("div[class^='circle_circle']").each(($el, idx, arr) => {
        const { value, color } = expectedValues[idx];
        expect($el).to.have.text(value);
        expect($el).to.have.css("border-color", color);

        if (idx === arr.length - 1) {
          cy.wrap($el).prev().should("have.text", "top");
        }
        cy.wrap($el).next().should("have.text", idx);
      });
      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("on clear button click clear stack", () => {
    addElementInputActionSteps
      .filter((input) => input !== null)
      .forEach((inputValue) => {
        cy.get("@elementInput").type(inputValue);
        cy.get("@addButton").click();
      });

    cy.get("@clearButton").click();
    cy.get("@stackElements").children().should("have.length", 0);
  });
});
