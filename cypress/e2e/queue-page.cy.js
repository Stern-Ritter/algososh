import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import { DEFAULT_COLOR, CHANGING_COLOR } from "../../src/constants/colors";

const addElementInputActionSteps = ["s", null, "u", null, "n", null];
const addElementHeadPostions = [null, 0, 0, 0, 0, 0];
const addElementTailPositions = [null, 0, 0, 1, 1, 2, 2];
const addElementVisualizationSteps = [
  [
    { value: "", color: CHANGING_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "", color: CHANGING_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: DEFAULT_COLOR },
    { value: "", color: CHANGING_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
  [
    { value: "s", color: DEFAULT_COLOR },
    { value: "u", color: DEFAULT_COLOR },
    { value: "n", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
];

const deleteElementDeleteActionSteps = [true, true, false];
const deleteElementHeadPostions = [0, 1, 2];
const deleteElementTailPositions = [2, 2, 2];
const deleteElementVisualizationSteps = [
  [
    { value: "s", color: CHANGING_COLOR },
    { value: "u", color: DEFAULT_COLOR },
    { value: "n", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
  [
    { value: "", color: DEFAULT_COLOR },
    { value: "u", color: CHANGING_COLOR },
    { value: "n", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
  [
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "n", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
    { value: "", color: DEFAULT_COLOR },
  ],
];

describe("Queue page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/queue");

    cy.get("input").as("elementInput");
    cy.get("p").contains("Добавить").parent().as("addButton");
    cy.get("p").contains("Удалить").parent().as("deleteButton");
    cy.get("p").contains("Очистить").parent().as("clearButton");
  });

  it("has empty input and disabled buttons by default", () => {
    cy.get("@elementInput").should("have.value", "");
    cy.get("@addButton").should("be.disabled");
    cy.get("@deleteButton").should("be.disabled");
    cy.get("@clearButton").should("be.disabled");
  });

  it("on add button click add element in queue", () => {
    addElementVisualizationSteps.forEach((expectedValues, step) => {
      const inputValue = addElementInputActionSteps[step];
      if (inputValue) {
        cy.get("@elementInput").type(inputValue);
        cy.get("@addButton").click();
      }

      cy.get("div[class^='circle_circle']").each(($el, idx) => {
        const { value, color } = expectedValues[idx];
        expect($el).to.have.text(value);
        expect($el).to.have.css("border-color", color);

        cy.wrap($el).next().should("have.text", idx);
        if (idx === addElementHeadPostions[step]) {
          cy.wrap($el).prev().should("have.text", "head");
        }
        if (idx === addElementTailPositions[step]) {
          cy.wrap($el).next().next().should("have.text", "tail");
        }
      });

      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("on delete button click delete element from queue", () => {
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

      cy.get("div[class^='circle_circle']").each(($el, idx) => {
        const { value, color } = expectedValues[idx];
        expect($el).to.have.text(value);
        expect($el).to.have.css("border-color", color);

        if (idx === deleteElementHeadPostions[step]) {
          cy.wrap($el).prev().should("have.text", "head");
        }
        if (idx === deleteElementTailPositions[step]) {
          cy.wrap($el).next().next().should("have.text", "tail");
        }
      });
      cy.wait(SHORT_DELAY_IN_MS);
    });
  });

  it("on clear button click clear queue", () => {
    addElementInputActionSteps
      .filter((input) => input !== null)
      .forEach((inputValue) => {
        cy.get("@elementInput").type(inputValue);
        cy.get("@addButton").click();
      });

    cy.get("@clearButton").click();
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']").each(($el) => {
      expect($el).to.have.text("");
      expect($el).to.have.css("border-color", DEFAULT_COLOR);
    });
  });
});
