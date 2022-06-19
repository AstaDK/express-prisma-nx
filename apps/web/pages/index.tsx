import { PrismaClient, User } from "@prisma/client";
import styled from "styled-components";

const StyledPage = styled.div`
  .page {
  }
`;
const prisma = new PrismaClient();

// export async function getStaticProps() {
//   const users: User[] = await prisma.user.findMany();
//   return {
//     props: { users }
//   };
// }

export const getServerSideProps = async () => {
  const users: User[] = await prisma.user.findMany();
  return { props: { users } };
};

type Props = {
  users: User[];
};

const Index: React.FC<Props> = ({ users }) => {
  return (
    <StyledPage>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Demo </span>
            </h1>
          </div>
        </div>
      </div>

      <ul>
        {users.map((user: User) => (
          <li key={user.id}>{user.email}</li>
        ))}
      </ul>
    </StyledPage>
  );
};

export default Index;
