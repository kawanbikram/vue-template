
export default function monitorMutations(store) {

  store.subscribe((mutation, state) => {

    if (mutation.type === 'setCount' && mutation.payload) {
      console.log('Increased count')
    }

    // STATE DEBUG CODE
    // console.log("----------------------------")
    // console.log(">>>> mutation - ", mutation)
    // console.log("<<<< current state -", state )
    // console.log("----------------------------")

  })

}
