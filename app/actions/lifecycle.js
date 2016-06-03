
import { createAction } from 'redux-actions'

/*
 * Will trigger handlers.addressIsUpdating
 *
 * to get the suggestions
 */
export const addressIsUpdating = value => dispatch => false

/*
 * Will trigger handlers.pageIsLoaded
 *
 * to feed the history and handlers history
 */
export const pageIsLoaded = getContent => dispatch => false

/*
 * Will trigger handlers.willNavigate
 *
 * before the page load
 */
export const willNavigate = link => dispatch => false

/*
 * Will trigger handlers.didNavigate
 *
 * after the page is loaded
 */
export const didNavigate = link => dispatch => false

