The collection of helpers written with mobx and typescript which helps you to simplify code and organize you application.

These are most frequently used libraries in my reactjs/mobx projects. So I segregated it into the separate library. 

## Array

Represents the logic of an observable array.

## AsyncOperationStore

Represents the logic of an observable async operation.

You can easily control operation state based on OperationState, run operation in single instance and set up retries.

## Disposer

Represents a container with callbacks (like mobx reactions or any others) that should be called later to perform some disposal.

You can fill the container in a runtime and call dispose-method accordingly to yours application lifecycle.

## Object

Represents the logic of an observable object.

You can mutate the object and  

## OperationState

Represents the logic of an observable operation state with typical transitions. 

Helps to control the single operation flow and react to every state change.

## Selection

Represents the logic of an observable selection.

Allows managing selection state. For the instance the checkbox lists or radio button lists.

## Timer

Simplify a timer workflow.

## ToggleState

Represents the state of the toggle operation (on/off/indeterminate). 

For the instance, helps to control the checkbox state.

## Value

Represents the logic of an observable scalar value.

# Example 

TODO 

# Installation

`npm i --save ts-mobx-basic-stores`

# Code styles

Run `npm run lint`.

# Tests

Run `npm run test`.