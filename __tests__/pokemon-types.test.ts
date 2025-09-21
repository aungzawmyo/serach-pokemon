// pokemon-types.test.ts

describe("Pokemon type tests", () => {
  const bulbasaur = { name: "Bulbasaur", type: "Grass" };
  const charmander = { name: "Charmander", type: "Fire" };
  const squirtle = { name: "Squirtle", type: "Water" };

  test("Bulbasaur should be Grass type", () => {
    expect(bulbasaur.type).toBe("Grass");
  });

  test("Charmander should be Fire type", () => {
    expect(charmander.type).toBe("Fire");
  });

  test("Squirtle should be Watqer type", () => {
    expect(squirtle.type).toBe("Water");
  });
});