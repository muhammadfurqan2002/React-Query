import React from 'react';
import { useQuery } from '@tanstack/react-query';
// ik ke bad ik query krni ha then we use dependent query
// for more read documentation
const fetchPostById = async (postId) => {
    const data = await fetch(`https://dummyjson.com/posts/${postId}`).then((res) => res.json());
    return data;
};

const fetchCommentsByPostId = async (postId) => {
    const data = await fetch(`https://dummyjson.com/comments/post/${postId}`).then((res) =>
        res.json()
    );
    return data.comments;
};

const Dependant = () => {
    const { data: post, isLoading } = useQuery({
        queryKey: ['post'],
        queryFn: () => fetchPostById(2),
    });

    const postId=post?.id

    const { data: comments } = useQuery({
        queryKey: ['comments', post?.id],
        queryFn: () => fetchCommentsByPostId(post.id),
        // !! agr true ha to false ho jae ga or false hoga to true kr dega
        enabled:!!postId
    });

    return (
        <div className="p-12">
            <h1 className="text-lg font-bold">Post:</h1>
            {isLoading ? <p>Loading the post</p> : <h2>{post?.title}</h2>}
            <br />
            <h1 className="text-lg font-bold">Comments</h1>
            <ul>
                {comments?.map((comment) => (
                    <p key={comment.id}>{comment.body}</p>
                ))}
            </ul>
        </div>
    );
};

export default Dependant;
