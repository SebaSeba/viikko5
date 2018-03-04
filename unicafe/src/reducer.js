const initialState = {
  hyva: 0,
  neutraali: 0,
  huono: 0,
  positiivisia: 0,
  kaikki: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'hyva':
      return {
        ...state, hyva: state.hyva + 1, kaikki: state.kaikki + 1,
        positiivisia: ((state.hyva + 1) / (state.kaikki + 1)) * 100
      }
    case 'neutraali':
      return {
        ...state, neutraali: state.neutraali + 1, kaikki: state.kaikki + 1,
        positiivisia: ((state.hyva) / (state.kaikki + 1)) * 100
      }
    case 'huono':
      return {
        ...state, huono: state.huono + 1, kaikki: state.kaikki + 1,
        positiivisia: ((state.hyva) / (state.kaikki + 1)) * 100
      }
    default:
      return state
  }
}

export default counterReducer