import { useEffect, useState } from "react";
import { PrismaClient } from "@prisma/client";
import { server } from "../config";

const custom = ({ usersList }) => {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    const int = setInterval(() => {
      setCounter((count) => count + 1);
    }, 1000);
    return () => clearInterval(int);
  }, []);
  return (
    <>
      <h3>Custom counter: {counter}</h3>
      {usersList.length > 0 ? (
        <>
          <p className="text-3xl font-bold underline text-[crimson] my-9">
            List of Users
          </p>
          <div>
            {usersList.map((user, index) => (
              <div
                key={index}
                className="rounded-md"
                style={{
                  boxShadow: "8px 0 36px #808080",
                  padding: "1.5rem 2rem",
                }}
              >
                <h3 className="font-bold">{user.id}</h3>
                <h6>
                  {user?.firstName}{" "}
                  <span
                    style={{ background: "crimson", color: "#fff" }}
                    className="font-bold uppercase ital"
                  >
                    {user?.lastName}
                  </span>
                </h6>
                <em>{user.email}</em>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h3>No users registered</h3>
      )}
    </>
  );
};

export default custom;

export const getServerSideProps = async () => {
  const contacts = await fetch("http://localhost:3000/api/contacts", {
    method: "GET",
  });
  const usersList = await contacts.json();
  return {
    props: {
      usersList,
    },
  };
};
