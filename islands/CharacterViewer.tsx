import { FunctionComponent } from "preact";
import CharacterCard from "../components/CharacterCard.tsx";
import { Data } from "../routes/index.tsx";
import { useState } from "preact/hooks";
import axios from "axios";
import { Character } from "../types.ts";

type Props = {
  data: Data;
};

const CharacterViewer: FunctionComponent<Props> = ({ data }) => {
  const [characters, setCharacters] = useState<Character[]>(data.results);
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);

  const searchCharacters = async (name: string) => {
    const res = await axios.get<Data>(
      `https://rickandmortyapi.com/api/character/?name=${name}`,
    );
    setCharacters(res.data.results);
  };

  const changePage = async (page: number) => {
    const res = await axios.get<Data>(
      `https://rickandmortyapi.com/api/character?page=${page}`,
    );
    setCharacters(res.data.results);
  };

  return (
    <>
      <div>
        <form method="GET" class="search-form">
          <input
            class="search-input"
            placeholder="Nombre del personaje"
            value={search}
            onInput={(e) => setSearch(e.currentTarget.value)}
          />
          <button
            type="submit"
            class="button"
            onClick={() => searchCharacters(search)}
          >
            Buscar
          </button>
        </form>
      </div>
      <div class="characters">
        {characters &&
          characters.map((ch) => <CharacterCard key={ch.id} character={ch} />)}
      </div>
      <div class="pagination">
        <button
          type="button"
          class="button"
          disabled={page === 1}
          onClick={() => {
            setPage(page - 1);
            changePage(page);
          }}
        >
          Anterior
        </button>
        <span>{page} / {data.info.count}</span>
        <button
          type="button"
          class="button"
          disabled={page === data.info.pages}
          onClick={() => {
            setPage(page + 1);
            changePage(page);
          }}
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default CharacterViewer;
