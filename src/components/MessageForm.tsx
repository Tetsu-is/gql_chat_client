import React from "react";
import { gql, useMutation } from "@apollo/client";

const CREATE_MESSAGE = gql`
  mutation PostMessage($input: NewMessage!) {
    createMessage(input: $input) {
      user_id
      body
    }
  }
`;

const MessageForm = () => {
    let input: HTMLInputElement;
    const [postMessage, {data, loading, error}] = useMutation(CREATE_MESSAGE);
    if (loading) return <p>Now posting your message!!</p>
    if (error) return <p>Error : {error.message}</p>
    console.log(data);
    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                postMessage({variables: {input: {user_id: "111", body: input.value}}})
                input.value = "";
            }}>
                <input ref={node => {input = node!;}}></input>
                <button type="submit">Post!</button>
            </form>
        </div>
    )    
};

export default MessageForm;
