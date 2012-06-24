# Meteor DOM Reactions

An experimental tool for learning about DOM reactions in Meteor

## Usage

In any template use the provided `showReactions` helper. Pass a unique label as the only argument:

    {{#showReactions "page wrapper"}}
      <!-- page content... -->
    {{/showReactions}}

This will drop a small console in your browser that displays a log of changes to areas marked with `showReactions`. When you mouseover a label the affected DOM element will be highlighted.

## Experiment Browser

The helper is made to be used in your own project but it would be great to build up a library of experiments that we can reference as the Meteor evolves. Would love if people added experiments of their own. If you build it I'll add it. Let me know if you need any assistance getting started.

## TODO

More complex experiments
