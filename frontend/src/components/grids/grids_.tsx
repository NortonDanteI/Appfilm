import React from 'react';
import { Grid_props } from './interface';
import { Grid} from '@mui/material';
import {grilla, elemento} from './style'
import { CustomCard } from '../cards/a_cards';

function Grid1({ Data }: Grid_props) {
  return (
    <Grid style={grilla} spacing={1} container>
      {Data.map((pelicula) => (
        <Grid style={elemento} item xs={12} sm={6} md={4} lg={3} key={pelicula.id}>
          <CustomCard llamada='ver_peliculas' pelicula={pelicula} estilo={0}/>
        </Grid>
      ))}
    </Grid>
  )
}

export { Grid1 };