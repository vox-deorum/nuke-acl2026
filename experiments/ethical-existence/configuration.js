export default /** @type {import("../../../src/schema").RawDataset} */ ({
    name: "ethical-existence",
    title: "Ethical Reasoning in Reasoning Trails",
    data: {
        "explicit-negative": "../sources/explicit_negative_examples.json",
        "explicit": "../sources/explicit_examples.json",
    },
    description:
        "Reasoning trails from a Civilization game experiment.",
    researchQuestion:
        "Do strategists invoke ethical and/or strategic reasoning to shape their decision-making?",
    codingNotes:
        "Apply codes based strictly on what is EXPLICITLY present in the text. Do not assume or expect any particular type of reasoning. A single item may have both codes, one code, or neither (N/A). The data comes from a strategy game context: 'ethical reasoning' refers to any EXPLICIT invocation of moral principles, real-world norms, or value judgments beyond pure in-game strategy.",
    getSpeakerName: () => "strategist",
});
