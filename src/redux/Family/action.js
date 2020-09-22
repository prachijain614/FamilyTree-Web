import ActionTypes from "../actionTypes";
import { Tree } from '../../utils/helper';

export function getFamily(data, loading) {
    return {
        type: ActionTypes.GET_FAMILY,
        payload: {
            data: data,
            loading: loading
        }
    }
}

export function getMember(data, loading) {
    let familyTree = Tree(data)
    return {
        type: ActionTypes.GET_MEMBER,
        payload: {
            data: familyTree,
            loading: loading
        }
    }
}
