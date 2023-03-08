export default function Reducer(state, action) {
    switch (action.type) {
        case 'AUTH_USER':
            return {
                ...state,
                user: action.payload.user,
                organization: action.payload.organization,
                isAuthenticated: action.payload.isAuthenticated,
                promotion: action.payload.promotion,
                isLoading: action.payload.isLoading
            }
        case 'LOGIN':
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                isAuthenticated: action.payload.isAuthenticated,
            }
        case 'NOT_AUTHENTICATED':
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                isLoading: action.payload.isLoading,
            }
        default:
            return state
    }
}