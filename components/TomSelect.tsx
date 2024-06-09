// components/TomSelectComponent.js
import { SchoolYear } from "@/types/schoolyear";
import { useEffect, useRef } from "react";
import TomSelect from "tom-select";
import "tom-select/dist/css/tom-select.css";
import { TomInput } from "tom-select/dist/types/types";

const TomSelectComponent = ({
  options
}: {
  options: { value: string; label: string; }[]
}) => {
  const selectRef = useRef<string | TomInput>();

  useEffect(() => {
    if (selectRef.current) {
      const selectInstance = new TomSelect(selectRef.current, {
        create: true,
        plugins: {
          remove_button:{
              title:'Remove this item',
          }
      },
      });

      return () => {
        selectInstance.destroy();
      };
    }
  }, []);

  return (
    <select ref={selectRef} multiple placeholder="Entrer quelques mots-clés...">
      {/* {options.map((option) => (
        <option key={} value={}>
          {option.label}
        </option>
      ))} */}
    </select>
  );
};

export default TomSelectComponent;
