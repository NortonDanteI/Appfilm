import {Lusitana, Roboto} from 'next/font/google'

export const roboto = Roboto({
  weight: ["300","400","500","700"],
  style:  ["italic","normal"],
  subsets:["latin"],
})

export const lusitana = Lusitana({weight:['400','700'],subsets:['latin']}) 