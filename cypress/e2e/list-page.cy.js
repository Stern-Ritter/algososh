import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  DEFAULT_COLOR,
  CHANGING_COLOR,
  MODIFIED_COLOR,
} from "../../src/constants/colors";
import {
  MIN_LEN,
  MAX_LEN,
  MIN_VALUE,
  MAX_VALUE,
} from "../../src/constants/linkedList";

const SMALL_CIRCLE_SIZE = "56px";
const MEDIUM_CIRCLE_SIZE = "80px";

const expectedValues = Array.from(Array(MAX_VALUE - MIN_VALUE + 1), (_, idx) =>
  String(MIN_VALUE + idx)
);
const outOfRangeElement = MAX_VALUE + 1;

describe("Queue page", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/list");

    cy.get('input[placeholder="Введите значение"]').as("elementInput");
    cy.get('input[placeholder="Введите индекс"]').as("indexInput");
    cy.get("p").contains("Добавить в head").parent().as("addInHeadBtn");
    cy.get("p").contains("Добавить в tail").parent().as("addInTailBtn");
    cy.get("p").contains("Добавить по индексу").parent().as("addByIndexBtn");
    cy.get("p").contains("Удалить из head").parent().as("deleteFromHeadBtn");
    cy.get("p").contains("Удалить из tail").parent().as("deleteFromTailBtn");
    cy.get("p").contains("Удалить по индексу").parent().as("deleteByIndexBtn");
  });

  it("has empty input and disabled buttons by default", () => {
    cy.get("@elementInput").should("have.value", "");
    cy.get("@indexInput").should("have.value", "");
    cy.get("@addInHeadBtn").should("be.disabled");
    cy.get("@addInTailBtn").should("be.disabled");
    cy.get("@addByIndexBtn").should("be.disabled");
    cy.get("@deleteByIndexBtn").should("be.disabled");
  });

  it("renders the default list of elements", () => {
    cy.get("div[class^='circle_circle']")
      .should("have.length.within", MIN_LEN, MAX_LEN)
      .each(($el, idx, arr) => {
        expect($el.text()).to.be.oneOf(expectedValues);
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        cy.wrap($el).next().should("have.text", idx);

        if (idx === 0) {
          cy.wrap($el).prev().should("have.text", "head");
        }
        if (idx === arr.length - 1) {
          cy.wrap($el).next().next().should("have.text", "tail");
        }
      });
  });

  it("on add in head button click add element in list head", () => {
    cy.get("@elementInput").type(outOfRangeElement);
    cy.get("@addInHeadBtn").click();

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", CHANGING_COLOR);
        expect($el).to.have.css("width", SMALL_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", MODIFIED_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
  });

  it("on add in tail button click add element in list tail", () => {
    cy.get("@elementInput").type(outOfRangeElement);
    cy.get("@addInTailBtn").click();

    cy.get("div[class^='circle_circle']")
      .eq(-2)
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", CHANGING_COLOR);
        expect($el).to.have.css("width", SMALL_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .last()
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", MODIFIED_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .last()
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
  });

  it("on add by index button click add element on selected position", () => {
    cy.get("@elementInput").type(outOfRangeElement);
    cy.get("@indexInput").type(2);
    cy.get("@addByIndexBtn").click();

    cy.get("div[class^='circle_circle']")
      .eq(0)
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", CHANGING_COLOR);
        expect($el).to.have.css("width", SMALL_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(1)
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", CHANGING_COLOR);
        expect($el).to.have.css("width", SMALL_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(2)
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", CHANGING_COLOR);
        expect($el).to.have.css("width", SMALL_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(2)
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", MODIFIED_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(2)
      .should(($el) => {
        expect($el).to.have.text(outOfRangeElement);
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
  });

  it("on delete from head button click delete element in list head", () => {
    let firstElementValue;
    let secondElementValue;

    cy.get("div[class^='circle_circle']")
      .first()
      .then(($el) => {
        firstElementValue = $el.text();
      });
    cy.get("div[class^='circle_circle']")
      .eq(1)
      .then(($el) => {
        secondElementValue = $el.text();
      });

    cy.get("@deleteFromHeadBtn").click();

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text("");
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
    cy.get("div[class^='circle_circle']")
      .eq(1)
      .should(($el) => {
        expect($el).to.have.text(firstElementValue);
        expect($el).to.have.css("border-color", CHANGING_COLOR);
        expect($el).to.have.css("width", SMALL_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .first()
      .should(($el) => {
        expect($el).to.have.text(secondElementValue);
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
  });

  it("on delete from tail button click delete element in list tail", () => {
    let lastElementValue;
    let penultimateElementValue;

    cy.get("div[class^='circle_circle']")
      .last()
      .then(($el) => {
        lastElementValue = $el.text();
      });
    cy.get("div[class^='circle_circle']")
      .eq(-2)
      .then(($el) => {
        penultimateElementValue = $el.text();
      });

    cy.get("@deleteFromTailBtn").click();

    cy.get("div[class^='circle_circle']")
      .eq(-2)
      .should(($el) => {
        expect($el).to.have.text("");
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
    cy.get("div[class^='circle_circle']")
      .last()
      .should(($el) => {
        expect($el).to.have.text(lastElementValue);
        expect($el).to.have.css("border-color", CHANGING_COLOR);
        expect($el).to.have.css("width", SMALL_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .last()
      .should(($el) => {
        expect($el).to.have.text(penultimateElementValue);
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
  });

  it("on delete by index button click delete element on selected position", () => {
    const indexForElementDeleting = 1;
    let onIndexElementValue;
    let nextElementValue;

    cy.get("div[class^='circle_circle']")
      .eq(indexForElementDeleting)
      .then(($el) => {
        onIndexElementValue = $el.text();
      });
    cy.get("div[class^='circle_circle']")
      .eq(indexForElementDeleting + 1)
      .then(($el) => {
        nextElementValue = $el.text();
      });

    cy.get("@indexInput").type(indexForElementDeleting);
    cy.get("@deleteByIndexBtn").click();

    cy.get("div[class^='circle_circle']")
      .eq(0)
      .should(($el) => {
        expect($el).to.have.css("border-color", CHANGING_COLOR);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(indexForElementDeleting)
      .should(($el) => {
        expect($el).to.have.text("");
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
    cy.get("div[class^='circle_circle']")
      .eq(indexForElementDeleting + 1)
      .should(($el) => {
        expect($el).to.have.text(onIndexElementValue);
        expect($el).to.have.css("border-color", CHANGING_COLOR);
        expect($el).to.have.css("width", SMALL_CIRCLE_SIZE);
      });
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("div[class^='circle_circle']")
      .eq(indexForElementDeleting)
      .should(($el) => {
        expect($el).to.have.text(nextElementValue);
        expect($el).to.have.css("border-color", DEFAULT_COLOR);
        expect($el).to.have.css("width", MEDIUM_CIRCLE_SIZE);
      });
  });
});
