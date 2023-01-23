import httpService from "./http.service";
const commentsEndpoint = "comment/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.put(
            commentsEndpoint + payload._id,
            payload
        );
        return data;
    },

    getComments: async (pageId) => {
        const { data } = await httpService.get(commentsEndpoint, {
            params: {
                orderBy: '"pageId"',
                equalTo: `"${pageId}"`
            }
        });
        return data;
    },

    removeComment: async (commentId) => {
        const { data } = await httpService.delete(commentsEndpoint + commentId);
        return data;
    }
};
export default commentService;
