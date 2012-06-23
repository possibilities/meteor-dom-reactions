# Meteor DOM Reactions

An experimental tool for learning about DOM reactions in Meteor

## Usage

In any template use the provided `showReactions` helper. Pass a unique label as the only argument:

    {{showReactions "an very cool element"}}

This will add a block with the time spot in the DOM was last re-rendered

*Note: Pretty rough. Currently adds a block element to the DOM which is only good for the most basic experimentation. I have an idea for a less obtrusive UI strategy that I hope to crank out at some point.*
