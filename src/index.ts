import { Machine, interpret, actions } from 'xstate'

const { log } = actions

const promiseMachine = Machine({ 
    id: 'promise',
    initial: 'pending',
    states: {
        pending: {
            on: {
                RESOLVE: 'resolved',
                REJECT: 'rejected'
            }
        },
        resolved: {
            type: 'final'
        },
        rejected: {
            type: 'final'
        }
    }
})

const promiseService = interpret(promiseMachine)
    .onTransition(state => {
        console.log(state.value)
    })

promiseService.start()

promiseService.send('RESOLVE')

const triggerMachine = Machine({
    id: 'trigger',
    initial: 'inactive',
    states: {
        inactive: {
            on: {
                TRIGGER: {
                    target: 'active',
                    actions: ['activate', 'sendTelemetry', log(
                        (context, event) => `Event: ${event.type}`
                    )]
                }
            }
        },
        active: {
            entry: ['notifyActive', 'sendTelemetry'],
            exit: ['notifyInactive', 'sendTelemetry'],
            on: {
                STOP: 'inactive'
            }
        }
    }
}, {
    actions: {
        activate: (context, event) => {
            console.log('activating...')
        },
        notifyActive: (context, event) => {
            console.log('active')
        },
        notifyInactive: (context, event) => {
            console.log('inactive!')
        },
        sendTelemetry: (context, event) => {
            console.log('time:', Date.now())
        }
    }
})

const triggerService = interpret(triggerMachine)
triggerService.start()
triggerService.send('TRIGGER')
triggerService.send('STOP')
