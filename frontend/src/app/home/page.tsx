//app/home/page.tsx
import React from 'react';
import style from './style.module.css';
import { Grid1 } from '@/components/grids/grids_';
import Peliculas from '../../models/interface_pelicula';
import Data_testing from '@/constantes/data';

let testData: Peliculas[] = Data_testing;

function Home() {
  return (
    <>
      <div className={style.contenedor_centrado}>
        <Grid1 Data={testData} />
      </div>
    </>
  );
}

export default Home;