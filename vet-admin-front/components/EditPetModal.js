import { useState, useEffect } from "react";
import styles from "../styles/EditPetModal.component.module.css";
import { editPet } from "../utils/api/petApi";
import { getUserFromCookie } from "../utils/auth/userCookies";
export default function EditPetModal(props) {
  const [name, setName] = useState(`${props.pet.name}`);
  const [age, setAge] = useState(`${props.pet.age}`);
  const [species, setSpecies] = useState(`${props.pet.species}`);

  useEffect(() => {
    setName(`${props.pet.name}`);
    setAge(`${props.pet.age}`);
    setSpecies(`${props.pet.species}`);
  }, [props.open]);
  const editPetHandle = async () => {
    let obj = {
      petID:props.pet._id,
      petName: name,
      petAge: age,
      species: species,
    };
    const token = getUserFromCookie()["token"];
    console.log(obj, token);
    try {
      let data = await editPet(obj, token).then((response) => {
        if (response.status === 200) return response.json();
        return false;
      });
      if(data === false) throw new Error("Error")
      props.reloadhandle();
      props.closehandle();
    } catch (e) {
      console.log("something wrong")
    }
  };
  if (props.open)
    return (
      <div className={styles.maincomponent}>
        <div
          onClick={() => props.closehandle()}
          className={styles.editmodalheader}
        >
          <div className={styles.closetag}></div>
        </div>
        <div className={styles.peteditform}>
          <label className={styles.labelclass}>
            <div className={styles.namelabeltext}>Name:</div>
            <input
              className={styles.nameinput}
              placeholder={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
            />
          </label>
          <label className={styles.labelclass}>
            <div className={styles.agelabeltext}>Age:</div>
            <input
              className={styles.ageinput}
              placeholder={age}
              onChange={(e) => setAge(e.target.value)}
              type="number"
            />
          </label>
          <label className={styles.labelclass}>
            <div>Species:</div>
            <select
              className={styles.speciesselect}
              value={species}
              onChange={(e) => setSpecies(e.target.value)}
            >
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Parrot">Parrot</option>
              <option value="Hamster">Hamster</option>
              <option value="Guinea Pig">Guinea Pig</option>
            </select>
          </label>
          <button
            className={styles.petmodalbutton}
            onClick={() => editPetHandle()}
          >
            Edit
          </button>
        </div>
      </div>
    );
  else return null;
}
