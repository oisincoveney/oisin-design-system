const arrRange = (n) => [...Array(n).keys()];
export const minWidth = {
  // min-width for viewport width from 5 to 95vw
  ...Object.fromEntries(
    arrRange(19).map((elem) => {
      return [`${(elem + 1) * 5}vw`, `${(elem + 1) * 5}vw`];
    })
  ),

  // min-width for viewport width from 5 to 95vh
  ...Object.fromEntries(
    arrRange(19).map((elem) => {
      return [`${(elem + 1) * 5}vh`, `${(elem + 1) * 5}vh`];
    })
  ),
};
