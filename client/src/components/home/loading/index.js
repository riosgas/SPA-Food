import { React } from 'react';
import S from "./style.module.css";
import spinner from "../../../images/spinner.svg";

export default function Loading() {

  return (
    <div className={S.container}>
      <img src={spinner} />
    </div>
  );
}