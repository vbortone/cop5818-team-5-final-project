import { getSession } from "@auth0/nextjs-auth0";
import Image from "next/image";

export default async function ProfileServer() {
  const session = await getSession();
  const user = session?.user;

  return (
    user && (
      <div>
        <Image src={user.picture ?? ""} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}
