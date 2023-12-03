//tambien podria hacer % en vez de flex

export const plantilla_tipo_1: Record<number, React.CSSProperties> = {
  0: { flex: 2, display: "flex",  lineHeight: "1.1", fontSize: "18px", },
  1: { flex: 2, display: "flex",  lineHeight: "1.1", fontSize: "18px",border: "1px solid black"},
};
export const plantilla_tipo_2: Record<number, React.CSSProperties> = {
  0: { flex: 7, fontSize: "10px", paddingTop: "4px"},
  1: { flex: 7, fontSize: "10px", border: "1px solid black", paddingTop: "4px"},
};
export const plantilla_tipo_3:Record<number, React.CSSProperties> = {
  0: { flex: 1, fontSize: "10px" },
  1: { flex: 1, fontSize: "10px", border: "1px solid black"},
};

/*
horizontal, vertical, alineacion del texto.
justifyContent={"center"} alignItems={"center"} textAlign={"center"}
*/