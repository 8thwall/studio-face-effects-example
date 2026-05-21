import * as ecs from '@8thwall/ecs'

ecs.registerComponent({
  name: 'enable-glasses-on-find',
  schema: {
    glasses: 'eid',
  },
  stateMachine: ({world, eid, defineState, schemaAttribute}) => {
    const glasses = world.getEntity(schemaAttribute.get(eid).glasses)
    defineState('initial').initial().onEvent( ecs.events.FACE_FOUND, 'found', {
      target: world.events.globalId
    }).onEnter(() => {
       glasses.reset(ecs.Disabled)
    })

    defineState('found').onEnter(() => {
      glasses.remove(ecs.Disabled)
    })
  }
})

ecs.registerComponent({
  name: 'hide-on-ready',
  stateMachine: ({world, eid, defineState}) => {
    defineState('initial').initial().onEvent( ecs.events.REALITY_READY, 'ready', {
      target: world.events.globalId,
    })

    defineState('ready').onEnter(() => {
      ecs.Disabled.reset(world, eid)
    })
  }
})

