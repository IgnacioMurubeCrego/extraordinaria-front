import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "axios";
import { Character } from "../../types.ts";

export const handler: Handlers = {
  GET: async (req: Request, ctx: FreshContext<unknown, Character>) => {
    const url = new URL(req.url);
    const id = url.toString().split("/")[4];
    console.log("ID : " + id);
    const res = await axios.get<Character>(
      `https://rickandmortyapi.com/api/character/${id}`,
    );
    // console.log(res.data);
    return ctx.render(res.data);
  },
};

const Page = ({ data }: PageProps<Character>) => {
  const character = data;
  console.log(data);
  return (
    <>
      <a href="/" class="back-link" data-ancestor="true" aria-current="true">
        Volver
      </a>
      <div>{data.name}</div>
      <div class="character-detail">
        <img src={character.image} alt={character.name} width={200} />

        <div class="character-info">
          <h1 class="title">{character.name}</h1>
          <ul>
            <li>
              <strong>Status:</strong> {character.status}
            </li>
            <li>
              <strong>Species:</strong> {character.species}
            </li>
            <li>
              <strong>Gender:</strong> {character.gender}
            </li>
            <li>
              <strong>Origin:</strong> {character.origin.name}
            </li>
            <li>
              <strong>Location:</strong> {character.location.name}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Page;
