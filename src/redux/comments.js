import * as ActionTypes from './ActionTypes';

export const Comments = (state ={
    ereMess:null,
    comments:[]

}, action) => {
    switch (action.type) {
        case ActionTypes.ADD_COMMENTS:
            return{...state,isLoading:false, errmess:null, comments:action.payload};

        case ActionTypes.COMMENTS_FAILED:
            return{...state,isLoading:false, errmess:action.payload, comments:[]};

        case ActionTypes.ADD_COMMENT:

            var comment = action.payload;
            comment.id = state.comments.length;
            comment.date = new Date().toISOString();
            console.log("Comment: ", comment);
            return {...state,comments:state.comments.concat(comment)}
        default:
            return state;
    }
}