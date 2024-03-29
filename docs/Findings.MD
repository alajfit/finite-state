# State Machines

## Terms

- State Machine -> State Machine is a finite set of states that can transition to one another through events
- Statechart -> Is an extension of a State Machine, it can have nested states, parrallel states and history
- Machine Factory -> Factory function used to create State Machines and Statecharts
- Machine:id -> Allows us to give the machine a name
- Mahcine:initial -> Allows us to set the initial state
- Machine:context -> Is a property of a Machine that allows us to hold and manipulate real world data
- Machine:states -> States that can exist within the machine
- Assign Action -> the assign() method is used to update context and requires and object with the changed properties
- Strict -> Events not accepted throw an error, unhandled Promise rejections stop the machine
- Options -> A machine accepts a second argument for options of the machine, this is an object with assigned props
- Options:actions -> The actions option maps names to their implementation
- Options:activities -> Maps activitiy names to their implementation
- Options:guards -> Mapping of transition guards to their implementation
- Options:services -> Mapping of invoked services to their implementation
- Extending Machines -> using the withConfig() method we can extend a machine after creation
- Extend Context -> We can alter context at a later stage using the withContext() method, good for spreading context obj, updating from a saved state in local storage
- State -> An abstract representation of a system at a point in time
- State:instance -> The current state is represented by a State instance
- State:value -> The current value of the current state
- State:event -> The event object that triggered the transition to the current state
- State:actions -> A list of actions to be completed in order
- State:history -> History of the previous state instance
- State:meta -> Static meta data defined on the meta property of the state node
- State Nodes -> A state configuration, defined on the states property of a machine, substates are defined in the same way
- State Node Types -> the type can be explicitly added to a state node
- Node:atomic -> A leaf node with no child states
- Node:compound -> Contains one or more child states and has an initial state, which is key to one of the child states
- Node:parallel -> Contains two or more child states and no initial state and it is within many child states at the same time
- Node:final -> leaf node that represents an abstract terminal state
- Transient State Nodes -> This is a pass through state to change to another state based on certain conditions
- Events -> Events cause a machine to transition from its current state to another state
- Event Object -> Contains a type and can contain other properties which represent associated data
- Event Shorthand -> Events can be wrote as just a string variable if they only contain a type
- Event Sending -> We can send an event using the service method send()
- Event:target -> Used within an event to define the next state
- Null Event -> A null event has no type and occurs immediately once a state is entered, it is represented by an empty string ''
- Null Event Use -> Null events are used generally for transient transitions where a state immediately determines the following state
- Transitions -> Define what the next state will be based on the current state and the event passed
- Transition Method -> machine.transition gives us the new state by sending the current state and the event
- Transition:internal -> This means the entry and exit actions of a node are not fired
- Transition:external -> This means the entry and exit actions are always fired on a node
- Transition:default -> The default transition is external
- Transition:transient -> Sent after every transition, so we can use for internal conditional checks
- Transition:forbideen -> Used by setting the transition to undefined, used for prevent things such as logging on sensitive information
- Transition:multiple targets -> This can only be used in parallel state machines and allows a single transition to trigger multiple state changes
- Side Effects:fire and forget -> Includes Actions / Activities as side effects that will not send events back to the state chart
- Side Effects:invoked -> These are side effects that can send and receive events invoked promises, invoked callbacks, invoked machines
- Actions -> Allows us to create side efffects
- Actions send -> Allows us to send an event to trigger an action
- Log Action -> Allows us to log items from the context or the event itself
- Guards -> Guards allow us only to transition when a certain criteria is met e.g. search only if the query is not empty
- Guards:cond -> cond is the property on a transition and can be the object or a reference to a guard within the options object
- Guards:custom -> When defining the Guard reference in the Machine we can also pass data to the Guard through the object
- Guards:multiple -> Multiple guards can be set that can take the state to different states
- Guards: in state -> Allows us to check the if a state is active before proceeding
- Actions:assign order -> assign() actions are raised and so will happen before any other actions in the list
- Activities allow us to run an action over time e.g. an interval until the state is change, the activity must return a method to allow cancelling as this is called on state change
- Activities:restarting -> A restored previous state will not start activities, these must be started manually if restoring previous state
- Invoke -> Allows us to invoke child machines and listen for events from the child machine or for the child machine to reach its final state
- Invoke:promises -> Promises can be modeled simply as a state machine and invoked easily with the invoke property of a node state
- Invoke:callbacks -> Allows us to setup a stream of events through a callback handler
- Invoke:observables -> Allows us to watch another stream of events from an observable
- Invoke:machines -> Machines can invoke submachines and update after a machine has relayed information and called final, data can also be passed back up the chain
- Invoke:child machine final -> Data can be passed back on a final type state node
- Invoke:multiple services -> Multiple services can be invoked by passing an array of services