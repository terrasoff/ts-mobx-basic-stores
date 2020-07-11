# Description

The collection of helpers written with mobx and typescript which helps you to simplify code and organize you application.

These are most frequently used libraries in my reactjs/mobx projects. 

### [Array](https://codesandbox.io/s/observable-array-store-47nye)

Represents the logic of an observable array.

### [AsyncOperationStore](https://codesandbox.io/s/async-operation-store-fsbg1)

Represents the logic of an observable async operation.

You can easily control operation state based on OperationState, run operation in single instance and set up retries.

### [Disposer](https://codesandbox.io/s/disposer-disposable-container-p9j0i)

Represents a container with callbacks (like mobx reactions or any others) that should be called later to perform some disposal.

You can fill the container in a runtime and call dispose-method accordingly to yours application lifecycle.

### Object

Represents the logic of an observable object.

You can mutate the object and  

### OperationState

Represents the logic of an observable operation state with typical transitions. 

Helps to control the single operation flow and react to every state change.

### [Selection](https://codesandbox.io/s/selection-store-4b8ms)

Represents the logic of an observable selection.

Allows managing selection state. For the instance the checkbox lists or radio button lists.

### Timer

Simplify a timer workflow.

### ToggleState

Represents the state of the toggle operation (on/off/indeterminate). 

For the instance, helps to control the checkbox state.

### Value

Represents the logic of an observable scalar value.

# Example 

In progress. 

# Installation

`npm i --save ts-mobx-basic-stores`

# Code styles

Run `npm run lint`.

# Tests

Run `npm run test`.

# Roadmap

- Get stable 1.0.0 release ready.

- Segregate all stores to separate packages later when it's stable (As for now, all stores combined to single package to develop and maintain it faster).