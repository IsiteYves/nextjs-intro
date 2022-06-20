import { PrismaClient } from "@prisma/client";
import { useState } from "react";
import { server } from "../config";

const Newuser = ({ initialContacts }) => {
  const [contacts, setContacts] = useState(initialContacts);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    avatar: "",
  });
  const updateUserInfo = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <form
        action="#"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await saveContact(userInfo);
            setContacts([...contacts, userInfo]);
            // e.target.reset();
          } catch (err) {
            console.log(err);
          }
        }}
      >
        <h2>Add new user</h2>
        <div>
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            id="firstname"
            name="firstName"
            placeholder="First Name"
            onChange={updateUserInfo}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            id="lastname"
            name="lastName"
            placeholder="Last Name"
            onChange={updateUserInfo}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            onChange={updateUserInfo}
            required
          />
        </div>
        <div>
          <label htmlFor="avatar">Avatar</label>
          <input
            type="text"
            name="avatar"
            id="avatar"
            placeholder="Avatar"
            onChange={updateUserInfo}
            required
          />
        </div>
        <div>
          <br />
          <input
            type="submit"
            value="Submit"
            style={{
              padding: "0.6rem 2rem",
              color: "#fff",
              background: "blue",
            }}
          />
        </div>
      </form>
      <div style={{ marginLeft: "1.5rem" }}>
        {contacts.map((contact, index) => {
          const { firstName, lastName, email, avatar } = contact;
          return (
            <div
              key={index}
              style={{
                padding: "1rem",
                border: "1px solid #000",
                borderRadius: "8px",
              }}
            >
              <img
                src={avatar}
                style={{ width: "100px" }}
                alt={`${firstName}'s github profile picture`}
              />
              <h3>
                {firstName} <span>{lastName}</span>
              </h3>
              <a href={`mailto:${email}`}>{email}</a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const contacts = await prisma.Contact.findMany();
  return {
    props: {
      initialContacts: contacts,
    },
  };
}

async function saveContact(contact) {
  const response = await fetch(`${server}/api/contacts`, {
    method: "POST",
    body: JSON.stringify(contact),
  });

  if (!response.ok) throw new Error(response.statusText);

  return await response.json();
}

export default Newuser;
