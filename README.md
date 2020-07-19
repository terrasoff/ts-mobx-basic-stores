# Description

The collection of helpers :hammer_and_wrench: written with mobx :muscle: and typescript :heart: which helps you to simplify code and organize you application.

These are most :blue_heart: frequently used libraries in my reactjs/mobx projects. 

# Example 

Click to the headers :point_down: to navigate to the example page. 

### [Array](https://codesandbox.io/s/observable-array-store-johng)

Represents the logic of an observable array. Control your collections with that store.

### [AsyncOperation](https://codesandbox.io/s/async-operation-store-okwh7)

Represents the logic of an observable async operation. Useful for fetch/submit data from/to API.

You can easily control operation state based on OperationState, run operation in single instance and set up retries.

### [Boolean](https://codesandbox.io/s/observable-boolean-store-5pscq)

Represents the logic of an observable boolean value. 

Looks similar to **ToggleState** but semantically is more appropriate for boolean flags.

Cases for **BooleanStore**: `phone.isActivated.true` or `car.isAvailable.false`.

Cases for **ToggleState**: `modal.visibility.isOff` or `lighter.power.isOn`. 

### [Disposer](https://codesandbox.io/s/disposer-disposable-container-gks80)

Represents a container with callbacks (like mobx reactions or any others) that should be called later to perform some disposal.

You can fill the container in a runtime and call dispose-method accordingly to yours application lifecycle.

You can find a [good example](https://codesandbox.io/s/typescript-mobx-form-state-library-usage-example-hsdmh?file=/src/Forms/BasicForm/BasicFormStore.ts) 
of usage with [ts-mobx-form-state](https://www.npmjs.com/package/ts-mobx-form-state)
to dispose reactions.

### [Numeric](https://codesandbox.io/s/observable-numeric-store-6clbc)

Represents the logic of an observable numeric value.

### [Object](https://codesandbox.io/s/observable-object-store-zrkf2)

Represents the logic of an observable object.

Useful in case of forms handling and representing complex data structures.

### [OperationState](https://codesandbox.io/s/observable-operation-state-store-cpeuu)

Represents the logic of an observable operation state with typical transitions. 

Helps to control the single operation flow and react to every state change.

### [Selection](https://codesandbox.io/s/observable-selection-store-gp2yh)

Represents the logic of an observable selection.

Allows managing selection state. For the instance the checkbox lists or radio button lists.

### [String](https://codesandbox.io/s/observable-string-store-t6y85)

Represents the logic of an observable string.

### [Timer](https://codesandbox.io/s/observable-timer-store-3b9jx)

Simplify a timer workflow.

### [ToggleState](https://codesandbox.io/s/observable-toggle-state-png6g)

Represents the state of the toggle operation (on/off/indeterminate). 

For the instance, helps to control the checkbox state.

### [Value](https://codesandbox.io/s/observable-value-z6yxw)

Represents the logic of an observable scalar value.

# Installation

`npm i --save ts-mobx-basic-stores`

# Code styles

Run `npm run lint`.

# Tests

Run `npm run test`.

# Roadmap

- Get stable 1.0.0 release ready.

- Segregate all stores to separate packages later when it's stable (As for now, all stores combined to single package to develop and maintain it faster).