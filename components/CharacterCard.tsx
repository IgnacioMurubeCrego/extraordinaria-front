import { FunctionComponent } from "preact";
import { Character } from "../types.ts";

type Props = {
  character: Character;
};

const CharacterCard: FunctionComponent<Props> = ({ character }) => {
  return (
    <>
      <a href={`/character/${character.id}`} class="character-card">
        <img src={character.image} alt={character.name} />
        <p>{character.name}</p>
      </a>
    </>
  );
};

export default CharacterCard;
