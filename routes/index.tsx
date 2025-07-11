import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import axios from "axios";
import { Character, Info } from "../types.ts";
import CharacterViewer from "../islands/CharacterViewer.tsx";

export type Data = {
  info: Info;
  results: Character[];
};

export const handler: Handlers = {
  GET: async (_req, ctx: FreshContext<unknown, Data>) => {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();
    return ctx.render(data);
  },
};

const Home = ({ data }: PageProps<Data>) => {
  return (
    <>
      <div class="container">
        <h1 class="title">Rick and Morty Characters</h1>
        <CharacterViewer data={data} />
      </div>
    </>
  );
};

export default Home;
