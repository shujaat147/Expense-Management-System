import { useState } from "react";

interface Props {
  title: string;
  items: { name: string; price: number }[];
  onSelectItem: (item: string) => void;
  itemDelete: (itemName: string) => void;
}

const ListGroup = ({ itemDelete, title, items, onSelectItem }: Props) => {
  let [isActive, setIsActive] = useState(-1);

  return (
    <>
      <h1>{title}</h1>
      {items.length == 0 && <p>No Item Found.</p>}
      <ul className="list-group">
        {items.map(function (item, index) {
          return (
            <li
              className={
                "d-flex justify-content-between list-group-item" +
                (index == isActive ? " active" : "")
              }
              onClick={() => {
                setIsActive(index);
                onSelectItem(item.name);
              }}
            >
              <span>{index + " - " + item.name}</span>
              <span style={{ color: "green" }}>$ {item.price}</span>
              <button
                className="btn btn-warning"
                onClick={() => {
                  itemDelete(item.name);
                }}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default ListGroup;
