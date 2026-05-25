export default /** @type {import("../../../src/schema").RawDataset} */ ({
    name: "game-existence",
    title: "Game-Framing Logic in Reasoning Trails",
    data: {
        "game-simulation-negative": "../sources/game_simulation_negative_examples.json",
        "game-simulation": "../sources/game_simulation_examples.json",
    },
    description:
        "Reasoning trails from a Civilization game experiment.",
    researchQuestion:
        "Do strategists invoke game or real-world framing to shape their nuclear-related decision-making?",
    codingNotes:
        "Apply codes based strictly on what is present in the text. Ordinary game engagement (referencing mechanics, tools, victory conditions, AI settings, or game entities) is NOT game-framing. A single item may have both codes, one code, or neither (NA).",
    getSpeakerName: () => "strategist",
});
