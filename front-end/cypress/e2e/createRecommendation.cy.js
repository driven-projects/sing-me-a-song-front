import { faker } from "@faker-js/faker";

describe("Teste do fluxo de criação de recomendação", () => {
  it("Cria uma recomendação com dados válidos", () => {
    cy.visit("http://localhost:3000");
    cy.resetDatabase();

    const recommendation = {
      name: faker.music.songName(),
      youtubeLink: "https://www.youtube.com/watch?v=Zi_XLOBDo_Y",
    };

    const { name, youtubeLink } = recommendation;

    cy.get('[data-test-id="musicName"]').type(name);
    cy.get('[data-test-id="musicYoutubeLink"]').type(youtubeLink);

    cy.intercept("POST", "http://localhost:5000/recommendations").as(
      "postRecommendation"
    );
    cy.get('[data-test-id="submitRecommendation"]').click();
    cy.wait("@postRecommendation");
  });
});
