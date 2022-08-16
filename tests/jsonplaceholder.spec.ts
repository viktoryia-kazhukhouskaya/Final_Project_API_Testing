import superagent from "superagent";
import { url } from "../constants/url";
import { statusCode } from "../constants/statusCodes";
import { emptyArray } from "../constants/emptyArray";
import { getUser, getComment } from "../methods/get";
import { postAnotherUser, postUser, postComment } from "../methods/post";
import { putUser, putComment } from "../methods/put";
import { deleteUser, deleteComment } from "../methods/delete";
import { patchUser, patchComment } from "../methods/patch";

describe("API testing - jsonplaceholder.typicode.com", () => {
    test("GET request - all users", async () => {
        const getUsers = await superagent.get(url.allUsers);
        expect(getUsers.status).toBe(statusCode.OK);
    });
    test("GET request - get all posts", async () => {
        const getPosts = await superagent.get(url.allPosts);
        expect(getPosts.status).toBe(statusCode.OK);
    });
    test("GET request - get all comments", async () => {
        const getComments = await superagent.get(url.allComments);
        expect(getComments.status).toBe(statusCode.OK);
    });
    test("GET request - get user", async () => {
        const { id, name, username } = getUser;
        const getSingleUser = await superagent.get(url.singleUser).send({ id, name, username });
        expect(getSingleUser.status).toBe(statusCode.OK);
        expect(getSingleUser.body.id).toBe(id);
        expect(getSingleUser.body.name).toBe(name);
        expect(getSingleUser.body.username).toBe(username);
    });
    test("GET request - get comment", async () => {
        const { postId, id, name } = getComment;
        const postSingleComment = await superagent.get(url.singleComment).send({ postId, id, name });
        expect(postSingleComment.status).toBe(statusCode.OK);
        expect(postSingleComment.body.postId).toBe(postId);
        expect(postSingleComment.body.id).toBe(id);
        expect(postSingleComment.body.name).toBe(name);
    });
    test("POST request - create new user", async () => {
        const { id, name, username } = postUser;
        const postNewUser = await superagent.post(url.allUsers).send({ id, name, username });
        expect(postNewUser.status).toBe(statusCode.created);
        expect(postNewUser.body.id).toBe(id);
        expect(postNewUser.body.name).toBe(name);
        expect(postNewUser.body.username).toBe(username);
    });
    test("POST request - create another user", async () => {
        const { userId, id, title, body } = postAnotherUser;
        const postAnotherSingleUser = await superagent.post(url.allPosts).send({ userId, id, title, body });
        expect(postAnotherSingleUser.status).toBe(statusCode.created);
        expect(postAnotherSingleUser.body.userId).toBe(userId);
        expect(postAnotherSingleUser.body.id).toBe(id);
        expect(postAnotherSingleUser.body.title).toBe(title);
        expect(postAnotherSingleUser.body.body).toBe(body);
    });

    test("POST request - create new comment", async () => {
        const { postId, id, name } = postComment;
        const postNewComment = await superagent.post(url.allComments).send({ postId, id, name });
        expect(postNewComment.status).toBe(statusCode.created);
        expect(postNewComment.body.postId).toBe(postId);
        expect(postNewComment.body.id).toBe(id);
        expect(postNewComment.body.name).toBe(name);
    });
    test("DELETE request - delete single user", async () => {
        const { id, name, username } = deleteUser;
        const deleteSingleUser = await superagent.delete(url.singleUser).send({ id, name, username });
        expect(deleteSingleUser.body).toEqual(emptyArray);
        expect(deleteSingleUser.status).toBe(statusCode.OK);
    });
    test("DELETE request - delete single comment", async () => {
        const { postId, id, name } = deleteComment;
        const deleteSingleComment = await superagent.delete(url.singleComment).send({ postId, id, name });
        expect(deleteSingleComment.body).toEqual(emptyArray);
        expect(deleteSingleComment.status).toBe(statusCode.OK);
    });
    test("PUT request - update single user", async () => {
        const { name, username } = putUser;
        const putSingleUser = await superagent.put(url.singleUser).send({ name, username });
        expect(putSingleUser.status).toBe(statusCode.OK);
        expect(putSingleUser.body.name).toBe(name);
    });
    test("PUT request - update single comment", async () => {
        const { id, name } = putComment;
        const putSingleComment = await superagent.put(url.singleComment).send({ id, name });
        expect(putSingleComment.status).toBe(statusCode.OK);
        expect(putSingleComment.body.name).toBe(name);
    });
    test("PATCH request - update single user", async () => {
        const { name, username } = patchUser;
        const patchSingleUser = await superagent.patch(url.singleUser).send({ name, username });
        expect(patchSingleUser.status).toBe(statusCode.OK);
        expect(patchSingleUser.body.name).toBe(name);
    });
    test("PATCH request - update single comment", async () => {
        const { id, name } = patchComment;
        const patchSingleComment = await superagent.patch(url.singleComment).send({ id, name });
        expect(patchSingleComment.status).toBe(statusCode.OK);
        expect(patchSingleComment.body.name).toBe(name);
    });
});
