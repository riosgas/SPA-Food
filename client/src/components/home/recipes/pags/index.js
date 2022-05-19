import React from "react";
import S from "./style.module.css"

export default function Pags({recipesNumber, currentPage, handler}) {
  let pages = []
  for (let i = 1; i < Math.ceil(recipesNumber/9)+1; i++) {
    pages.push(i);
  }
  return (
    <ul className={S.container}>
      {pages.map(n => (
          <li onClick={() => handler(n)} key={n} className={n === currentPage ? S.pagSelect : S.pag}>
              <div>{n}</div>
          </li>
        )
      )}
    </ul>
  );
}