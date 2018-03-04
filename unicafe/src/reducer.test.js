import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('Unicafe reducer', () => {
  const initialState = {
    hyva: 0,
    huono: 0,
    neutraali: 0,
    positiivisia: 0,
    kaikki: 0
  }

  it('should return a proper initial state when called with undefined state', () => {
    const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(undefined, action)
    expect(newState).toEqual(initialState)
  })

  it('good is incremented', () => {
    const action = {
      type: 'hyva'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      hyva: 1,
      huono: 0,
      neutraali: 0,
      positiivisia: 100,
      kaikki: 1
    })
  })

  it('bad is decremented', () => {
    const action = {
      type: 'huono'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      hyva: 0,
      huono: 1,
      neutraali: 0,
      positiivisia: 0,
      kaikki: 1
    })
  })

  it('neutral is added', () => {
    const action = {
      type: 'neutraali'
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      hyva: 0,
      huono: 0,
      neutraali: 1,
      positiivisia: 0,
      kaikki: 1
    })
  })

  it('positive rate is calculated', () => {
    let action = {
      type: 'hyva'
    }
    const state = initialState

    deepFreeze(state)
    let newState = counterReducer(state, action)

    action = {
      type: 'huono'
    }

    newState = counterReducer(newState, action)

    expect(newState).toEqual({
      hyva: 1,
      huono: 1,
      neutraali: 0,
      positiivisia: 50,
      kaikki: 2
    })
  })

})