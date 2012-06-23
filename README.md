# Meteor DOM Reactions

An experimental tool for learning about DOM reactions in Meteor

*Note: Pretty rough. Currently adds a block element to the DOM which is only good for the most basic experiments (see [http://dom-reaction-experiments.meteor.com/](http://dom-reaction-experiments.meteor.com/)). I have an idea for a less obtrusive UI strategy that I hope to crank out at some point.*

## Usage

In any template use the provided `showReactions` helper. Pass a unique label as the only argument:

    {{showReactions "a very cool element"}}

This will insert a block in the DOM indicating when it was last rendered.

## TODO

Do some experiments that iterate over cursors
