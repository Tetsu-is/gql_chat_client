import { useState } from "react";
import "./App.css";
import { useQuery, gql } from "@apollo/client";
import MessageForm from "./components/MessageForm";

const GET_MESSAGES = gql`
  query GetMessage($index: Int!) {
    messages(index: $index) {
      id
      user_id
      user_name
      body
    }
  }
`;

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>My first Apollo app</h2>
      <br />
      <DisplayLocations />
      <MessageForm />
    </div>
  );
}

function DisplayLocations() {
  const { loading, error, data } = useQuery(GET_MESSAGES, {
    variables: { index: 1 },
  });

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.messages.map(
    ({
      id,
      user_id,
      user_name,
      body,
    }: {
      id: string;
      user_id: string;
      user_name: string;
      body: string;
    }) => (
      <div key={id}>
        <h3>
          userID:{user_id} Name:{user_name}
        </h3>
        <p>{body}</p>
      </div>
    )
  );
}

export default App;
